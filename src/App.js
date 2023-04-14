import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser, getUser } from './services/userAPI';

class App extends React.Component {
  state = {
    loginName: '',
    isLoading: false,
    isLoginButtonDisabled: true,
    isRedirect: false,
    getUserName: '',
  };

  componentDidMount() {
    this.recoverUserName();
  }

  // valida o input de nome do usuário
  validationFields = () => {
    const { loginName } = this.state;
    const minNumber = 3;
    const minNameLength = loginName.length >= minNumber;

    this.setState({
      isLoginButtonDisabled: !minNameLength,
    });
  };

  // aplica a validação do input de nome do usuário
  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.validationFields);
  };

  // botão clicado, chama o createUser e redireciona para o /search
  onLoginButtonClick = async () => {
    const { loginName } = this.state;
    await createUser({ name: loginName })
      .then(
        this.setState({
          isLoading: true,
          isRedirect: true,
        }),
      );
  };

  // pega o nome do usuário com o getUser e guarda no estado
  recoverUserName = async () => {
    const { getUserName } = this.state;
    await getUser()
      .then(
        this.setState({
          getUserName: getUser.name,
        }),
      );
  };

  render() {
    const {
      loginName,
      isLoginButtonDisabled,
      isLoading,
      isRedirect,
    } = this.state;

    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              !isRedirect
                ? (
                  <Login
                    { ...props }
                    isLoginButtonDisabled={ isLoginButtonDisabled }
                    loginName={ loginName }
                    onLoginButtonClick={ this.onLoginButtonClick }
                    onInputChange={ this.onInputChange }
                    isLoginLoading={ isLoading }
                  />
                )
                : <Redirect to="/search" />
            ) }
          />
          <Route path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
