import React from 'react';
import { Dashboard } from './Dashboard.js';
import { Accounts } from './Accounts.js';

export class Pages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 0
        }
    }

    render() {
        if (this.props.activePage === 0) {
            return <div className="pages"><Dashboard/></div>
        } else if (this.props.activePage === 1) {
            return <div className="pages"><Accounts/></div>
        }

        return <div className="pages"></div>
    }
}