export type BoardCell = 'x' | 'o' | null;
export type BoardRow = BoardCell[];
export type BoardState = BoardRow[];
export type BoardChangeHandler = (board: BoardState, winState: PotentialWins) => void;
export type PlayerChangeHandler = (currentPlayer: Player | undefined) => void;
export type PlayerSetter = (player: Player) => void;
export enum Player {
  PLAYER_1,
  PLAYER_2,
}
export type WinDirection = 'row-1' | 'row-2' | 'row-3' | 'col-1' | 'col-2' | 'col-3' | 'dia-1' | 'dia-2';
export enum WinState {
  WINNABLE,
  NOT_WINNABLE,
  WON,
}
export interface PotentialWinData {
  currentState: BoardCell[];
  player: Player | null;
  state: WinState;
  cellCount: number;
}
export interface PotentialWins {
  [key: string]: PotentialWinData;
}

let board: BoardState;
let potentialWins: PotentialWins;
let currentPlayer: Player | undefined;
let winningPlayer: Player | undefined;

const boardHandlers = new Set<BoardChangeHandler>();
const playerHandlers = new Set<PlayerChangeHandler>();
const winHandlers = new Set<PlayerChangeHandler>();
const boardMap = new Map<number[], WinDirection[]>();

boardMap.set([0, 0], ['row-1', 'col-1', 'dia-1']);
boardMap.set([0, 1], ['row-1', 'col-2']);
boardMap.set([0, 2], ['row-1', 'col-3', 'dia-2']);
boardMap.set([1, 0], ['row-2', 'col-1']);
boardMap.set([1, 1], ['row-2', 'col-2', 'dia-1', 'dia-2']);
boardMap.set([1, 2], ['row-2', 'col-3']);
boardMap.set([2, 0], ['row-3', 'col-1', 'dia-2']);
boardMap.set([2, 1], ['row-3', 'col-2']);
boardMap.set([2, 2], ['row-3', 'col-3', 'dia-1']);

export function getBoardState() {
  return [...board];
}

export function getPotentialWinState() {
  return { ...potentialWins };
}

function emitBoardChangeEvent() {
  boardHandlers.forEach(handler => {
    handler([...board], { ...potentialWins });
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

function getVertices(row: number, col: number) {
  const verticesToUpdate: WinDirection[] | undefined = boardMap.get([row, col]);
  if (verticesToUpdate === undefined) {
    throw new Error('vertix is not defined')
  }

  return verticesToUpdate;
}

function getStateIndex(row: number, col: number, vertex: WinDirection) {
  const dir = vertex.substring(0, 3);

  if (dir === 'col') {
    return row;
  }

  // dia, col
  return col;
}

function getRowCount(vertex: WinDirection, value: BoardCell) {
  return potentialWins[vertex].currentState.filter(cellValue => cellValue !== value).length;
}

function getWinState(vertex: WinDirection) {
  const xCount = potentialWins[vertex].cellCount = getRowCount(vertex, 'x');
  const oCount = potentialWins[vertex].cellCount = getRowCount(vertex, 'o');

  if (xCount !== 0 && oCount !== 0) {
    return WinState.NOT_WINNABLE;
  }

  if (xCount === 3 || oCount === 3) {
    return WinState.WON;
  }

  return WinState.WINNABLE;
}

function updateCurrentState(row: number, col: number, value: BoardCell, vertex: WinDirection, player: Player) {
  const stateIndex = getStateIndex(row, col, vertex);

  if (potentialWins[vertex].currentState[stateIndex] !== null) {
    throw new Error("Can't play the same cell twice!");
  }

  potentialWins[vertex].currentState[stateIndex] = value;
  potentialWins[vertex].cellCount = getRowCount(vertex, null);
  potentialWins[vertex].player = potentialWins[vertex].player = player;
  potentialWins[vertex].state = potentialWins[vertex].state = getWinState(vertex);
}

export function setBoardState(row: number, col: number, value: BoardCell, player: Player) {
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    throw new Error(`row and col must be integers between 0 and 2, but I received row: ${row}, col: ${col}`);
  }

  if (value !== 'x' && value !== 'o' && value !== null) {
    throw new Error(`value must be one of "x, o, null" but I received ${value}`);
  }

  board[row][col] = value;
  // update potentialWins cache
  const verticesToUpdate = getVertices(row, col);
  verticesToUpdate.forEach((vertex: WinDirection) => {
    updateCurrentState(row, col, value, vertex, player);
  })

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

function getEmptyWinData(): PotentialWinData {
  return {
    state: WinState.WINNABLE,
    currentState: [],
    player: null,
    cellCount: 0,
  }
}

export function reset() {
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  potentialWins = {
    'row-1': getEmptyWinData(),
    'row-2': getEmptyWinData(),
    'row-3': getEmptyWinData(),
    'col-1': getEmptyWinData(),
    'col-2': getEmptyWinData(),
    'col-3': getEmptyWinData(),
    'dia-1': getEmptyWinData(),
    'dia-2': getEmptyWinData(),
  };
  currentPlayer = undefined;
  winningPlayer = undefined;
}

export function onBoardChange(onChange: BoardChangeHandler) {
  boardHandlers.add(onChange);

  onChange(board, potentialWins);
}

export function onPlayerChange(onChange: PlayerChangeHandler) {
  playerHandlers.add(onChange);

  onChange(currentPlayer);
};
export function onPlayerWon(onChange: PlayerChangeHandler) {
  winHandlers.add(onChange);

  onChange(winningPlayer);
};