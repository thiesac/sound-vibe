import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    searchInput: '',
    isSearchButtonDisabled: true,
  };

  // busca tem que tem um mínimo de 2 caracteres
  validationFields = () => {
    const { searchInput } = this.state;
    const minNumber = 2;
    const minSearchLength = searchInput.length >= minNumber;
    // const minSearchLength = searchInput !== '';

    this.setState({
      isSearchButtonDisabled: !minSearchLength,
    });
  };

  // aplica a liberação do botão
  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.validationFields);
  };

  render() {
    const { searchInput, onSearchButtonClick } = this.props;
    const { isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-input">
            <input
              type="text"
              id="search-input"
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
              value={ searchInput }
              name="searchInput"
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            onClick={ onSearchButtonClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  searchInput: PropTypes.string,
  isSearchButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSearchButtonClick: PropTypes.func,
}.isRequired;

export default Search;
