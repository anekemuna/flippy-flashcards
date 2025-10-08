import React from 'react'

const StreakCounter = ({ currentStreak, longestStreak }) => {
  return (
    <div className="streak-display">
      <div className="streak-item current">
        <span className="streak-label">Current Streak:</span>
        <span className="streak-value">{currentStreak}</span>
      </div>
      <div className="streak-item longest">
        <span className="streak-label">Longest Streak:</span>
        <span className="streak-value">{longestStreak}</span>
      </div>
    </div>
  );
}

export default StreakCounter