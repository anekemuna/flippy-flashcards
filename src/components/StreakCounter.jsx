import React from 'react'

const StreakCounter = ({ currentStreak, longestStreak }) => {
  return (
    <div className="streak-display">
      <div className="streak-item current">
        <span className="streak-label">Current Streak:</span>
        <span className="streak-value"> <strong>{currentStreak}</strong></span>
      </div>
      <div className="streak-item longest">
        <span className="streak-label">Longest Streak:</span>
        <span className="streak-value"> <strong>{longestStreak}</strong></span>
      </div>
    </div>
  );
}

export default StreakCounter