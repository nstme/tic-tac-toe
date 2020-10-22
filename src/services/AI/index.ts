import {
  // Player,
  BoardState,
  BoardCell,
  BoardRow,
  // setBoardState
} from "../State";
 

// Loop over all board cells in current board {
  //  if (current cell is empty) {
  //   check if making a move to current cell will make AI winner
  //     if so -- make a move
  //   else if
  //     check if human player can win playing the cell
  //     if so -- block the potential move
  //   else 
  //      if center cell is empty - move there
  //      else if any of corner cells [0][0], [0][2], [2][0], [2][2] are empty - move to random corner cell
  //      else if any of edge cells [0][1], [1][0], [1][2], [2][1] are empty - move to random corner cell
  //  }
//}

export default function makeAiMove(board: BoardState) {
  let currentCell: BoardCell;
  let currentRow: BoardRow;
  // let newBoard: BoardState = [...board];
  
  for (let r = 0; r < board.length; r += 1 ) {
    currentRow = board[r];
    for (let c = 0; c < currentRow.length; c += 1) {
      currentCell = currentRow[c];
      // console.log('current cell:', currentCell, ', position:', r, ' ', c );
      if (!currentCell) {
        // check if making a move to current cell will make AI winner
      }
    }
  };
  return;
};