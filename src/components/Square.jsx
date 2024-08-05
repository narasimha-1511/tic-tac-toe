import React from 'react';
import '../styles/Square.css';

function Square({ value, onClick, isWinning }) {
  return (
    <button 
      className={`square ${isWinning ? 'winning' : ''}`} 
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default React.memo(Square);