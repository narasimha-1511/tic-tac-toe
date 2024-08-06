// Update the Square component for better accessibility
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