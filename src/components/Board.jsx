// Update the renderSquare function for better accessibility
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