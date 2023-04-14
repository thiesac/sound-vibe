import React from 'react';
import PropTypes from 'prop-types';
// import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  render() {
    const { isLoginLoading } = this.props;
    return (
      <header data-testid="header-component">
        Header
        <Loading show={ isLoginLoading } />
        <p data-testid="header-user-name">
          {
            // await getUser()
          }
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  isLoginLoading: PropTypes.bool,
}.isRequired;

export default Header;
