import { BoardChangeHandler, BoardState, Player, PlayerSetter, BoardCell, getCurrentPlayer } from "../State";

export default function winDetectorFactory(setWinningPlayer: PlayerSetter) {
  const winDetector: BoardChangeHandler = (board: BoardState) => {
    // examine board state for a win
    // -- if there's a win, call setWinningPlayer(currentPlayer)
    // -- else, do nothing
    const cell1: BoardCell = board[0][0];
    const cell2: BoardCell = board[0][1];
    const cell3: BoardCell = board[0][2];
    const cell4: BoardCell = board[1][0];
    const cell5: BoardCell = board[1][1];
    const cell6: BoardCell = board[1][2];
    const cell7: BoardCell = board[2][0];
    const cell8: BoardCell = board[2][1];
    const cell9: BoardCell = board[2][2];

    function hasWinningRow () {
      return ((cell1 === cell2 && cell2 === cell3 && cell3 !== null) ||
        (cell4 === cell5 && cell5 === cell6 && cell6 !== null) ||
      (cell7 === cell8 && cell8 === cell9 && cell9 !== null))
      ? true : false;
    };

    function hasWinningColumn() {
      return ((cell1 === cell4 && cell4 === cell7 && cell7 !== null) ||
        (cell2 === cell5 && cell5 === cell8 && cell8 !== null) ||
        (cell3 === cell6 && cell6 === cell9 && cell9 !== null))
        ? true : false;
    };

    function hasWinningDiagonal() {
      return ((cell1 === cell5 && cell5 === cell9 && cell9 !== null) ||
        (cell3 === cell5 && cell5 === cell7 && cell7 !== null))
        ? true : false;
    };

    if (hasWinningRow() || hasWinningColumn() || hasWinningDiagonal()) {
      console.log({ board });
      let currentPlayer: Player | undefined = getCurrentPlayer();
      currentPlayer = Player.PLAYER_1; //temp for testing
      setWinningPlayer(currentPlayer);
    };
    return;
  };

  return winDetector;
}