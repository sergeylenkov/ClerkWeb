import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

import styles from './index.module.css';

export enum MenuTypes {
  Dashboard = 0,
  Accounts = 1,
  Budgets = 2,
  Goals = 3,
  Schedulers = 4,
  Reports = 5,
  Tags = 6,
  Transactions = 8
}

interface MenuItem {
  title: string;
  type: MenuTypes;
  path: string;
}

interface MenuState {
  items: MenuItem[];
}

type MenuProps = RouteComponentProps<{}> & WithTranslation;

class Menu extends Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);

    const { t } = props;

    this.state = {
      items: [
        { title: t('menu.dashboard'), type: MenuTypes.Dashboard, path: '/' },
        { title: t('menu.transactions'), type: MenuTypes.Transactions, path: '/transactions' },
        { title: t('menu.budgets'), type: MenuTypes.Budgets, path: '/budgets' },
        { title: t('menu.goals'), type: MenuTypes.Goals, path: '/goals' },
        { title: t('menu.schedulers'), type: MenuTypes.Schedulers, path: 'schedulers' },
        { title: t('menu.reports'), type: MenuTypes.Reports, path: '/reports' }
      ]
    };

    this.onMenuSelect = this.onMenuSelect.bind(this);
  }

  onMenuSelect(path: string) {
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
