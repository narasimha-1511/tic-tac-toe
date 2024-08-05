import React from 'react';
import Square from './Square';
import '../styles/Board.css';

function Board({ squares, onClick, winningSquares }) {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={winningSquares.includes(i)}
      />
    );
  };

  return (
    <div className="board">
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

export default React.memo(Board);