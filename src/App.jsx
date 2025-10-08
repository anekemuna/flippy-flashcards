import { useState } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";
import NavigationControl from "./components/NavigationControl";
import StreakCounter from "./components/StreakCounter";
import DeckSelector from "./components/DeckSelector";

import dockerData from "./data/flashcards_docker.json";
import leetcodeData from "./data/flashcards.json";

function App() {
  const [currentDeck, setCurrentDeck] = useState("docker");
  const [flashcardsData, setFlashcardsData] = useState(dockerData);

  const [index, setIndex] = useState(0);
  const [cardOrder, setCardOrder] = useState(
    () => flashcardsData.map((_, i) => i) // [0, 1, 2, 3, ...]
  );
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  //const [masteredCards, setMasteredCards] = useState(new Set());

  const availableDecks = [
    { value: "docker", label: "Docker Questions" },
    { value: "leetcode", label: "LeetCode Questions" },
  ];

  const handleDeckChange = (deckType) => {
    let newData;
    if (deckType === "docker") {
      newData = dockerData;
    } else if (deckType === "leetcode") {
      newData = leetcodeData;
    }

    setFlashcardsData(newData);
    setCurrentDeck(deckType);

    // Reset everything when deck changes
    setCardOrder(newData.map((_, i) => i));
    setIsShuffled(false);
    setIndex(0);
  };

  // goes to next card in set
  const nextCard = () => {
    // let randomIndex = 0;
    // while (randomIndex === index && flashcardsData.length > 1) {
    //   randomIndex = Math.floor(Math.random() * flashcardsData.length);
    // }
    // setIndex(randomIndex);

    // cardOrder instead of flashCardsData to allow for shuffling
    setIndex((prev) => (prev + 1) % cardOrder.length);
  };

  // goes to previous card in set
  const prevCard = () => {
    // cardOrder instead of flashCardsData to allow for shuffling
    setIndex((prev) => (prev - 1 + cardOrder.length) % cardOrder.length);
  };

  // deals with shuffling and unshuffling cards
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

  // deals with uodating current and longest streak
  const handleStreak = (isCorrect) => {
    if (isCorrect) {
      const newStreak = currentStreak + 1; // increment streak
      setCurrentStreak(newStreak);

      // if newStreak is longer
      if (newStreak > longestStreak) setLongestStreak(newStreak);
    } else {
      setCurrentStreak(0); //reset streak
    }
  };

  // TODO: Will do later if I have time
  // deals with skipping mastered cards
  // const handleMasteredCards = () => {}

  const isFirstCard = index === 0;
  const isLastCard = index === cardOrder.length - 1;

  return (
    <div className="app">
      <h1>Top LeetCode Questions</h1>
      <h3>How would you solve this questions? Think of the algorithms.</h3>

      <DeckSelector
      currentDeck={currentDeck}
      onDeckChange={handleDeckChange}
      availableDecks={availableDecks}
    />

      <h3>Number of cards: <strong>{flashcardsData.length}</strong></h3>

      <StreakCounter
        currentStreak={currentStreak}
        longestStreak={longestStreak}
      />

      <Flashcard
        flashcard={flashcardsData[cardOrder[index]]}
        key={cardOrder[index]}
        index={index}
        cardCount={flashcardsData.length}
        onAnswerStreak={handleStreak}
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
