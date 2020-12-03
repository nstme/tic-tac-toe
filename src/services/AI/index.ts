import {
  BoardState,
  BoardCell,
} from "../State";

const valueMap = new Map<string, number>();

// function initMap() {
//   valueMap.set('0,0', 3);
//   valueMap.set('0,1', 2);
//   valueMap.set('0,2', 3);
//   valueMap.set('1,1', 5);
// }

// function onPlayerMove(row: number, col: number, value: BoardCell) {
//   const key = `${row},${col}`;

//   valueMap.delete(key);
// }

export default function makeAiMove(board: BoardState) {
};