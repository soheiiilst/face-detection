import React from 'react';

const Rank = ({ name, entries }) => (
  <div className='mb3'>
    <div className='white f3 mb2'>{`${name}, your current entry count is...`}</div>
    <div className='white f1'>{entries}</div>
  </div>
);

export default Rank;
