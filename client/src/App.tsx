import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from 'components/Login';
import MainPage from 'components/MainPage';
import ModalBackground from 'components/ModalBackground';
import { connect } from 'react-redux';
import styles from './App.module.css';

const mapStateToProps = (state: { user: { isLogged: boolean; }; }) => {
  return {
    isLogged: state.user.isLogged
	};
};

type AppProps = ReturnType<typeof mapStateToProps>;

class App extends Component<AppProps> {
	public render() {
		const { isLogged } = this.props;

    return (
			<BrowserRouter>
				<div className={styles.container}>
					<Switch>
					<Route exact path='/login'>
							<ModalBackground><Login /></ModalBackground>
						</Route>
						<Route path={['/', '/:path']}>
							{isLogged ? <MainPage /> : <Redirect to={'/login'} />}
						</Route>
					</Switch>
				</div>
			</BrowserRouter>
    );
  }
}

export default connect(mapStateToProps)(App);