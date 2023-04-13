import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const {
      loginName,
      isLoginButtonDisabled,
      onInputChange,
      onLoginButtonClick,
    } = this.props;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form>
          <label htmlFor="login-name">
            Nome
            <input
              type="text"
              data-testid="login-name-input"
              id="login-name"
              name="login-name"
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

export default Login;

Login.propTypes = {
  loginName: PropTypes.string,
  isLoginButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onLoginButtonClick: PropTypes.func,
}.isRequired;
