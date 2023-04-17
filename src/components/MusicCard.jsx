import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  onCheckedChange = async () => {
    this.setState({
      isFavorite: true,
      isLoading: true,
    });
    const { trackId } = this.props;
    // console.log(trackId)
    await addSong(trackId);
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { previewUrl, trackId } = this.props;
    const { isFavorite, isLoading } = this.state;

    // console.log(trackId)
    return (
      <div>
        <Loading show={ isLoading } />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          { ' ' }
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite-checkbox">
          Favorita
          <input
            type="checkbox"
            id="favorite-checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="isFavorite"
            checked={ isFavorite }
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
