import { Player } from '../../State';
import nextPlayer from '../';

describe('nextPlayer', () => {
  describe('when the player is PLAYER_1', () => {
    it('sets PLAYER_1 to PLAYER_2', () => {
      expect(nextPlayer(Player.PLAYER_1)).toBe(Player.PLAYER_2);
    })
  });

  describe('when the player is PLAYER_2', () => {
    it('sets PLAYER_2 to PLAYER_1', () => {
      expect(nextPlayer(Player.PLAYER_2)).toBe(Player.PLAYER_1);
    })
  });

  describe('when the player is undefined', () => {
    it('sets undefined to PLAYER_1', () => {
      expect(nextPlayer(undefined)).toBe(Player.PLAYER_1);
    })
  });
})
