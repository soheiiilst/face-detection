import React from 'react';
import './logo.styles.css';
import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () => (
  <div className='ma4'>
    <Tilt
      className='Tilt shadow-2 logo'
      options={{ max: 30 }}
      style={{ height: 150, width: 150 }}
    >
      <div className='Tilt-inner'>
        <img src={brain} alt='Logo' />
      </div>
    </Tilt>
  </div>
);

export default Logo;
