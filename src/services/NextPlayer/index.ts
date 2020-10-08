import { Player } from '../State';

export default function nextPlayer(currentPlayer: Player | undefined) {
  const numberOfPlayers: number = Object.values(Player).filter((item) => typeof item !== 'number').length;
  
  // if current player is the last player in line or is undefined, return Player.PLAYER_1 as next player
  if ((currentPlayer === numberOfPlayers) || (!currentPlayer)) {
    return Player.PLAYER_1;
  };
  // else return next player enum value
  return currentPlayer + 1;
  
  // for 2 players only:
  // return currentPlayer === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1;
};
