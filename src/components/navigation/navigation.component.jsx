import React from 'react';
import Logo from '../logo/logo.component';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <p
          onClick={() => onRouteChange('signout')}
          className='f3 link dim black underline pointer mt5 mr5'
          style={{ height: '40px' }}
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p
            onClick={() => onRouteChange('signin')}
            className='f3 link dim black underline pointer mt5 mr5'
            style={{ height: '40px' }}
          >
            Sign in
          </p>
          <p
            onClick={() => onRouteChange('register')}
            className='f3 link dim black underline pointer mt5 mr5'
            style={{ height: '40px' }}
          >
            Register
          </p>
        </div>
      </nav>
    );
  }
};

export default Navigation;
