import React, { useState } from "react";

const Flashcard = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcard = props.flashcard;
  const next = props.next;
  const prev = props.prev;

  const formatAnswers = () => {
    return flashcard.answers.map((answer, index) => (
      <div key={index}>
        <strong>{index + 1}:</strong> {answer}
      </div>
    ));
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container">
      <div className="card-index">
        {props.index + 1}/10
      </div>
      <div className="flashcard" onClick={handleClick}>
        {isFlipped ? (
          formatAnswers()
        ) : (
          <>
            <p>{flashcard.question}</p>
            <p>
              <em>{flashcard.category}</em>
            </p>
          </>
        )}
      </div>
      <div className="navigation-buttons">
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Flashcard;
