import {
  // BoardState,
  reset,
  // getBoardState,
  PotentialWins,
  WinState,
  getPotentialWinState,
} from '../../State';
import makeAiMove from '../';

describe('makeAiMove', () => {
  let boardState: PotentialWins | undefined;
  let newBoardState: PotentialWins;

  afterEach(() => {
    reset();
    boardState = undefined;
  });

  describe('when there is a winning move for AI Player_2', () => {
    beforeEach(() => {
      boardState = {
            'row-1': {
              currentState: ['o', null, 'o'],
              state: WinState.WINNABLE,
              cellCount: 2,
            },
            'row-2': {
              currentState: [null, 'x', null],
              state: WinState.WINNABLE,
              cellCount: 1,
            },
            'row-3': {
              currentState: [null, null, 'x'],
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
              currentState: ['o', null, 'x'],
              state: WinState.NOT_WINNABLE,
              cellCount: 2,
            },
            'dia-1': {
              currentState: ['o', 'x', 'x'],
              state: WinState.NOT_WINNABLE,
              cellCount: 3,
            },
            'dia-2': {
              currentState: [null, 'x', 'o'],
              state: WinState.NOT_WINNABLE,
              cellCount: 2,
            },
          },
      makeAiMove(boardState);
      newBoardState = getPotentialWinState();
    });

    it('AI Player_2 makes a winning move', () => {
      console.log(newBoardState, "!!!!!!!!!!!!!!");
      expect(newBoardState['row1'].currentState).toEqual(['o', 'o', 'o']);
    });
  });

  describe('when there is a winning move for human Player_1', () => {
    beforeEach(() => {
        boardState = {
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
      },
      makeAiMove(boardState);
      newBoardState = getPotentialWinState();
    });

    it('blocks Player_1 winning move', () => {
      expect(newBoardState['dia2'].currentState).toEqual(['o', 'x', 'x']);
    });
  });

  describe('when the central cell is empty', () => {
    beforeEach(() => {
      boardState = {
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
      },
      makeAiMove(boardState);
      newBoardState = getPotentialWinState();
    });

    it('makes a move to the central cell', () => {
      expect(newBoardState['row2'].currentState).toEqual([null, 'o', null]);
    });
  });

  describe('when the center cell is taken, but there is empty corner cell', () => {
    beforeEach(() => {
      boardState = {
        'row-1': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'row-2': {
          currentState: [null, 'x', null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'row-3': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'col-1': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'col-2': {
          currentState: [null, 'x', null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'col-3': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'dia-1': {
          currentState: [null, 'x', null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'dia-2': {
          currentState: [null, 'x', null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
      },
      makeAiMove(boardState);
      newBoardState = getPotentialWinState();
    });

    it('makes a move to the first available corner cell', () => {
      expect(newBoardState['row1'].currentState).toEqual(['o', null, null]);
    });
  });

  describe('when the center & corner cells are taken, and there are no winning moves', () => {
    beforeEach(() => {
      boardState = {
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
      },
      makeAiMove(boardState);
      newBoardState = getPotentialWinState();
    });

    it('makes a move to the first available edge cell', () => {
      expect(newBoardState['row2'].currentState).toEqual(['o', 'x', 'o']);
    });
  });
});
