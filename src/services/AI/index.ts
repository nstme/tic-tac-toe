import {
  PotentialWins,
  boardMap,
  WinState,
  PotentialWinData,
  BoardState,
  WinDirection,
  BoardChangeHandler,
  BoardSetter,
  Player,
} from '../State';

interface BoardMapObject {
  cellIndex: string;
  vertices: WinDirection[];
}
interface DecoratedBoardMapObject extends BoardMapObject {
  weight: number;
}

function getBoardMapObject() {
  const boardMapObject: BoardMapObject[] = [];
  for (const [cellIndex, vertices] of boardMap) {
    boardMapObject.push({ cellIndex, vertices });
  }
  return boardMapObject;
}

function getDecoratedBoardMapObjects(
  boardMapObjs: BoardMapObject[],
  winnableVertices: PotentialWins,
): DecoratedBoardMapObject[] {
  const [modifierValue, priorityCellIndex] = getModifierData(winnableVertices);
  const reducer = (acc: DecoratedBoardMapObject[], obj: BoardMapObject) => {
    return [
      ...acc,
      {
        ...obj,
        weight: obj.vertices.length,
      },
    ];
  };

  const reduced = boardMapObjs.reduce<DecoratedBoardMapObject[]>(reducer, []);
  for (const object of reduced) {
    if (object.cellIndex === priorityCellIndex) {
      object.weight += modifierValue;
    }
  }
  return reduced;
}

function getPriorityCellIndex(vertex: string, vertexData: PotentialWinData) {
  const nullIndex = vertexData.currentState.indexOf(null);
  const [dir, dirNumber] = vertex.split('-');
  let index: number = parseInt(dirNumber) - 1;

  if (dir === 'col') {
    return `${nullIndex}${index}`;
  }
  if (vertex === 'dia-2') {
    index = parseInt(dirNumber);
  }
  return `${index}${nullIndex}`;
}

function getWinnableVertices(potentialWins: PotentialWins) {
  const winnableVertices: PotentialWins = {};

  for (const [vertex, vertexData] of Object.entries(potentialWins)) {
    if (vertexData.state === WinState.WINNABLE) {
      winnableVertices[vertex] = vertexData;
    }
  }
  return winnableVertices;
}

function getModifierData(winnableVertices: PotentialWins): [number, string] {
  let modifierValue = 0;
  let priorityCellIndex = '';
  for (const [vertex, vertexData] of Object.entries(winnableVertices)) {
    if (vertexData.cellCount === 2) {
      // to give cell with lowest weight 2 a priority higher than max weight 4, this should be true:
      // min weight + modifierValue > max weight
      // 2 + modifierValue > 4
      modifierValue = 3;
      priorityCellIndex = getPriorityCellIndex(vertex, vertexData);
      //prioritize winning over blocking 'x' player
      return vertexData.currentState.includes('o')
        ? [modifierValue + 1, priorityCellIndex]
        : [modifierValue, priorityCellIndex];
    }
  }
  return [modifierValue, priorityCellIndex];
}

function isEmptyCell(
  decoratedBoardMapObject: DecoratedBoardMapObject,
  board: BoardState,
): boolean {
  const [row, col] = decoratedBoardMapObject.cellIndex
    .split('')
    .map((el) => parseInt(el));
  return !board[row][col];
}

export default function aiFactory(
  setBoardState: BoardSetter,
): BoardChangeHandler {
  const makeAiMove: BoardChangeHandler = (
    board: BoardState,
    potentialWins: PotentialWins,
    currentPlayer: Player,
  ) => {
    if (currentPlayer !== 'o') {
      return;
    }
    const winnableVertices = getWinnableVertices(potentialWins);

    if (Object.keys(winnableVertices).length === 0) {
      return console.log('Draw');
    }

    const boardMapObject = getBoardMapObject();
    const decoratedBoardMapObjects = getDecoratedBoardMapObjects(
      boardMapObject,
      winnableVertices,
    );
    const sortedDecoratedBoardMapObjects = decoratedBoardMapObjects
      .sort((a, b) => b.weight - a.weight)
      .filter((entry) => isEmptyCell(entry, board));
    const highestCellWeightIndex = sortedDecoratedBoardMapObjects[0].cellIndex;
    const [row, col] = highestCellWeightIndex
      .split('')
      .map((index: string) => parseInt(index));

    setBoardState(row, col, 'o');
  };

  return makeAiMove;
}
