import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { login } from 'store/actions/user';
import PrimaryButton from 'components/PrimaryButton';

import styles from './index.module.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onLogin(event) {
    const { username, password } = this.state;

    this.props.login(username, password);

    event.preventDefault();
  }

  render() {
    const { t, isLogged } = this.props;

    if (isLogged) {
      return <Redirect to={'/'} />
    }

    return (
      <form className={styles.container} onSubmit={this.onLogin}>
        <h1>{t('login.Title')}</h1>
        <div className={styles.fieldContainer}>
          <label className={styles.fieldTitle} htmlFor="username">{t('login.Username')}</label>
          <input id="username" autoComplete="on" className={styles.field} onChange={this.onChange} />
        </div>
        <div className={styles.fieldContainer}>
          <label className={styles.fieldTitle} htmlFor="password">{t('login.Password')}</label>
          <input id="password" autoComplete="on" type="password" className={styles.field} onChange={this.onChange} />
        </div>
        <div className={styles.loginButton}>
          <PrimaryButton type="submit">{t('login.Login')}</PrimaryButton>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.user.isLogged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withTranslation()(Login)
);