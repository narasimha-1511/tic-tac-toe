import { DRAW } from './constants';

export  default function calculateWinner(squares, boardSize, winningLength) {
  const lines = [];

  // Horizontal and vertical lines
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j <= boardSize - winningLength; j++) {
      lines.push(Array.from({length: winningLength}, (_, k) => i * boardSize + j + k)); // horizontal
      lines.push(Array.from({length: winningLength}, (_, k) => (j + k) * boardSize + i)); // vertical
    }
  }

  // Diagonal lines
  for (let i = 0; i <= boardSize - winningLength; i++) {
    for (let j = 0; j <= boardSize - winningLength; j++) {
      lines.push(Array.from({length: winningLength}, (_, k) => (i + k) * boardSize + j + k)); // top-left to bottom-right
      lines.push(Array.from({length: winningLength}, (_, k) => (i + k) * boardSize + (j + winningLength - 1 - k))); // top-right to bottom-left
    }
  }

  for (let line of lines) {
    const lineSquares = line.map(i => squares[i]);
    if (lineSquares.every(square => square && square === lineSquares[0])) {
      return { winner: lineSquares[0], line };
    }
  }

  if (squares.every(Boolean)) {
    return { winner: DRAW, line: [] };
  }

  return { winner: null, line: [] };
}