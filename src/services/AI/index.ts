import {
  PotentialWins, Player, BoardMap,
} from '../State';

// filter state obj for winnable vertices 
  
  // get winnableVertices for Player2 -- 'o' with cellCount > 0 
  // get vertex with highest cellCount - priorityVertex, and make a move() there:
    //get empty cell's row,col in priorityVertex;
    //get cellVertices array for this row,col using BoardMap and
    //cellVertices.forEach( vertex, () => updateCurrentState(row, col,'o', vertex))
  //return

  // get winnable vertices for Player1 -- 'x' with cellCount > 0
    // if found, make aiMove() to block (same logic as above)\
    //return

  //if center cell [1,1] is empty
    //make a move to center cell by updating currentState:
      //get cellVertices for given cell row,col using BoardMap
      //call updateCurrentState(1,1,'o',vertex) for each vertex
    // return

  //if any of corner cells [0, 0], [0, 2], [2, 0], [2, 2] is empty
    //make a move to the first empty cell by updating currentState:
      //get cellVertices for given cell row,col using BoardMap
      //call updateCurrentState(1,1,'o',vertex) for each vertex
  //return

  // same for border cells [0,1], [1, 0], [1, 2], [2, 1]

  //in case there are no WinState.WINNABLE states i.e. hasWinState(boardState) === false
    // filter out vertices with cellCounts === 3 and
    // make a move to the empty cell of the first vertex


export default function makeAiMove(boardState: PotentialWins) {}
