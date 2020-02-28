import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { data } from 'data';
import { setInitialized } from 'store/actions/data';
import Menu from 'components/Menu';
import Reports from 'components/Reports';
import Dashboard from 'components/Dashboard';

import styles from './index.module.css';

class MainPage extends Component {
  componentDidMount() {
		data.exchange.getExchangeRates().then(() => {
			data.accounts.getAll().then(() => {
				this.props.setInitialized(true);
			});
		});
  }

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

const mapStateToProps = state => {
  return {
    isInitialized: state.data.isInitialized
	};
};

const mapDispatchToProps = dispatch => {
  return {
    setInitialized: (isInitialized) => dispatch(setInitialized(isInitialized))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainPage)
);