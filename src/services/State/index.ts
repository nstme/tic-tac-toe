export type BoardCell = 'x' | 'o' | null;
export type BoardRow = BoardCell[];
export type BoardState = BoardRow[];
export enum Player {
  PLAYER_1,
  PLAYER_2,
}

const board: BoardState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export function getBoardState() {
  return [...board];
}

export function setBoardState(row: number, col: number, value: BoardCell) {
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    throw new Error(`row and col must be integers between 0 and 2, but I received row: ${row}, col: ${col}`);
  }

  if (value !== 'x' && value !== 'o' && value !== null) {
    throw new Error(`value must be one of "x, o, null" but I received ${value}`);
  }

  board[row][col] = value;
}