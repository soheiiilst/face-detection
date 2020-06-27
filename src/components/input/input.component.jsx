import React from 'react';
import './input.styles.scss';

const Input = ({ handleChange, ...otherProps }) => (
  <input className='input' onChange={handleChange} {...otherProps} />
);

export default Input;
