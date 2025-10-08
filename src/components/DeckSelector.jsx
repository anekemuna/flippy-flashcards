import React from "react";

const DeckSelector = ({ currentDeck, onDeckChange, availableDecks }) => {
  return (
    <div className="deck-selector">
      <label htmlFor="deck-select">Choose Deck:</label>
      <select
        id="deck-select"
        value={currentDeck}
        onChange={(e) => onDeckChange(e.target.value)}
        className="deck-dropdown"
      >
        {availableDecks.map((deck) => (
          <option key={deck.value} value={deck.value}>
            {deck.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeckSelector;
