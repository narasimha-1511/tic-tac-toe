import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import Settings from './Settings';
import { calculateWinner } from '../utils/gameLogic';
import { PLAYER_X, PLAYER_O, DRAW } from '../utils/constants';
import '../styles/Game.css';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [winningSquares, setWinningSquares] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [scores, setScores] = useState({ [PLAYER_X]: 0, [PLAYER_O]: 0 });
  const [boardSize, setBoardSize] = useState(3);
  const [winningLength, setWinningLength] = useState(3);

  useEffect(() => {
    const savedState = localStorage.getItem('ticTacToeState');
    if (savedState) {
      const { history, stepNumber, xIsNext, scores, boardSize, winningLength } = JSON.parse(savedState);
      setHistory(history);
      setStepNumber(stepNumber);
      setXIsNext(xIsNext);
      setScores(scores);
      setBoardSize(boardSize);
      setWinningLength(winningLength);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ticTacToeState', JSON.stringify({
      history,
      stepNumber,
      xIsNext,
      scores,
      boardSize,
      winningLength
    }));
  }, [history, stepNumber, xIsNext, scores, boardSize, winningLength]);

  // ... (keep existing handleClick, jumpTo, resetGame functions)

  const updateScores = (winner) => {
    if (winner && winner !== DRAW) {
      setScores(prevScores => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1
      }));
    }
  };

  // Update handleClick to use updateScores
  const handleClick = useCallback((i) => {
    // ... (existing code)
    const result = calculateWinner(squares, boardSize, winningLength);
    if (result.winner) {
      setWinningSquares(result.line);
      updateScores(result.winner);
    }
  }, [history, stepNumber, xIsNext, boardSize, winningLength]);

  // ... (keep existing JSX, but add ScoreBoard and Settings components)
  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares} 
          onClick={handleClick}
          winningSquares={winningSquares}
          boardSize={boardSize}
        />
      </div>
      <div className="game-info">
        <ScoreBoard scores={scores} />
        <Settings 
          boardSize={boardSize} 
          setBoardSize={setBoardSize}
          winningLength={winningLength}
          setWinningLength={setWinningLength}
        />
        {/* ... (existing status, move sorting, and reset button) */}
      </div>
    </div>
  );
}

export default Game;