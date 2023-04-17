import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    selectedAlbum: [],
    selectedAlbumTracks: [],
    isLoading: false,
  };

  componentDidMount() {
    this.recoverMusicResult();
  }

  // recupera info do álbum selecionado no componente Search
  recoverMusicResult = async () => {
    const { match: { params: { id } } } = this.props;
    const getMusicsFromAPI = await getMusics(id);
    this.setState({
      selectedAlbum: getMusicsFromAPI[0],
      selectedAlbumTracks: getMusicsFromAPI,
    });
  };

  render() {
    const {
      selectedAlbum,
      selectedAlbumTracks,
      isLoading,
    } = this.state;
    // console.log(selectedAlbumTracks);

    return (
      <div data-testid="page-album">
        <Header />
        <Loading show={ isLoading } />

        {/* pega apenas o primeiro elemento do array, que não é música, para mostrar imagem do ábum && nome do álbum && artista */}
        <div>
          <img src={ selectedAlbum.artworkUrl100 } alt={ selectedAlbum.artistIs } />
          <h3 data-testid="artist-name">{ selectedAlbum.artistName }</h3>
          <p data-testid="album-name">{ selectedAlbum.collectionName }</p>
        </div>

        {/* remove o primeiro elemento, que não é música, e para cada música, exibe um player com amostra da mesma */}
        <div>
          {
            selectedAlbumTracks.slice(1).map((albumTrack, index) => (
              <li key={ index }>
                { albumTrack.trackCensoredName }
                {/* { console.log(albumTrack)} */}
                <MusicCard
                  previewUrl={ albumTrack.previewUrl }
                  trackId={ albumTrack.trackId }
                />
              </li>
            ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string,
}.isRequired;
export default Album;
