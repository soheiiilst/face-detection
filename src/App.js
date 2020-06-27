import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/navigation.component';
import SignIn from './components/signIn/signIn.component';
import Register from './components/register/register.component';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm.component';

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      route: 'signin',
      isSignedIn: false,
    };
  }

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div className='App'>
        <Particles className='particles' params={particleOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <ImageLinkForm />
        ) : route === 'signin' || route === 'signout' ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
