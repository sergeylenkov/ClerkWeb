import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Dashboard from 'components/Dashboard';
import Menu from 'components/Menu';
import Reports from 'components/Reports';
import { connect } from 'react-redux';
import { data } from 'data';
import { setInitialized } from 'store/actions/data';
import styles from './index.module.css';

interface MainPageProps {
  setInitialized: (isInitialized: boolean) => void;
}

class MainPage extends Component<MainPageProps> {
  public componentDidMount() {
		data.exchange.getExchangeRates().then(() => {
			data.accounts.getAll().then(() => {
				this.props.setInitialized(true);
			});
		});
  }

  public render() {
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

const mapStateToProps = (state: { data: { isInitialized: boolean; }; }) => {
  return {
    isInitialized: state.data.isInitialized
	};
};

const mapDispatchToProps = (dispatch: (arg0: { type: string; isInitialized: boolean; }) => any) => {
  return {
    setInitialized: (isInitialized: boolean) => dispatch(setInitialized(isInitialized))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainPage)
);