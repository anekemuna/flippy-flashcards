import { useState } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";
import flashcardsData from "./data/flashcards_docker.json";
import NavigationControl from "./components/NavigationControl";

function App() {
  const [index, setIndex] = useState(0);
  const [cardOrder, setCardOrder] = useState(
    () => flashcardsData.map((_, i) => i) // [0, 1, 2, 3, ...]
  );
  const [isShuffled, setIsShuffled] = useState(false);

  const nextCard = () => {
    // let randomIndex = 0;
    // while (randomIndex === index && flashcardsData.length > 1) {
    //   randomIndex = Math.floor(Math.random() * flashcardsData.length);
    // }
    // setIndex(randomIndex);

    // cardOrder instead of flashCardsData to allow for shuffling
    setIndex((prev) => (prev + 1) % cardOrder.length);
  };

  const prevCard = () => {
    // cardOrder instead of flashCardsData to allow for shuffling
    setIndex((prev) => (prev - 1 + cardOrder.length) % cardOrder.length);
  };

  const shuffleCards = () => {
    if (isShuffled) {
      // restore initial sequential
      setCardOrder(flashcardsData.map((_, i) => i));
      setIsShuffled(false);
    } else {
      // shuffle
      const shuffled = [...cardOrder].sort(() => Math.random() - 0.5);
      setCardOrder(shuffled);
      setIsShuffled(true);
    }

    setIndex(0);
  };

  const isFirstCard = index === 0;
  const isLastCard = index === cardOrder.length - 1;

  return (
    <div className="app">
      <h1>Top LeetCode Questions</h1>
      <h3>How would you solve this questions? Think of the algorithms.</h3>
      <h3>Number of cards: {flashcardsData.length}</h3>

      <Flashcard
        flashcard={flashcardsData[cardOrder[index]]}
        key={cardOrder[index]}
        index={index}
        cardCount={flashcardsData.length}
      />
      <NavigationControl
        onNext={nextCard}
        onPrev={prevCard}
        onShuffle={shuffleCards}
        isFirstCard={isFirstCard}
        isLastCard={isLastCard}
        isShuffled={isShuffled}
      />
    </div>
  );
}

export default App;
