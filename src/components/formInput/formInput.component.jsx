import React from 'react';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='mt3'>
    <label className='db fw6 lh-copy f6' htmlFor={otherProps.id}>
      {label}
    </label>
    <input
      className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
      onChange={handleChange}
      {...otherProps}
    />
  </div>
);

export default FormInput;
