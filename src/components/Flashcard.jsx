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

  const getCategoryStyle = (categories) => {
    const category = categories.split(",")[0].trim().toLowerCase();

    switch (category) {
      case "hashing":
        return "category-hashing";
      case "strings":
        return "category-strings";
      case "sorting":
        return "category-sorting";
      case "stack":
        return "category-stack";
      case "dynamic programming":
        return "category-dp";
      case "trees":
        return "category-trees";
      case "linked list":
        return "category-linkedlist";
      case "graph":
        return "category-graph";
      default:
        return "category-default";
    }
  };

  return (
    <div className="flashcard-container">
      <div className="card-index">{props.index + 1}/10</div>
      <div className={`flashcard ${getCategoryStyle(flashcard.category)}`} onClick={handleClick}>
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
