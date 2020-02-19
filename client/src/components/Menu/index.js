import React from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import styles from './index.module.css';

export const MenuTypes = {
  Dashboard: 0,
  Accounts: 1,
  Budgets: 2,
  Goals: 3,
  Schedulers: 4,
  Reports: 5,
  Tags: 6,
  Transactions: 8
}

class Menu extends React.Component {
  constructor(props) {
    super(props);

    const { t } = props;

    this.state = {
      items: [
        { title: t('Dashboard'), type: MenuTypes.Dashboard, path: '/' },
        { title: t('Transactions'), type: MenuTypes.Transactions, path: '/transactions' },
        { title: t('Budgets'), type: MenuTypes.Budgets, path: '/budgets' },
        { title: t('Goals'), type: MenuTypes.Goals, path: '/goals' },
        { title: t('Schedulers'), type: MenuTypes.Schedulers, path: 'schedulers' },
        { title: t('Reports'), type: MenuTypes.Reports, path: '/reports' }
      ]
    };

    this.onMenuSelect = this.onMenuSelect.bind(this);
  }

  onMenuSelect(path) {
    this.props.history.push(path);
  }

  render() {
    const { pathname } = this.props.location;

    return (
      <div className={styles.container}>
        {
          this.state.items.map((item, i) => {
            const active = pathname.split('/')[1] === item.path.split('/')[1];

            return (
              <a key={i} href={item.path} className={`${styles.link} ${active ? styles.active : ''}`}>
                {item.title}
              </a>
            )
          })
        }
      </div>
    );
  }
}

export default withRouter(
  withTranslation()(Menu)
);
