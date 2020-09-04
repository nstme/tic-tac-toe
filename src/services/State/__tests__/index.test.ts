import {
  getBoardState,
  setBoardState,
  // getCurrentUser,
  // setCurrentUser,
  // onBoardChange,
  // onUserChange,
  BoardState,
} from '../';

describe('the State service', () => {
  describe('getBoardState', () => {
    let result: BoardState;

    beforeEach(() => {
      setBoardState(0, 0, 'x');
      setBoardState(0, 1, null);
      setBoardState(0, 2, 'o');
      setBoardState(1, 0, null);
      setBoardState(1, 1, 'x');
      setBoardState(1, 2, null);
      setBoardState(2, 0, 'x');
      setBoardState(2, 1, null);
      setBoardState(2, 2, 'o');

      result = getBoardState();
    });

    it('returns the board', () => {
      expect(result).toEqual([
        ['x', null, 'o'],
        [null, 'x', null],
        ['x', null, 'o'],
      ]);
    });
  });

  describe('getCurrentUser', () => {

  });

  describe('onBoardChange', () => {

  });

  describe('onUserChange', () => {

  });
});