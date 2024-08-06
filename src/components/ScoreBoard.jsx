import React from 'react';
import { PLAYER_X, PLAYER_O } from '../utils/constants';
import '../styles/SocreBoard.css';

function ScoreBoard({ scores }) {
  return (
    <div className="score-board">
      <h2>Score Board</h2>
      <div className="scores">
        <div className="score">
          <span className="player">{PLAYER_X}</span>
          <span className="score-value">{scores[PLAYER_X]}</span>
        </div>
        <div className="score">
          <span className="player">{PLAYER_O}</span>
          <span className="score-value">{scores[PLAYER_O]}</span>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;