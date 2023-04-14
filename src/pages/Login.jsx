import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends React.Component {
  render() {
    const {
      loginName,
      isLoginButtonDisabled,
      onInputChange,
      onLoginButtonClick,
      isLoginLoading,
    } = this.props;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <Loading show={ isLoginLoading } />
        <form>
          <label htmlFor="login-name">
            Nome
            <input
              type="text"
              data-testid="login-name-input"
              id="login-name"
              name="loginName"
              value={ loginName }
              onChange={ onInputChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            disabled={ isLoginButtonDisabled }
            onClick={ onLoginButtonClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginName: PropTypes.string,
  isLoginButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onLoginButtonClick: PropTypes.func,
}.isRequired;

export default Login;
