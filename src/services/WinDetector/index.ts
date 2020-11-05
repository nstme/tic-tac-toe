import { BoardChangeHandler, BoardState, Player, PlayerSetter, BoardCell, PotentialWins } from "../State";

type VertexWinDetector = (board: BoardState) => BoardCell;

function isWinningVertex(vertex: BoardCell[]) {
  return vertex[0] !== null && vertex[0] === vertex[1] && vertex[0] === vertex[2]
}

const detectWinningRow: VertexWinDetector = (board: BoardState) => {
  let r = 0;

  while (r < 3) {
    const row = board[r];

    if (isWinningVertex(row)) {
      return row[0];
    }

    r += 1;
  }

  return null;
}

const detectWinningCol: VertexWinDetector = (board: BoardState) => {
  let c = 0;

  while (c < 3) {
    const col = [
      board[0][c],
      board[1][c],
      board[2][c],
    ];

    if (isWinningVertex(col)) {
      return col[0];
    }

    c += 1;
  }

  return null;
}

const detectWinningDiag: VertexWinDetector = (board: BoardState) => {
  const points = [
    [0, 0],
    [2, 0],
  ];
  let p = 0;

  while (p < points.length) {
    const point = points[p];
    const m = point[0] === 0 ? 1 : -1;
    const diag = [
      board[point[0]][point[1]],
      board[point[0] + m][point[1] + 1],
      board[point[0] + (m * 2)][point[1] + 2],
    ];

    if (isWinningVertex(diag)) {
      return diag[0];
    }

    p += 1;
  }

  return null;
}

export default function winDetectorFactory(setWinningPlayer: PlayerSetter) {
  const winDetector: BoardChangeHandler = (board: BoardState, winState: PotentialWins) => {
    // examine board state for a win
    // -- if there's a win, call setWinningPlayer(currentPlayer)
    // -- else, do nothing
    let winningToken: BoardCell = null;

    winningToken = detectWinningRow(board)
      || detectWinningCol(board)
      || detectWinningDiag(board);

    if (winningToken !== null) {
      setWinningPlayer(Player.PLAYER_1);
    }
  };

  return winDetector;
}