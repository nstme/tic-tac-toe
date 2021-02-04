export type BoardCell = 'x' | 'o' | null;
export type BoardRow = BoardCell[];
export type BoardState = BoardRow[];
export type BoardChangeHandler = (
  board: BoardState,
  winState: PotentialWins,
) => void;
export type WinDirection =
  | 'row-1'
  | 'row-2'
  | 'row-3'
  | 'col-1'
  | 'col-2'
  | 'col-3'
  | 'dia-1'
  | 'dia-2';
export enum WinState {
  WINNABLE,
  NOT_WINNABLE,
  WON,
}
export interface PotentialWinData {
  currentState: BoardCell[];
  state: WinState;
  cellCount: number;
}
export interface PotentialWins {
  [key: string]: PotentialWinData;
}
export enum Player {
  PLAYER_1,
  PLAYER_2,
}
export type PlayerSetter = (player: Player) => void;

let board: BoardState;
let potentialWins: PotentialWins;

const boardHandlers = new Set<BoardChangeHandler>();
export const boardMap = new Map<string, WinDirection[]>();

boardMap.set('00', ['row-1', 'col-1', 'dia-1']);
boardMap.set('01', ['row-1', 'col-2']);
boardMap.set('02', ['row-1', 'col-3', 'dia-2']);
boardMap.set('10', ['row-2', 'col-1']);
boardMap.set('11', ['row-2', 'col-2', 'dia-1', 'dia-2']);
boardMap.set('12', ['row-2', 'col-3']);
boardMap.set('20', ['row-3', 'col-1', 'dia-2']);
boardMap.set('21', ['row-3', 'col-2']);
boardMap.set('22', ['row-3', 'col-3', 'dia-1']);

export function getBoardState() {
  return [...board];
}

export function getPotentialWinState() {
  return { ...potentialWins };
}

function emitBoardChangeEvent() {
  boardHandlers.forEach((handler) => {
    handler([...board], { ...potentialWins });
  });
}

function getVertices(row: number, col: number) {
  const verticesToUpdate: WinDirection[] | undefined = boardMap.get(
    `${row}${col}`,
  );
  if (verticesToUpdate === undefined) {
    throw new Error('vertix is not defined');
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

function getCellCount(vertex: WinDirection, value: BoardCell) {
  const res = potentialWins[vertex].currentState.filter(
    (cellValue) => cellValue === value,
  );
  return res.length;
}

function getWinState(vertex: WinDirection) {
  const xCount = getCellCount(vertex, 'x');
  const oCount = getCellCount(vertex, 'o');

  if (xCount !== 0 && oCount !== 0) {
    return WinState.NOT_WINNABLE;
  }

  if (xCount === 3 || oCount === 3) {
    return WinState.WON;
  }

  return WinState.WINNABLE;
}

function updateCurrentState(
  row: number,
  col: number,
  value: BoardCell,
  vertex: WinDirection,
) {
  const stateIndex = getStateIndex(row, col, vertex);

  if (potentialWins[vertex].currentState[stateIndex] !== null) {
    throw new Error("Can't play the same cell twice!");
  }

  potentialWins[vertex].currentState[stateIndex] = value;
  potentialWins[vertex].cellCount = 3 - getCellCount(vertex, null);
  potentialWins[vertex].state = potentialWins[vertex].state = getWinState(
    vertex,
  );
}

export function setBoardState(row: number, col: number, value: BoardCell) {
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    throw new Error(
      `row and col must be integers between 0 and 2, but I received row: ${row}, col: ${col}`,
    );
  }

  if (value !== 'x' && value !== 'o' && value !== null) {
    throw new Error(
      `value must be one of "x, o, null" but I received ${value}`,
    );
  }
  console.log(board, "board****");
  board[row][col] = value;
  // update potentialWins cache
  const verticesToUpdate = getVertices(row, col);
  verticesToUpdate.forEach((vertex: WinDirection) => {
    updateCurrentState(row, col, value, vertex);
  });

  emitBoardChangeEvent();
}

function getEmptyWinData(): PotentialWinData {
  return {
    state: WinState.WINNABLE,
    currentState: [null, null, null],
    cellCount: 0,
  };
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
}

export function onBoardChange(onChange: BoardChangeHandler) {
  boardHandlers.add(onChange);

  onChange(board, potentialWins);
}
