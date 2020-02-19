import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalBackground from 'components/ModalBackground';
import MainPage from 'components/MainPage';
import Login from 'components/Login';

import styles from './App.module.css';

class App extends React.Component {
	render() {
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

const mapStateToProps = state => {
    return {
        isLogged: state.user.isLogged
	};
};

export default connect(mapStateToProps, null)(App);