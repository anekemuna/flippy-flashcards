import { useState } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";
import flashcardsData from "./data/flashcards_docker.json";
import NavigationControl from "./components/NavigationControl";

function App() {
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    // let randomIndex = 0;

    // while (randomIndex === index && flashcardsData.length > 1) {
    //   randomIndex = Math.floor(Math.random() * flashcardsData.length);
    // }

    // setIndex(randomIndex);

    setIndex((prev) => (prev + 1) % flashcardsData.length);
  };

  const prevCard = () => {
    setIndex(
      (prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length
    );
  };

  const isFirstCard = index === 0;
  const isLastCard = index === flashcardsData.length - 1;

  return (
    <div className="app">
      <h1>Top LeetCode Questions</h1>
      <h3>How would you solve this questions? Think of the algorithms.</h3>
      <h3>Number of cards: {flashcardsData.length}</h3>

      <Flashcard
        flashcard={flashcardsData[index]}
        key={index}
        index={index}
        cardCount={flashcardsData.length}
      />
      <NavigationControl
        onNext={nextCard}
        onPrev={prevCard}
        isFirstCard={isFirstCard}
        isLastCard={isLastCard}
      />
    </div>
  );
}

export default App;
