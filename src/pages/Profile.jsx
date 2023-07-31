import React from 'react';
import Header from '../components/Header/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header>
          <h2>Profile</h2>
        </Header>
      </div>
    );
  }
}

export default Profile;
