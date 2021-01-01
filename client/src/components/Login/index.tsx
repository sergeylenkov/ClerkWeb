import React, { ChangeEvent, Component, FormEvent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

import PrimaryButton from 'components/PrimaryButton';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from 'store/actions/user';
import styles from './index.module.css';

interface LoginProps extends WithTranslation {
  isLogged: boolean;
  login: (login: string, password: string) => void;
}

interface LoginState {
  username: string;
  password: string;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: Readonly<LoginProps>) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      username: event.target.value
    });
  }

  onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: event.target.value
    });
  }

  onLogin(event: FormEvent<HTMLFormElement>) {
    const { username, password } = this.state;

    this.props.login(username, password);

    event.preventDefault();
  }

  public render() {
    const { t, isLogged } = this.props;

    if (isLogged) {
      return <Redirect to={'/'} />
    }

    return (
      <form className={styles.container} onSubmit={this.onLogin}>
        <h1>{t('login.title')}</h1>
        <div className={styles.fieldContainer}>
          <label className={styles.fieldTitle} htmlFor="username">{t('login.username')}</label>
          <input id="username" autoComplete="on" className={styles.field} onChange={this.onUsernameChange} />
        </div>
        <div className={styles.fieldContainer}>
          <label className={styles.fieldTitle} htmlFor="password">{t('login.password')}</label>
          <input id="password" autoComplete="on" type="password" className={styles.field} onChange={this.onPasswordChange} />
        </div>
        <div className={styles.loginButton}>
          <PrimaryButton type="submit">{t('login.login')}</PrimaryButton>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state: { user: { isLogged: boolean; }; }) => {
  return {
    isLogged: state.user.isLogged
  };
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    login: (username: string, password: string) => dispatch(login(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withTranslation()(Login)
);