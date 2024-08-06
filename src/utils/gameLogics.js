import { BOARD_SIZE, WINNING_LENGTH, DRAW } from './constants';

export function calculateWinner(squares) {
  const lines = [];
  
  // Horizontal and vertical lines
  for (let i = 0; i < BOARD_SIZE; i++) {
    lines.push(Array.from({length: BOARD_SIZE}, (_, j) => i * BOARD_SIZE + j)); // horizontal
    lines.push(Array.from({length: BOARD_SIZE}, (_, j) => j * BOARD_SIZE + i)); // vertical
  }
  
  // Diagonal lines
  lines.push(Array.from({length: BOARD_SIZE}, (_, i) => i * BOARD_SIZE + i)); // top-left to bottom-right
  lines.push(Array.from({length: BOARD_SIZE}, (_, i) => i * BOARD_SIZE + (BOARD_SIZE - 1 - i))); // top-right to bottom-left

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: line };
    }
  }

  if (squares.every(Boolean)) {
    return { winner: DRAW, line: [] };
  }

  return { winner: null, line: [] };
}