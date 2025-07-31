import React, { useState } from "react";
import styles from "./Morpion.module.css";

const Morpion = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);

  const status = winner
    ? `Gagnant : ${winner}`
    : isBoardFull
    ? "Égalité"
    : `Prochain joueur : ${isXNext ? "X" : "O"}`;

  return (
    <div className={styles.game}>
      <h3>{status}</h3>
      <div className={styles.board}>
        {squares.map((square, index) => (
          <button
            key={index}
            className={`${styles.square} ${square === "X" ? styles.blue : square === "O" ? styles.red : ""}`}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      {(winner || isBoardFull) && <button onClick={resetGame}>Rejouer</button>}
    </div>
  );
};


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Morpion;
