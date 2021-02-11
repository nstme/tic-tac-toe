import {
  BoardState,
  PotentialWins,
  WinState,
  BoardChangeHandler,
} from '../../State';

import aiFactory from '../';

describe('makeAiMove', () => {
  let setBoardState: jest.Mock;
  let makeAiMove: BoardChangeHandler;

  beforeEach(() => {
    setBoardState = jest.fn();
    makeAiMove = aiFactory(setBoardState);
  });

  describe('when there is a winning move for AI Player_2', () => {
    beforeEach(() => {
      const board: BoardState = [
        ['o', null, 'o'],
        ['x', null, 'x'],
        [null, null, null],
      ]
      const potentialWinState:PotentialWins = {
        'row-1': {
          currentState: ['o', null, 'o'],
          state: WinState.WINNABLE,
          cellCount: 2,
        },
        'row-2': {
          currentState: ['x', null, 'x'],
          state: WinState.WINNABLE,
          cellCount: 2,
        },
        'row-3': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'col-1': {
          currentState: ['o', 'x', null],
          state: WinState.NOT_WINNABLE,
          cellCount: 2,
        },
        'col-2': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'col-3': {
          currentState: ['o', 'x', null],
          state: WinState.NOT_WINNABLE,
          cellCount: 2,
        },
        'dia-1': {
          currentState: ['o', null, null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'dia-2': {
          currentState: [null, null, 'o'],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
      };
      makeAiMove(board, potentialWinState);
    });

    it('calls setBoardState', () => {
      expect(setBoardState).toHaveBeenCalledTimes(1);
    });

    it('makes a winning move', () => {
      expect(setBoardState).toHaveBeenCalledWith(0, 1, 'o');
    })
  });

  describe('when there is a winning move for human Player_1', () => {
    beforeEach(() => {
      const board: BoardState = [
        ['o', null, 'x'],
        [null, 'x', null],
        [null, null, 'o'],
      ];
      const potentialWinState: PotentialWins = {
        'row-1': {
          currentState: ['o', null, 'x'],
          state: WinState.NOT_WINNABLE,
          cellCount: 2,
        },
        'row-2': {
          currentState: [null, 'x', null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'row-3': {
          currentState: [null, null, 'o'],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'col-1': {
          currentState: ['o', null, null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'col-2': {
          currentState: [null, 'x', null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'col-3': {
          currentState: ['x', null, 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 2,
        },
        'dia-1': {
          currentState: ['o', 'x', 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'dia-2': {
          currentState: [null, 'x', 'x'],
          state: WinState.WINNABLE,
          cellCount: 2,
        },
      };
      makeAiMove(board, potentialWinState);
    });

    it('blocks Player_1 winning move', () => {
      expect(setBoardState).toHaveBeenCalledWith(2, 0, 'o');
    })
  });

  describe('when center cell is not taken', () => {
    beforeEach(() => {
      const board: BoardState = [
        ['x', null, null],
        [null, null, null],
        [null, null, null],
      ];
      const potentialWinState: PotentialWins = {
        'row-1': {
          currentState: ['x', null, null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'row-2': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'row-3': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'col-1': {
          currentState: ['x', null, null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'col-2': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'col-3': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'dia-1': {
          currentState: ['x', null, null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'dia-2': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
      };
      makeAiMove(board, potentialWinState);
    });

    it('makes a move to the center cell', () => {
      expect(setBoardState).toHaveBeenCalledWith(1, 1, 'o');
    })
  });

  describe('when center cell is taken, but corner cell is empty', () => {
    beforeEach(() => {
      const board: BoardState = [
        ['x', null, null],
        [null, 'o', null],
        [null, null, null],
      ];
      const potentialWinState: PotentialWins = {
        'row-1': {
          currentState: ['x', null, null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'row-2': {
          currentState: [null, 'o', null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'row-3': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'col-1': {
          currentState: ['x', null, null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'col-2': {
          currentState: [null, 'o', null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'col-3': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'dia-1': {
          currentState: ['x', 'o', null],
          state: WinState.NOT_WINNABLE,
          cellCount: 2,
        },
        'dia-2': {
          currentState: [null, 'o', null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
      };
      makeAiMove(board, potentialWinState);
    });

    it('makes a move to the first available corner cell', () => {
      expect(setBoardState).toHaveBeenCalledWith(0, 2, 'o');
    })
  });

  describe('when there is a draw', () => {
    beforeEach(() => {
      const board: BoardState = [
        ['x', 'o', 'x'],
        ['o', 'x', null],
        ['o', 'x', 'o'],
      ];
      const potentialWinState: PotentialWins = {
        'row-1': {
          currentState: ['x', 'o', 'x'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'row-2': {
          currentState: ['o', 'x', null],
          state: WinState.NOT_WINNABLE,
          cellCount: 2,
        },
        'row-3': {
          currentState: ['o', 'x', 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'col-1': {
          currentState: ['x', 'o', 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'col-2': {
          currentState: ['o', 'x', 'x'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'col-3': {
          currentState: ['x', null, 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 2,
        },
        'dia-1': {
          currentState: ['x', 'x', 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'dia-2': {
          currentState: ['o', 'x', 'x'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
      };
      makeAiMove(board, potentialWinState);
    });

    it('makes a move to the first available edge', () => {
      expect(setBoardState).toHaveBeenCalledTimes(0);
    })
  })
})