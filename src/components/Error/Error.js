import React from 'react';
import './Error.scss';


const Error = () => {
  return (
    <h1 className='error'>
      <span>This page does not exist.</span>
      <img src='images/popcorn.png' alt='error' />
    </h1>
  )
}

export {Error};
