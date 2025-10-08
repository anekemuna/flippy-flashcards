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

  const removePunctuation = (str) => {
    return str.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "");
  };

  const checkAnswer = (guess) => {
    const cleanGuess = removePunctuation(guess.trim().toLowerCase());

    if (Array.isArray(flashcard.answer)) {
      // Since flashcard.answer is an array, check against each answer
      return flashcard.answer.some((answer) => {
        const cleanAnswer = removePunctuation(answer.trim().toLowerCase());
        return (
          cleanAnswer.includes(cleanGuess) || cleanGuess.includes(cleanAnswer)
        );
      });
    }

    const cleanAnswer = removePunctuation(
      flashcard.answer.trim().toLowerCase()
    );

    return cleanAnswer.includes(cleanGuess) || cleanGuess.includes(cleanAnswer);
  };

  // deals with form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = checkAnswer(userGuess);
    setIsCorrect(result ? "correct" : "wrong");

    setIsFlipped(true); // flip card

    setUserGuess(""); // reset users' guess form
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
      <div className={`answer-validator ${isCorrect || ""}`}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              id="answer-input"
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Your answer..."
            />
            <button type="submit">Submit</button>
            {isCorrect && (
              <span className={`feedback-icon ${isCorrect}`}>
                {isCorrect === "correct" ? "✓" : "✗"}
              </span>
            )}
          </div>
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
