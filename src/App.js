import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/navigation.component';
import SignIn from './components/signIn/signIn.component';
import Register from './components/register/register.component';
import Rank from './components/rank/rank.component';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm.component';

const particleOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  loadUser = user => {
    const { id, name, email, entries, joined } = user;
    this.setState({
      isSignedIn: true,
      user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined,
      },
    });
  };

  loadUserRank = rank => {
    this.setState(Object.assign(this.state.user, { entries: rank }));
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, user } = this.state;
    return (
      <div className='App'>
        <Particles className='particles' params={particleOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm userId={user.id} loadUserRank={this.loadUserRank} />
          </div>
        ) : route === 'signin' || route === 'signout' ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
