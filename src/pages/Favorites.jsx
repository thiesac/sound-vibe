import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <Header>
        <div data-testid="page-favorites">
          <h2>Favorites</h2>
        </div>
      </Header>
    );
  }
}

export default Favorites;
