import {
  PotentialWins,
  boardMap,
  WinState,
  PotentialWinData,
  setBoardState,
} from '../State';

const cellsWeight = new Map<string, number>();
let priorityIndex: string;

// function sortCellsWeight(cellsWeight:any) {
//   return new Map([...cellsWeight.entries()].sort((a, b) => b[1] - a[1]));
// }

function getCellsWeight() {
  let weight: number;
  for (const [cellIndex, vertices] of boardMap) {
    weight = vertices.length;
    cellsWeight.set(cellIndex.toString(), weight);
  };
  return cellsWeight;
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

function updateCellsWeight(winnableVertices: PotentialWins) {
  for (const [vertex, vertexData] of Object.entries(winnableVertices)) {
    if (vertexData.cellCount === 2 && vertexData.currentState.includes('o')) {
      priorityIndex = getPriorityIndex(vertex, vertexData);
      cellsWeight.set(priorityIndex, 10);
    }
    if (vertexData.cellCount === 2 && vertexData.currentState.includes('x')) {
      priorityIndex = getPriorityIndex(vertex, vertexData);
      cellsWeight.set(priorityIndex, 7);
    }
  }
  return;
}

function getKeyByValue(object: any, value: any) {
  return Object.keys(object).find(key => object[key] === value);
}

export default function makeAiMove(boardState: PotentialWins) {
  const winnableVertices = getWinnableVertices(boardState);
  if (Object.keys(winnableVertices).length === 0) {
    return console.log('Draw');
  };

  const cellsWeight = getCellsWeight();
  updateCellsWeight(winnableVertices);

  const maxWeight = Math.max(...cellsWeight.values());
  console.log(maxWeight, "&&&&");

  const highestCellWeightIndex = getKeyByValue(cellsWeight, maxWeight);

  console.log(highestCellWeightIndex, "@@@@@@@");
  // const [row, col] = highestCellWeightIndex;
  // setBoardState(parseInt(row), parseInt(col), 'o');
  setBoardState(1, 1, 'o');
}

const arr: number[] = [1, 4, 2, 7];
const sorted = arr.sort();
// => 1, 2, 4, 7

interface AgeObject { name: string, age: number };
interface DecoratedAgeObject extends AgeObject {
  weight: number;
}

// 0x1234567
const objectArr: AgeObject[] = [{
  name: 'Sally',
  age: 2,
}, {
  name: 'Frank',
  age: 22
}];

function weightObjects(objs: AgeObject[], modifier = 2): DecoratedAgeObject[] {
  const reducer = (acc: DecoratedAgeObject[], obj: AgeObject) => {
    return [...acc, {
      ...obj,
      weight: obj.age + modifier
    }];
  }

  return objs.reduce<DecoratedAgeObject[]>(reducer, []);
}

function sum(a: number, b: number): number {
  a = 4;

  return a + b;
}


const n = 1;
const m = 2;
const sum = sum(n, m);
console.log(n); // => 1

weightObjects(objectArr);
console.log(objectArr[1].age); // => 33

// (a: any, b: any) => 1, -1, 0
const sortedObjects = objectArr.sort((a, b) => {
  if (a.age > b.age) {
    return 1;
  }

  if (b.age > a.age) {
    return -1;
  }

  return 0;
});