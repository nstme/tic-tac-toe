import { BoardChangeHandler, BoardState, Player, PlayerSetter } from "../State";


export default function winDetectorFactory(setWinningPlayer: PlayerSetter) {
  const winDetector: BoardChangeHandler = (board: BoardState) => {
    // examine board state for a win
    // -- if there's a win, call setWinningPlayer(currentPlayer)
    // -- else, do nothing

    console.log({ board });
    setWinningPlayer(Player.PLAYER_1);
  };

  return winDetector;
}