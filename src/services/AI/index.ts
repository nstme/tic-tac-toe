import {
  PotentialWins,
  boardMap,
  WinState,
  PotentialWinData,
  BoardState,
  // setBoardState,
  WinDirection,
  BoardChangeHandler,
  BoardSetter,
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

  if (dir === 'col') {
    return `${nullIndex}${index}`
  }
  if (vertex === 'dia-2') {
    index = 2;
  }
  return `${index}${nullIndex}`
}

function getWinnableVertices(potentialWins: PotentialWins) {
  let winnableVertices: PotentialWins = {};

  for (const [vertex, vertexData] of Object.entries(potentialWins)) {
    if (vertexData.state === WinState.WINNABLE) {
      winnableVertices[vertex] = vertexData;
    };
  }
  return winnableVertices;
}

function getModifier(winnableVertices: PotentialWins):[number, string] {
  for (const [vertex, vertexData] of Object.entries(winnableVertices)) {
    if (vertexData.cellCount === 2) {
      const priorityIndex = getPriorityIndex(vertex, vertexData);
      return vertexData.currentState.includes('o') ?[4, priorityIndex] : [3, priorityIndex]
    }
  }
  return [0, ''];
}

// export default function makeAiMove(potentialWins: PotentialWins) {
//   const winnableVertices = getWinnableVertices(potentialWins);
//   if (Object.keys(winnableVertices).length === 0) {
//     return console.log('Draw');
//   };

//   const boardMapObject = getBoardMapObject();
//   const decoratedBoardMapObjects = getDecoratedBoardMapObjects(boardMapObject, winnableVertices);
//   const sortedDecoratedBoardMapObjects = decoratedBoardMapObjects.sort((a, b) => b.weight - a.weight);
//   const highestCellWeightIndex = sortedDecoratedBoardMapObjects[0].cellIndex;
//   const [row, col] = highestCellWeightIndex;
  
//   setBoardState(parseInt(row), parseInt(col), 'o');
// }

export default function aiFactory(setBoardState: BoardSetter) {
  const makeAiMove: BoardChangeHandler = (
    _board: BoardState,
    potentialWins: PotentialWins,
  ) => {
    const winnableVertices = getWinnableVertices(potentialWins);
    if (Object.keys(winnableVertices).length === 0) {
      return console.log('Draw');
    };

    const boardMapObject = getBoardMapObject();
    const decoratedBoardMapObjects = getDecoratedBoardMapObjects(boardMapObject, winnableVertices);
    const sortedDecoratedBoardMapObjects = decoratedBoardMapObjects.sort((a, b) => b.weight - a.weight);
    const highestCellWeightIndex = sortedDecoratedBoardMapObjects[0].cellIndex;
    const [row, col] = highestCellWeightIndex;

    setBoardState(parseInt(row), parseInt(col), 'o');
  };
  
  return makeAiMove;
}