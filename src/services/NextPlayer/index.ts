import { Player } from '../State';

export default function nextPlayer(currentPlayer: Player | undefined) {
  return currentPlayer === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1;
};
