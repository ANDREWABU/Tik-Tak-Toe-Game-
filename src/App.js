import { useState, useEffect } from "react";
import "./App.css";

const initialBoard = () => Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard());
  const [isNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState(null);
  const [showReturnHome, setShowReturnHome] = useState(false);

  const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = () => {
    for (let pattern of WINNING_PATTERNS) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], pattern };
      }
    }
    return null;
  };

  const winningInfo = calculateWinner();
  const winner = winningInfo?.winner || null;
  const winningPattern = winningInfo?.pattern || [];
  const isBoardFull = board.every((cell) => cell !== null);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    if (gameMode === "single" && !isNext) return;

    const newBoard = [...board];
    newBoard[index] = isNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isNext);
  };

  useEffect(() => {
    if (gameMode === "single" && !isNext && !winner) {
      const emptyIndexes = board
        .map((val, i) => (val === null ? i : null))
        .filter((i) => i !== null);

      const move =
        emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

      if (move !== undefined) {
        setTimeout(() => {
          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          setIsXNext(true);
        }, 300);
      }
    }
  }, [isNext, board, winner, gameMode]);

  const getStatusMessage = () => {
    if (winner) return `Player ${winner} Wins!`;
    if (isBoardFull) return "It's a draw!";
    return `Player ${isNext ? "X" : "O"} Turn`;
  };

  const resetGame = () => {
    setBoard(initialBoard());
    setIsXNext(true);
    setShowReturnHome(true);
  };

  const returnHome = () => {
    setGameMode(null);
    setShowReturnHome(false);
  };

  return (
    <>
      <h1 className="game-header">TIC TAC TOE</h1>
      <div className="game">
        {!gameMode && (
          <div className="mode-select">
            <div className="mode-title">PLEASE SELECT A MODE</div>
            <button className="fade-in" onClick={() => setGameMode("single")}>
              Single Player
            </button>
            <button className="fade-in" onClick={() => setGameMode("multi")}>
              Multiplayer
            </button>
          </div>
        )}

        {gameMode && (
          <>
            <div className="status">{getStatusMessage()}</div>

            <div className="board">
              {board.map((value, index) => {
                const isWinning = winningPattern.includes(index);
                return (
                  <button
                    className={`cell ${isWinning ? "winning" : ""}`}
                    key={index}
                    onClick={() => handleClick(index)}
                  >
                    {value}
                  </button>
                );
              })}
            </div>

            <button className="reset-button" onClick={resetGame}>
              RESET GAME
            </button>

            {showReturnHome && (
              <button className="return-button" onClick={returnHome}>
                RETURN HOME
              </button>
            )}
          </>
        )}

        <a
          href="https://andrew-profile-site.web.app/proj.html"
          className="back-link"
        >
          ← Back to Projects
        </a>

        <p className="footer">Andrew Abu © 2025</p>
      </div>
    </>
  );
}

export default App;
