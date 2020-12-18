import { BoardChangeHandler, BoardState, Player, PlayerSetter, BoardCell, PotentialWins, WinState } from "../State";

export default function winDetectorFactory(setWinningPlayer: PlayerSetter) {
  const winDetector: BoardChangeHandler = (_board: BoardState, winState: PotentialWins) => {
    // examine board state for a win
    // -- if there's a win, call setWinningPlayer(currentPlayer)
    // -- else, do nothing
    for (const vertex in winState) {
      if (winState[vertex].state === WinState.WON) {
        //checks only first element in winning vertex as the rest are the same
        const winningCell: BoardCell = winState[vertex].currentState[0];
        if (winningCell === 'x') {
          setWinningPlayer(Player.PLAYER_1);
        }
        if (winningCell === 'o') {
          setWinningPlayer(Player.PLAYER_2)
        };
      }
    }
  };

  return winDetector;
}