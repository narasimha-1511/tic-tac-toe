import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import Settings from './Settings';
import calculateWinner from "../utils/gameLogics"
import { PLAYER_X, PLAYER_O, DRAW } from '../utils/constants';
import '../styles/Game.css';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
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

  const handleClick = useCallback((i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares, boardSize, winningLength).winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? PLAYER_X : PLAYER_O;
    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
    
    const result = calculateWinner(squares, boardSize, winningLength);
    if (result.winner) {
      updateScores(result.winner);
    }
  }, [history, stepNumber, xIsNext, boardSize, winningLength]);

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(boardSize * boardSize).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const toggleMoveOrder = () => {
    setIsAscending(!isAscending);
  };

  const updateScores = (winner) => {
    if (winner && winner !== DRAW) {
      setScores(prevScores => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1
      }));
    }
  };

  const current = history[stepNumber];
  const { winner, line: winningSquares } = calculateWinner(current.squares, boardSize, winningLength);

  const moves = history.map((step, move) => {
    const desc = move ?
      `Go to move #${move}` :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = winner === DRAW ? "It's a draw!" : `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? PLAYER_X : PLAYER_O}`;
  }

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
        <div className="status">{status}</div>
        <ScoreBoard scores={scores} />
        <Settings 
          boardSize={boardSize} 
          setBoardSize={setBoardSize}
          winningLength={winningLength}
          setWinningLength={setWinningLength}
        />
        <button onClick={toggleMoveOrder}>
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <ol>{isAscending ? moves : moves.reverse()}</ol>
        <button className="reset-button" onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}

export default Game;