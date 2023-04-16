import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    artistName: '',
    searchResult: [],
    isLoading: false,
    searchInput: '',
    isSearchButtonDisabled: true,
    wasSearchBtnClicked: false,
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
      [name]: value,
    }, this.validationFields);
  };

  // ao ser clicado, botão faz a busca para a API e seta alguns estados
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
      wasSearchBtnClicked: true,
    });
  };

  render() {
    const {
      isSearchButtonDisabled,
      isLoading, artistName,
      searchResult,
      wasSearchBtnClicked,
      searchInput,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {/* FORMULÁRIO PARA PESQUISA */ }
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
            type="button"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            onClick={ this.onSearchButtonClick }
          >
            Pesquisar
          </button>
        </form>
        { /* RETORNO DA PESQUISA */ }
        <Loading show={ isLoading } />
        {
          wasSearchBtnClicked
          && (
            <div>
              <div>
                <h3>
                  { `Resultado de álbuns de: ${artistName}` }
                </h3>
              </div>
              <span>
                { searchResult.length === 0
                  ? <p>Nenhum álbum foi encontrado</p>
                  : searchResult.map((result) => (
                    <div key={ result.collectionId }>
                      <Link
                        to={ `/album/${result.collectionId}` }
                        data-testid={ `link-to-album-${result.collectionId}` }
                      >
                        <img src={ result.artworkUrl100 } alt={ result.collectionName } />
                        <p>{ result.artistName }</p>
                        <p>{ result.collectionName }</p>
                      </Link>
                    </div>
                  )) }
              </span>
            </div>
          )
        }
      </div>
    );
  }
}

export default Search;
