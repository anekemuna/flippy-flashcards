import React from "react";

const NavigationControl = ({ onPrev, onNext, isFirstCard, isLastCard }) => {
  return (
    <div className="navigation-buttons">
      <button
        onClick={onPrev}
        disabled={isFirstCard}
        className={isFirstCard ? "disabled" : ""}
      >
        Prev
      </button>
      <button
        onClick={onNext}
        disabled={isLastCard}
        className={isLastCard ? "disabled" : ""}
      >
        Next
      </button>
      
    </div>
  );
};

export default NavigationControl;
