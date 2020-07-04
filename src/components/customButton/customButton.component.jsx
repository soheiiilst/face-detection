import React from 'react'

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  <button
    className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;