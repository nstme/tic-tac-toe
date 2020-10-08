export type BoardCell = 'x' | 'o' | null;
export type BoardRow = BoardCell[];
export type BoardState = BoardRow[];
export type BoardChangeHandler = (board: BoardState) => void;
export type PlayerChangeHandler = (currentPlayer: Player | undefined) => void;
export type PlayerSetter = (player: Player) => void;
export enum Player {
  PLAYER_1 = 1,
  PLAYER_2,
}

let board: BoardState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
let currentPlayer: Player | undefined;
let winningPlayer: Player | undefined;

const boardHandlers = new Set<BoardChangeHandler>();
const playerHandlers = new Set<PlayerChangeHandler>();
const winHandlers = new Set<PlayerChangeHandler>();

export function getBoardState() {
  return [...board];
}

function emitBoardChangeEvent() {
  boardHandlers.forEach(handler => {
    handler([...board]);
  });
}

function emitPlayerChangeEvent() {
  playerHandlers.forEach(handler => {
    handler(currentPlayer);
  });
}

function emitWinChangeEvent() {
  winHandlers.forEach(handler => {
    handler(currentPlayer);
  });
}

export function setBoardState(row: number, col: number, value: BoardCell) {
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    throw new Error(`row and col must be integers between 0 and 2, but I received row: ${row}, col: ${col}`);
  }

  if (value !== 'x' && value !== 'o' && value !== null) {
    throw new Error(`value must be one of "x, o, null" but I received ${value}`);
  }

  board[row][col] = value;
  emitBoardChangeEvent();
}

export function setCurrentPlayer(player: Player) {
  currentPlayer = player;
  emitPlayerChangeEvent();
}

export function getCurrentPlayer() {
  return currentPlayer;
}

export function setWinningPlayer(player: Player) {
  winningPlayer = player;
  emitWinChangeEvent();
}

export function getWinningPlayer() {
  return winningPlayer;
}

export function reset() {
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  currentPlayer = undefined;
  winningPlayer = undefined;
}

export function onBoardChange(onChange: BoardChangeHandler) {
  boardHandlers.add(onChange);

  onChange(board);
}

export function onPlayerChange(onChange: PlayerChangeHandler) {
  playerHandlers.add(onChange);

  onChange(currentPlayer);
};
export function onPlayerWon(onChange: PlayerChangeHandler) {
  winHandlers.add(onChange);

  onChange(winningPlayer);
};