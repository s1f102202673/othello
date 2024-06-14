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
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
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

    for (const dir of directions) {
      if (board[y + dir[0]] !== undefined) {
        if (board[y + dir[0]][x] !== undefined && board[y + dir[0]][x] === 2 / turnColor) {
          newBoard[y][x] = turnColor;
          setTurnColor(2 / turnColor);
        } else if (board[y][x] !== undefined && board[y][x] === 2 / turnColor) {
          newBoard[y][x] = turnColor;
          setTurnColor(2 / turnColor);
        } else if (board[y][x + dir[1]] !== undefined && board[y][x + dir[1]] === 2 / turnColor) {
          newBoard[y][x] = turnColor;
          setTurnColor(2 / turnColor);
        } else if (
          board[y + dir[0]][x + dir[1]] !== undefined &&
          board[y + dir[0]][x + dir[1]] === 2 / turnColor
        ) {
          newBoard[y][x] = turnColor;
          setTurnColor(2 / turnColor);
        }
      }
    }

    setBoard(newBoard);
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
