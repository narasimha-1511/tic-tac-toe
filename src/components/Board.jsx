import React from 'react';
import Square from './Square';
import '../styles/Board.css';

function Board({ squares, onClick, winningSquares = [], boardSize }) {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={winningSquares.includes(i)}
        aria-label={`Square ${i + 1}`}
      />
    );
  };

  const boardRows = Array(boardSize).fill(null).map((_, rowIndex) => (
    <div key={rowIndex} className="board-row">
      {Array(boardSize).fill(null).map((_, colIndex) => renderSquare(rowIndex * boardSize + colIndex))}
    </div>
  ));

  return <div className="board">{boardRows}</div>;
}

export default React.memo(Board);