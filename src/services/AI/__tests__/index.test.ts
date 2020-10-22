import {
  BoardState,
  reset,
  getBoardState,
} from '../../State';
import makeAiMove from '../';

describe('makeAiMove', () => {
  let board: BoardState | undefined;
  let newBoardState: BoardState;

  afterEach(() => {
    reset();
    board = undefined;
  });

  describe('when there is a winning move for AI Player_2', () => {
    beforeEach(() => {
      board = [
        ['o', null, 'o'],
        [null, 'x', null],
        [null, null, 'x'],
      ];
      makeAiMove(board);
      newBoardState = getBoardState();
    });

    it('AI Player_2 makes a winning move', () => {
      expect(newBoardState).toEqual([
        ['o', 'o', 'o'],
        [null, 'x', null],
        [null, null, 'x'],
      ])
    })
  });

  describe('when there is a winning move for human Player_1', () => {
    beforeEach(() => {
      board = [
        ['o', null, 'x'],
        [null, 'x', null],
        [null, null, 'o'],
      ];
      makeAiMove(board);
      newBoardState = getBoardState();
    });

    it('blocks Player_1 winning move', () => {
      expect(newBoardState).toEqual([
        ['o', null, 'x'],
        [null, 'x', null],
        ['o', null, 'o'],
      ])
    })
  });

  describe('when the central cell is empty', () => {
    beforeEach(() => {
      board = [
        ['x', null, null],
        [null, null, null], 
        [null, null, null],
      ];
      makeAiMove(board);
      newBoardState = getBoardState();
    });

    it('makes a move to the central cell', () => {
      expect(newBoardState).toEqual([
        ['x', null, null],
        [null, 'o', null],
        [null, null, null],
      ])
    })
  });

  describe('when the center cell is taken, but there is empty corner cell', () => {
    beforeEach(() => {
      board = [
        [null, null, null],
        [null, 'x', null],
        [null, null, null],
      ];
      makeAiMove(board);
      newBoardState = getBoardState();
    });

    it.todo('makes a move to the random corner cell', );
  });

  describe('when the center & corner cells are taken, but there is empty edge cell', () => {
    beforeEach(() => {
      board = [
        ['x', null, 'o'],
        ['o', 'o', 'x'],
        ['x', null, 'x'],
      ];
      makeAiMove(board);
      newBoardState = getBoardState();
    });

    it.todo('makes a move to the random edge cell', );
  });
})
