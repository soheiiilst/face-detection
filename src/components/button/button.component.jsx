import React from 'react';
import './button.styles.scss';

const Button = ({ children, onClick, ...otherProps }) => (
  <button className='button mt3' onClick={onClick} {...otherProps}>
    {children.toUpperCase()}
  </button>
);

export default Button;
