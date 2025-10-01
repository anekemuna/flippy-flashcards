import { useState } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";
import flashcardsData from "./data/flashcards.json";

function App() {
  const [index, setIndex] = useState(0);
  const nextCard = () => {
    let randomIndex = 0;

    // setIndex((prev) => (prev + 1) % flashcardsData.length);
    while(randomIndex === index && flashcardsData.length > 1){
      randomIndex = Math.floor(Math.random() * flashcardsData.length);
    }

    setIndex(randomIndex);
  };
  const prevCard = () => {
    setIndex(
      (prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length
    );
  };

  return (
    <>
      <h1>Top LeetCode Questions</h1>
      <h3>How would you solve this questions? Think of the algorithms.</h3>
      <h3>Number of cards: {flashcardsData.length}</h3>

      <Flashcard
        flashcard={flashcardsData[index]}
        key={index}
        index={index}
        next={nextCard}
        prev={prevCard}
      />
    </>
  );
}

export default App;
