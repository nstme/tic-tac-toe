import {
  PotentialWins,
  boardMap,
  WinState,
  PotentialWinData,
  setBoardState,
  WinDirection,
} from '../State';

interface boardMapObject { cellIndex: string, vertices: WinDirection[] };
interface decoratedBoardMapObject extends boardMapObject {
  weight: number;
}

function getBoardMapObject() {
  const boardMapObject: boardMapObject[] = [];
  for (const [cellIndex, vertices] of boardMap) {
    boardMapObject.push({cellIndex, vertices})
  };
  return boardMapObject;
}

function getDecoratedBoardMapObjects(boardMapObjs: boardMapObject[], winnableVertices:PotentialWins):decoratedBoardMapObject[] {
  const [modifier, modifierIndex] = getModifier(winnableVertices);
  const reducer = (acc: decoratedBoardMapObject[], obj:boardMapObject) => {
    return [...acc, {
      ...obj,
      weight: obj.vertices.length,
    }
    ]
  };

  const reduced = boardMapObjs.reduce<decoratedBoardMapObject[]>(reducer, []);
  for (const object of reduced) {
    if (object.cellIndex === modifierIndex) {
      object.weight += modifier;
    }
  }
  return reduced;
}


function getPriorityIndex(vertex: string, vertexData: PotentialWinData) {
  const nullIndex = vertexData.currentState.indexOf(null);
  const [dir, dirNumber] = vertex.split('-');
  let index: number = parseInt(dirNumber) - 1;

  if (dir === 'row') {
    return `${index}${nullIndex}`
  }
  return `${nullIndex}${index}`
}

function getWinnableVertices(boardState: PotentialWins) {
  let winnableVertices: PotentialWins = {};

  for (const [vertex, vertexData] of Object.entries(boardState)) {
    if (vertexData.state === WinState.WINNABLE) {
      winnableVertices[vertex] = vertexData;
    };
  }
  return winnableVertices;
}

function getModifier(winnableVertices: PotentialWins):[number, string] {
  for (const [vertex, vertexData] of Object.entries(winnableVertices)) {
    const priorityIndex = getPriorityIndex(vertex, vertexData);
    return (vertexData.cellCount === 2 && vertexData.currentState.includes('o')) ? [4, priorityIndex] : [0, '']
  };
  return [0, ''];
}

export default function makeAiMove(boardState: PotentialWins) {
  const winnableVertices = getWinnableVertices(boardState);
  if (Object.keys(winnableVertices).length === 0) {
    return console.log('Draw');
  };

  const boardMapObject = getBoardMapObject();
  const decoratedBoardMapObjects = getDecoratedBoardMapObjects(boardMapObject, winnableVertices);
  const sortedDecoratedBoardMapObjects = decoratedBoardMapObjects.sort((a, b) => b.weight - a.weight);
  const highestCellWeightIndex = sortedDecoratedBoardMapObjects[0].cellIndex;
  const [row, col] = highestCellWeightIndex;
  // console.log(sortedDecoratedBoardMapObjects);
  // console.log(row, col, "row, col ****");

  setBoardState(parseInt(row), parseInt(col), 'o');
}