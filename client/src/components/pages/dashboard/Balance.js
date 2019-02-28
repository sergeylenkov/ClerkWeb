import React from 'react';

import styles from './Balance.module.css';

export class DashboardBalance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            own: [],
            credits: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/dashboard/balance").then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            const own = data.items.filter(el => !el.credit);
            const credits = data.items.filter(el => el.credit);

            let group = [];

            own.reduce((res, value) => {
                if (!res[value.currency]) {
                    res[value.currency] = {
                        id: value.currency,
                        amount: 0,
                        currency: value.currency
                    };
                    group.push(res[value.currency])
                }

                res[value.currency].amount += value.amount;

                return res;
            }, {});

            this.setState({
                isLoaded: true,
                own: group,
                credits: credits
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                error: error
            });
        });
    }

    render() {
        const { error, isLoaded, own, credits } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (                
                <div className={styles.container}>
                    <div className={styles.header}>Собственный средства</div>

                    {
                        own.map((item, i) => {
                            return (<div key={item.id} className={styles.item}>{item.amount.toFixed(2)} {item.currency}</div>); 
                        })
                    }

                    <div className={styles.header}>Кредитные средства</div>

                    {
                        credits.map((item, i) => {
                            return (<div key={item.id} className={styles.item}>{(item.credit + item.amount).toFixed(2)} {item.currency}</div>); 
                        })
                    }
                </div>
            );
        }
    }
}