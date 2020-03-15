import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Login from 'components/Login';
import MainPage from 'components/MainPage';
import ModalBackground from 'components/ModalBackground';
import { connect } from 'react-redux';
import styles from './App.module.css';

interface AppProps {
	isLogged: boolean;
}

class App extends Component<AppProps> {
	public render() {
		const { isLogged } = this.props;

    return (
			<BrowserRouter>
			<div className={styles.container}>
				<Switch>
					<Route exact path='/'>
						{isLogged ? <MainPage /> : <Redirect to={'/login'} />}
					</Route>
					<Route path='/login'>
						<ModalBackground><Login /></ModalBackground>
					</Route>
				</Switch>
			</div>
			</BrowserRouter>
    );
  }
}

const mapStateToProps = (state: { user: { isLogged: boolean; }; }) => {
  return {
    isLogged: state.user.isLogged
	};
};

export default connect(mapStateToProps, null)(App);