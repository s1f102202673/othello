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
  const clickHandler = (x: number, y: number) => {
    console.log(`Clicked cell: (${x}, ${y})`);
    if (isValidMove(board, x, y, turnColor)) {
      const newBoard = makeMove(board, x, y, turnColor);
      setBoard(newBoard);
      setTurnColor(turnColor === 1 ? 2 : 1);
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
    </div>
  );
};

export default Home;
