import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
        <Loading show={ isLoading } />
        <p data-testid="header-user-name">
          {
            `Olá, ${getUserName}`
          }
        </p>
        <nav>
          <Link to="/search" data-testid="link-to-search">Busca</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  getUserName: PropTypes.string,
}.isRequired;

export default Header;
