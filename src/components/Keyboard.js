import React from 'react';
import { keys } from '../constants/constants';
import '../styles/keyboard.css';

const Keyboard = ({ boardData, handleKeyPress }) => {
  return (
    <div className='keyboard-rows'>
      {keys.map((item, index) => (
        <div className='row' key={index}>
          {item.map((key, keyIndex) => (
            <button
              key={keyIndex}
              className={`${
                boardData && boardData.correctCharArr.includes(key)
                  ? 'key-correct'
                  : boardData && boardData.presentCharArr.includes(key)
                  ? 'key-present'
                  : boardData && boardData.absentCharArr.includes(key)
                  ? 'key-absent'
                  : ''
              } `}
              onClick={() => {
                handleKeyPress(key);
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
