import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  state = {
    artistName: '',
    searchResult: [],
    isLoading: false,
    searchInput: '',
    isSearchButtonDisabled: true,
  };

  // busca tem que tem um mínimo de 2 caracteres
  validationFields = () => {
    const { searchInput } = this.state;
    const minNumber = 2;
    const minSearchLength = searchInput.length >= minNumber;

    this.setState({
      isSearchButtonDisabled: !minSearchLength,
    });
  };

  // aplica a liberação do botão
  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [ name ]: value,
    }, this.validationFields);
  };

  onSearchButtonClick = async () => {
    const { searchInput } = this.state;
    this.setState({
      isLoading: true,
    });
    const searchAlbumAPIrequest = await searchAlbumsAPI(searchInput);
    this.setState({
      searchResult: searchAlbumAPIrequest,
      searchInput: '',
      artistName: searchInput,
      isLoading: false,
    });
  };

  render() {
    const { searchInput } = this.props;
    const { isSearchButtonDisabled, isLoading, artistName, searchResult } = this.state;
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
            onClick={ this.onSearchButtonClick }
          >
            Pesquisar
          </button>
        </form>
        <Loading show={ isLoading } />
        <span>
          { (
            (searchResult.length <= 0)
              ? <p>Nenhum álbum foi encontrado</p>
              : searchResult.map((result) => ``
                <Link to="/${}">
              )
          ``) }
        </span>
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
