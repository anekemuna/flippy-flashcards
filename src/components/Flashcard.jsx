import React, { useState } from "react";

const Flashcard = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const flashcard = props.flashcard;
  const next = props.next;
  const prev = props.prev;
  const count = props.cardCount;

  const formatAnswers = () => {
    return Array.isArray(flashcard.answer) ? (
      flashcard.answer.map((answer, index) => (
        <div key={index}>
          <strong>{index + 1}:</strong> {answer}
        </div>
      ))
    ) : (
      <div>{flashcard.answer}</div>
    );
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Sets styling based on category
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
      case "basics":
        return "category-basics";
      case "practical":
        return "category-practical";
      default:
        return "category-default";
    }
  };

  // deals with form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(userGuess);
    setUserGuess("");
  };

  return (
    <div className="flashcard-container">
      <div className="card-index">
        {props.index + 1}/{count}
      </div>
      <div
        className={`flashcard ${getCategoryStyle(flashcard.category)} ${
          isFlipped ? "flipped" : ""
        }`}
        onClick={handleClick}
      >
        {/* Front Side */}
        <div className="flashcard-front">
          <p>{flashcard.question}</p>
          <p>
            <em>({flashcard.category})</em>
          </p>
        </div>

        {/* Back Side */}
        <div className="flashcard-back">
          <div className="answers-container">{formatAnswers()}</div>
        </div>
      </div>

        {/* Form for Users' Input */}
      <div className="answer-validator">
        <form onSubmit={handleSubmit}>
          <label>Answer:</label>
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
          />
          <input type="submit" />
        </form>
      </div>

      <div className="navigation-buttons">
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Flashcard;
