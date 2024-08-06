import React from 'react';
import '../styles/square.css';

function Square({ value, onClick, isWinning, 'aria-label': ariaLabel }) {
  return (
    <button 
      className={`square ${isWinning ? 'winning' : ''}`} 
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {value}
    </button>
  );
}

export default React.memo(Square);