import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    // recoveredFavoriteSongs: [],
    isFavorite: false,
  };

  componentDidMount() {
  }

  // ao marcar o checkbox, adiciona a track como favorita pela addSong()
  onCheckedChange = async (event) => {
    const { target: { checked } } = event;
    const { trackId } = this.props;
    this.setState({
      isLoading: true,
    });
    if (checked) {
      await addSong(trackId);
    } else {
      await removeSong(trackId);
    }
    this.setState({
      isLoading: false,
      isFavorite: checked,
    });
  };

  render() {
    const { previewUrl, trackId } = this.props;
    const { isLoading, isFavorite } = this.state;

    // console.log(trackId)
    return (
      <div>
        {/* track preview */ }
        <Loading show={ isLoading } />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          { ' ' }
          { ' ' }
          <code>audio</code>
          .
        </audio>
        {/* checkbox para favoritar músicas */ }
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
