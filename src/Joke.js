import React from 'react';

const Joke = ({ text }) => {
  return (
    <div data-testid="joke-text">
      {text}
    </div>
  );
};


export default Joke;