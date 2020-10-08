import { Player } from '../../State';
import nextPlayer from '../';

describe('nextPlayer', () => {
  it('sets nextPlayer', () => {
    expect(nextPlayer(Player.PLAYER_1)).toBe(Player.PLAYER_2);
    expect(nextPlayer(Player.PLAYER_2)).toBe(Player.PLAYER_1);
    expect(nextPlayer(undefined)).toBe(Player.PLAYER_1);
  })
})
