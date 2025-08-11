// Constantes pour le jeu
export const PLAYER_X = 'X';
export const PLAYER_O = 'O';
export const EMPTY = null;

// Niveaux de difficulté
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

// Évaluation du plateau
const evaluateBoard = (board) => {
  // Vérifier les lignes
  for (let i = 0; i < 3; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return board[i][0] === PLAYER_X ? 10 : -10;
    }
  }

  // Vérifier les colonnes
  for (let i = 0; i < 3; i++) {
    if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return board[0][i] === PLAYER_X ? 10 : -10;
    }
  }

  // Vérifier les diagonales
  if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0] === PLAYER_X ? 10 : -10;
  }
  if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return board[0][2] === PLAYER_X ? 10 : -10;
  }

  return 0; // Match nul
};

// Vérifier si le jeu est terminé
const isGameOver = (board) => {
  return evaluateBoard(board) !== 0 || !hasEmptyCells(board);
};

// Vérifier s'il y a des cases vides
const hasEmptyCells = (board) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === EMPTY) return true;
    }
  }
  return false;
};

// Obtenir les coups possibles
const getAvailableMoves = (board) => {
  const moves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === EMPTY) {
        moves.push([i, j]);
      }
    }
  }
  return moves;
};

// Algorithme Minimax avec élagage alpha-beta
const minimax = (board, depth, isMaximizing, alpha, beta, maxDepth) => {
  const score = evaluateBoard(board);

  // Conditions d'arrêt
  if (score === 10) return score - depth; // IA gagne
  if (score === -10) return score + depth; // Joueur gagne
  if (!hasEmptyCells(board)) return 0; // Match nul
  if (depth >= maxDepth) return 0; // Profondeur maximale atteinte

  if (isMaximizing) {
    let best = -Infinity;
    const moves = getAvailableMoves(board);

    for (const [i, j] of moves) {
      board[i][j] = PLAYER_X;
      const value = minimax(board, depth + 1, false, alpha, beta, maxDepth);
      board[i][j] = EMPTY;
      best = Math.max(best, value);
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break; // Élagage beta
    }
    return best;
  } else {
    let best = Infinity;
    const moves = getAvailableMoves(board);

    for (const [i, j] of moves) {
      board[i][j] = PLAYER_O;
      const value = minimax(board, depth + 1, true, alpha, beta, maxDepth);
      board[i][j] = EMPTY;
      best = Math.min(best, value);
      beta = Math.min(beta, best);
      if (beta <= alpha) break; // Élagage alpha
    }
    return best;
  }
};

// Trouver le meilleur coup pour l'IA
export const findBestMove = (board, difficulty = DIFFICULTY_LEVELS.HARD) => {
  let bestValue = -Infinity;
  let bestMove = null;
  const moves = getAvailableMoves(board);

  // Ajuster la profondeur selon la difficulté
  let maxDepth;
  switch (difficulty) {
    case DIFFICULTY_LEVELS.EASY:
      maxDepth = 2;
      break;
    case DIFFICULTY_LEVELS.MEDIUM:
      maxDepth = 4;
      break;
    case DIFFICULTY_LEVELS.HARD:
      maxDepth = 9;
      break;
    default:
      maxDepth = 9;
  }

  // Ajouter un peu d'aléatoire pour les niveaux faciles
  if (difficulty === DIFFICULTY_LEVELS.EASY && Math.random() < 0.3) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  for (const [i, j] of moves) {
    board[i][j] = PLAYER_X;
    const moveValue = minimax(board, 0, false, -Infinity, Infinity, maxDepth);
    board[i][j] = EMPTY;

    if (moveValue > bestValue) {
      bestValue = moveValue;
      bestMove = [i, j];
    }
  }

  return bestMove;
};

// Vérifier si quelqu'un a gagné
export const checkWinner = (board) => {
  const score = evaluateBoard(board);
  if (score === 10) return PLAYER_X;
  if (score === -10) return PLAYER_O;
  return null;
};

// Vérifier si le jeu est terminé
export const isGameFinished = (board) => {
  return isGameOver(board);
};
