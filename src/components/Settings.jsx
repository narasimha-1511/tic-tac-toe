import React from 'react';
import '../styles/Settings.css';

function Settings({ boardSize, setBoardSize, winningLength, setWinningLength }) {
  return (
    <div className="settings">
      <h2>Game Settings</h2>
      <div className="setting">
        <label htmlFor="board-size">Board Size:</label>
        <input
          id="board-size"
          type="number"
          min="3"
          max="10"
          value={boardSize}
          onChange={(e) => setBoardSize(Number(e.target.value))}
        />
      </div>
      <div className="setting">
        <label htmlFor="winning-length">Winning Length:</label>
        <input
          id="winning-length"
          type="number"
          min="3"
          max={boardSize}
          value={winningLength}
          onChange={(e) => setWinningLength(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Settings;