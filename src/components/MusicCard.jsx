import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    // isFavorite: false,
    isLoading: false,
    recoveredFavoriteSongs: [],
  };

  componentDidMount() {
    this.recoverFavoritesResult();
  }

  // ao marcar o checkbox, adiciona a track como favorita pela addSong()
  onCheckedChange = async () => {
    this.setState({
      // isFavorite: true,
      isLoading: true,
    });
    const { trackId } = this.props;
    // console.log(trackId)
    await addSong(trackId);
    await this.recoverFavoritesResult();
    this.setState({
      isLoading: false,
    });
  };

  recoverFavoritesResult = async () => {
    const getFavoriteSongsResult = await getFavoriteSongs();
    this.setState({
      recoveredFavoriteSongs: getFavoriteSongsResult,
    });
  };

  render() {
    const { previewUrl, trackId } = this.props;
    const { isFavorite, isLoading, recoveredFavoriteSongs } = this.state;

    // console.log(trackId)
    return (
      <div>
        {/* track preview */}
        <Loading show={ isLoading } />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          { ' ' }
          {' '}
          <code>audio</code>
          .
        </audio>
        {/* checkbox para favoritar músicas */}
        <label htmlFor="favorite-checkbox">
          Favorita
          <input
            type="checkbox"
            id="favorite-checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="isFavorite"
            checked={ recoveredFavoriteSongs.some((song) => song.trackId === trackId) }
            onChange={ this.onCheckedChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
