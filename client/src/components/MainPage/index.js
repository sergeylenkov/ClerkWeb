import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Menu from 'components/Menu';
import Reports from 'components/Reports';
import Dashboard from 'components/Dashboard';

import styles from './index.module.css';

class MainPage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.menu}><Menu /></div>
        </div>
        <div className={styles.content}>
          <Switch>
            <Route path='/reports'>
              <Reports />
            </Route>
            <Route exact path='/'>
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(MainPage);