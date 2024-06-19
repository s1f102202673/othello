import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [winner, setWinner] = useState<number | null>(null);

  const isValidMove = (board: number[][], x: number, y: number, turnColor: number): boolean => {
    if (board[y][x] !== 0) return false;
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [1, 1],
      [1, -1],
      [-1, 0],
      [-1, 1],
      [-1, -1],
    ];

    for (const [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;
      let foundOpponent = false;

      while (
        nx >= 0 &&
        nx < 8 &&
        ny >= 0 &&
        ny < 8 &&
        board[ny][nx] === (turnColor === 1 ? 2 : 1)
      ) {
        nx += dx;
        ny += dy;
        foundOpponent = true;
      }

      if (foundOpponent && nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && board[ny][nx] === turnColor) {
        return true;
      }
    }
    return false;
  };

  const makeMove = (board: number[][], x: number, y: number, turnColor: number): number[][] => {
    const newBoard = board.map((row) => row.slice());
    newBoard[y][x] = turnColor;

    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [1, 1],
      [1, -1],
      [-1, 0],
      [-1, 1],
      [-1, -1],
    ];

    for (const [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;
      const path = [];

      while (
        nx >= 0 &&
        nx < 8 &&
        ny >= 0 &&
        ny < 8 &&
        board[ny][nx] === (turnColor === 1 ? 2 : 1)
      ) {
        path.push([nx, ny]);
        nx += dx;
        ny += dy;
      }

      if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && board[ny][nx] === turnColor) {
        for (const [px, py] of path) {
          newBoard[py][px] = turnColor;
        }
      }
    }

    return newBoard;
  };

  const checkGameEnd = (board: number[][]): boolean => {
    // 両プレイヤーに有効な手がないか確認
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (isValidMove(board, x, y, 1) || isValidMove(board, x, y, 2)) {
          return false;
        }
      }
    }
    return true;
  };

  const calculateWinner = (board: number[][]): number => {
    let blackCount = 0;
    let whiteCount = 0;
    for (const row of board) {
      for (const cell of row) {
        if (cell === 1) blackCount++;
        else if (cell === 2) whiteCount++;
      }
    }
    if (blackCount > whiteCount) return 1;
    if (whiteCount > blackCount) return 2;
    return 0; // 0 は引き分けを示す
  };

  const clickHandler = (x: number, y: number) => {
    if (winner !== null) return;
    console.log(`Clicked cell: (${x}, ${y})`);
    if (isValidMove(board, x, y, turnColor)) {
      const newBoard = makeMove(board, x, y, turnColor);
      setBoard(newBoard);
      setTurnColor(turnColor === 1 ? 2 : 1);
      if (checkGameEnd(newBoard)) {
        const gameWinner = calculateWinner(newBoard);
        setWinner(gameWinner);
      }
    } else {
      console.log('Invalid move');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
      {winner !== null && (
        <div className={styles.winnerStyle}>
          {winner === 0 ? '引き分けです' : `プレイヤー ${winner} の勝ちです！`}
        </div>
      )}
    </div>
  );
};

export default Home;
