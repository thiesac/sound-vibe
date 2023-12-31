import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading/Loading';
// import "./Login.css";

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
        <p>Login</p>
        <Loading show={ isLoginLoading } />
        <form>
          <label htmlFor="login-name">
            Nome
            <input
              className="required:border-red-500"
              type="text"
              data-testid="login-name-input"
              id="login-name"
              name="loginName"
              value={ loginName }
              onChange={ onInputChange }
            />
          </label>
          <button
            type="button"
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
