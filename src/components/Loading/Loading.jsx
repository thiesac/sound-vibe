import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  render() {
    const { show } = this.props;
    return (
      show && <p> Carregando...</p>
    );
  }
}

Loading.propTypes = {
  show: PropTypes.bool,
}.isRequired;

export default Loading;
