# State service

A service for maintaining the current state of the tic-tac-toe game.

## Quickstart

```typescript
import { 
  getBoardState, 
  setBoardState, 
  getCurrentUser, 
  setCurrentUser, 
  onBoardChange, 
  onUserChange,
  BoardState,
  Player
} from './State';

//////////////////////////////////////////

// Game starts
//  - set the current user to Player 1
//  - initialize the board
// Player 1 moves
//  - update the board state
//  - set current user to Player 2
//  - check to see if someone won

const boardState: BoardState = getBoardState();
/*
[
  [x, o, null],
  [null, o, null],
  [null, null, null]
]
*/
setBoardState(0, 2, 'x');
onBoardChange((boardState) => {
  // react to board change here
});

const currentUser: Player = getCurrentUser();
// => Player.PLAYER_1
setCurrentUser(Player.PLAYER_2);
onUserChange((currentChange) => {
  // react to user change here
});

```