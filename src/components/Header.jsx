import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    isLoading: false,
    getUserName: '',
  };

  componentDidMount() {
    this.recoverUserName();
  }

  // pega o nome do usuário com o getUser e guarda no estado getUserName
  recoverUserName = async () => {
    this.setState({
      isLoading: true,
    });
    const userName = await getUser();

    this.setState({
      getUserName: userName.name,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, getUserName } = this.state;
    return (
      <header data-testid="header-component">
        Header
        <Loading show={ isLoading } />
        <p data-testid="header-user-name">
          {
            getUserName
          }
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  getUserName: PropTypes.string,
}.isRequired;

export default Header;
