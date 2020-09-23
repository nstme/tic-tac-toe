import winDetectorFactory from '../';
import { BoardState, Player } from '../../State';

function getWinningBoard(): BoardState {
  return [
    ['x', 'x', 'x'],
    [null, 'o', 'o'],
    [null, null, null],
  ]
}

function getLoosingBoard(): BoardState {
  return [
    ['x', 'o', 'x'],
    [null, 'o', 'o'],
    [null, null, null],
  ]
}

describe('WinDetector', () => {
  const setWinningPlayer = jest.fn();
  const winDetector = winDetectorFactory(setWinningPlayer);

  describe('a losing board state', () => {
    beforeEach(() => {
      const board = getLoosingBoard();

      winDetector(board);
    });

    it('it does not update state', () => {
      expect(setWinningPlayer).toHaveBeenCalledTimes(0);
    });
  });

  describe('a winning board state', () => {
    beforeEach(() => {
      const board = getWinningBoard();

      winDetector(board);
    });

    it('it updates the winning player', () => {
      expect(setWinningPlayer).toBeCalledWith(Player.PLAYER_1);
    });
  });
});