import React from 'react';

import './style.css';

const InputField = () => {
  return (
    <form className='input'>
      <input
        type='text'
        placeholder='Enter a task'
        className='input__box'
      />
      <button className="input_submit" type='submit'>
        Go
      </button>
    </form>
  );
};

export default InputField;