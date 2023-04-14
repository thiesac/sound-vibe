import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <Header>
        <div data-testid="page-profile">
          <h2>Profile</h2>
        </div>
      </Header>
    );
  }
}

export default Profile;
