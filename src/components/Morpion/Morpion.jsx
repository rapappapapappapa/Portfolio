import React, { useState, useEffect } from 'react';
import styles from './Morpion.module.css';
import { 
  findBestMove, 
  checkWinner, 
  isGameFinished, 
  PLAYER_X, 
  PLAYER_O, 
  EMPTY,
  DIFFICULTY_LEVELS 
} from '../../utils/gameAI';

export const Morpion = () => {
  const [board, setBoard] = useState(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_O);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp' ou 'ai'
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS.MEDIUM);
  const [isAITurn, setIsAITurn] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);

  // Initialiser le jeu
  const initializeGame = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)));
    setCurrentPlayer(PLAYER_O);
    setWinner(null);
    setIsAITurn(false);
    setGameHistory([]);
  };

  // Gérer le clic sur une case
  const handleSquareClick = (row, col) => {
    // Vérifier si la case est déjà prise ou si c'est le tour de l'IA
    if (board[row][col] !== EMPTY || isAITurn || winner) return;

    // Jouer le coup du joueur
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = currentPlayer;
    
    setBoard(newBoard);
    setGameHistory(prev => [...prev, { player: currentPlayer, row, col }]);

    // Vérifier s'il y a un gagnant
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      return;
    }

    // Vérifier si le jeu est terminé
    if (isGameFinished(newBoard)) {
      setWinner('draw');
      return;
    }

    // Passer au joueur suivant
    const nextPlayer = currentPlayer === PLAYER_O ? PLAYER_X : PLAYER_O;
    setCurrentPlayer(nextPlayer);

    // Si c'est le mode IA et que c'est le tour de l'IA
    if (gameMode === 'ai' && nextPlayer === PLAYER_X) {
      setIsAITurn(true);
      // Délai pour montrer que l'IA réfléchit
      setTimeout(() => {
        makeAIMove(newBoard);
      }, 500);
    }
  };

  // Faire jouer l'IA
  const makeAIMove = (currentBoard) => {
    const aiMove = findBestMove(currentBoard, difficulty);
    if (aiMove) {
      const [row, col] = aiMove;
      const newBoard = currentBoard.map(row => [...row]);
      newBoard[row][col] = PLAYER_X;
      
      setBoard(newBoard);
      setGameHistory(prev => [...prev, { player: PLAYER_X, row, col }]);

      // Vérifier s'il y a un gagnant
      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
        setIsAITurn(false);
        return;
      }

      // Vérifier si le jeu est terminé
      if (isGameFinished(newBoard)) {
        setWinner('draw');
        setIsAITurn(false);
        return;
      }

      setCurrentPlayer(PLAYER_O);
    }
    setIsAITurn(false);
  };

  // Annuler le dernier coup
  const undoMove = () => {
    if (gameHistory.length === 0 || isAITurn) return;

    const newHistory = gameHistory.slice(0, -1);
    setGameHistory(newHistory);

    // Reconstruire le plateau
    const newBoard = Array(3).fill(null).map(() => Array(3).fill(null));
    newHistory.forEach(move => {
      newBoard[move.row][move.col] = move.player;
    });

    setBoard(newBoard);
    setCurrentPlayer(newHistory.length % 2 === 0 ? PLAYER_O : PLAYER_X);
    setWinner(null);
  };

  // Obtenir le message de statut
  const getStatusMessage = () => {
    if (winner === 'draw') return "Match nul !";
    if (winner) return `Gagnant : ${winner === PLAYER_O ? 'Joueur O' : 'IA'}`;
    if (isAITurn) return "L'IA réfléchit...";
    return `Tour de : ${currentPlayer === PLAYER_O ? 'Joueur O' : 'IA'}`;
  };

  // Changer le mode de jeu
  const changeGameMode = (mode) => {
    setGameMode(mode);
    initializeGame();
  };

  // Changer la difficulté
  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    if (gameMode === 'ai') {
      initializeGame();
    }
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameHeader}>
        <h3 className={styles.gameTitle}>Morpion avec IA</h3>
        
        {/* Sélection du mode */}
        <div className={styles.modeSelector}>
          <button 
            className={`${styles.modeBtn} ${gameMode === 'pvp' ? styles.active : ''}`}
            onClick={() => changeGameMode('pvp')}
          >
            Joueur vs Joueur
          </button>
          <button 
            className={`${styles.modeBtn} ${gameMode === 'ai' ? styles.active : ''}`}
            onClick={() => changeGameMode('ai')}
          >
            Joueur vs IA
          </button>
        </div>

        {/* Sélection de la difficulté (seulement en mode IA) */}
        {gameMode === 'ai' && (
          <div className={styles.difficultySelector}>
            <span>Difficulté :</span>
            <button 
              className={`${styles.diffBtn} ${difficulty === DIFFICULTY_LEVELS.EASY ? styles.active : ''}`}
              onClick={() => changeDifficulty(DIFFICULTY_LEVELS.EASY)}
            >
              Facile
            </button>
            <button 
              className={`${styles.diffBtn} ${difficulty === DIFFICULTY_LEVELS.MEDIUM ? styles.active : ''}`}
              onClick={() => changeDifficulty(DIFFICULTY_LEVELS.MEDIUM)}
            >
              Moyen
            </button>
            <button 
              className={`${styles.diffBtn} ${difficulty === DIFFICULTY_LEVELS.HARD ? styles.active : ''}`}
              onClick={() => changeDifficulty(DIFFICULTY_LEVELS.HARD)}
            >
              Impossible
            </button>
          </div>
        )}
      </div>

      {/* Statut du jeu */}
      <div className={styles.gameStatus}>
        <p className={styles.statusText}>{getStatusMessage()}</p>
      </div>

      {/* Plateau de jeu */}
      <div className={styles.game}>
        <div className={styles.board}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={`${styles.square} ${cell ? styles.filled : ''} ${isAITurn ? styles.disabled : ''}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  disabled={isAITurn || winner}
                >
                  {cell}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Contrôles */}
      <div className={styles.gameControls}>
        <button 
          className={styles.controlBtn}
          onClick={initializeGame}
        >
          Nouvelle Partie
        </button>
        <button 
          className={`${styles.controlBtn} ${gameHistory.length === 0 || isAITurn ? styles.disabled : ''}`}
          onClick={undoMove}
          disabled={gameHistory.length === 0 || isAITurn}
        >
          Annuler
        </button>
      </div>

      {/* Indicateur de réflexion de l'IA */}
      {isAITurn && (
        <div className={styles.aiThinking}>
          <div className={styles.spinner}></div>
          <span>L'IA réfléchit...</span>
        </div>
      )}
    </div>
  );
};
