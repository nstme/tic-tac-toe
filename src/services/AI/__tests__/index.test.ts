import {
  BoardState,
  // reset,
  PotentialWins,
  WinState,
  // getPotentialWinState,
  BoardChangeHandler,
} from '../../State';
// import makeAiMove from '../';
import aiFactory from '../';

describe('makeAiMove', () => {
  let setBoardState: jest.Mock;
  let makeAiMove: BoardChangeHandler;
  const board: BoardState = [
    [null, 'x', 'x'],
    ['o', 'x', 'x'],
    ['x', 'x', 'o'],
  ];

  beforeEach(() => {
    setBoardState = jest.fn();
    makeAiMove = aiFactory(setBoardState);
  });

  describe('when there is a winning move for AI Player_2', () => {
    beforeEach(() => {
      const potentialWinState:PotentialWins = {
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
      };
      makeAiMove(board, potentialWinState);
    });

    it('calls setBoardState', () => {
      expect(setBoardState).toHaveBeenCalledTimes(1);
    });

    it('makes a winning move', () => {
      expect(setBoardState).toHaveBeenCalledWith(0, 1, 'o');
    })
  })
})

//     it.only('AI Player_2 makes a winning move', () => {
//       expect(newPotentialWins['row-1'].currentState).toEqual(['o', 'o', 'o']);
//     });

// describe('makeAiMove', () => {
//   let board: BoardState | undefined;
//   let potentialWins: PotentialWins | undefined;
//   let newPotentialWins: PotentialWins;

//   console.log(board);
//   afterEach(() => {
//     reset();
//     potentialWins = undefined;
//     board = undefined;
//   });

//   describe('when there is a winning move for AI Player_2', () => {
//     beforeEach(() => {
//       potentialWins = {
//         'row-1': {
//           currentState: ['o', null, 'o'],
//           state: WinState.WINNABLE,
//           cellCount: 2,
//         },
//         'row-2': {
//           currentState: [null, 'x', null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'row-3': {
//           currentState: [null, null, 'x'],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'col-1': {
//           currentState: ['o', null, null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'col-2': {
//           currentState: [null, 'x', null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'col-3': {
//           currentState: ['o', null, 'x'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 2,
//         },
//         'dia-1': {
//           currentState: ['o', 'x', 'x'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 3,
//         },
//         'dia-2': {
//           currentState: [null, 'x', 'o'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 2,
//         },
//       };
//       board = [
//         ['o', null, 'o'],
//         [null, 'x', null],
//         [null, null, 'x'],
//       ];
//       makeAiMove(potentialWins);
//       newPotentialWins = getPotentialWinState();
//     });

//     it.only('AI Player_2 makes a winning move', () => {
//       expect(newPotentialWins['row-1'].currentState).toEqual(['o', 'o', 'o']);
//     });
//   });

//   describe('when there is a winning move for human Player_1', () => {
//     beforeEach(() => {
//       potentialWins = {
//         'row-1': {
//           currentState: ['o', null, 'x'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 2,
//         },
//         'row-2': {
//           currentState: [null, 'x', null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'row-3': {
//           currentState: [null, null, 'o'],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'col-1': {
//           currentState: ['o', null, null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'col-2': {
//           currentState: [null, 'x', null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'col-3': {
//           currentState: ['x', null, 'o'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 2,
//         },
//         'dia-1': {
//           currentState: ['o', 'x', 'o'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 3,
//         },
//         'dia-2': {
//           currentState: [null, 'x', 'x'],
//           state: WinState.WINNABLE,
//           cellCount: 2,
//         },
//       };
//       makeAiMove(potentialWins);
//       newPotentialWins = getPotentialWinState();
//     });

//     it('blocks Player_1 winning move', () => {
//       expect(newPotentialWins['dia-2'].currentState).toEqual(['o', 'x', 'x']);
//     });
//   });

//   describe('when the central cell is empty', () => {
//     beforeEach(() => {
//       potentialWins = {
//         'row-1': {
//           currentState: ['x', null, null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'row-2': {
//           currentState: [null, null, null],
//           state: WinState.WINNABLE,
//           cellCount: 0,
//         },
//         'row-3': {
//           currentState: [null, null, null],
//           state: WinState.WINNABLE,
//           cellCount: 0,
//         },
//         'col-1': {
//           currentState: ['x', null, null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'col-2': {
//           currentState: [null, null, null],
//           state: WinState.WINNABLE,
//           cellCount: 0,
//         },
//         'col-3': {
//           currentState: [null, null, null],
//           state: WinState.WINNABLE,
//           cellCount: 0,
//         },
//         'dia-1': {
//           currentState: ['x', null, null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'dia-2': {
//           currentState: [null, null, null],
//           state: WinState.WINNABLE,
//           cellCount: 0,
//         },
//       };
//       makeAiMove(potentialWins);
//       newPotentialWins = getPotentialWinState();
//     });

//     it('makes a move to the central cell', () => {
//       expect(newPotentialWins['row-2'].currentState).toEqual([null, 'o', null]);
//     });
//   });

//   describe('when the center cell is taken, but there is empty corner cell', () => {
//     beforeEach(() => {
//       potentialWins = {
//         'row-1': {
//           currentState: [null, null, null],
//           state: WinState.WINNABLE,
//           cellCount: 0,
//         },
//         'row-2': {
//           currentState: [null, 'x', null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'row-3': {
//           currentState: [null, null, null],
//           state: WinState.WINNABLE,
//           cellCount: 0,
//         },
//         'col-1': {
//           currentState: [null, null, null],
//           state: WinState.WINNABLE,
//           cellCount: 0,
//         },
//         'col-2': {
//           currentState: [null, 'x', null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'col-3': {
//           currentState: [null, null, null],
//           state: WinState.WINNABLE,
//           cellCount: 0,
//         },
//         'dia-1': {
//           currentState: [null, 'x', null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//         'dia-2': {
//           currentState: [null, 'x', null],
//           state: WinState.WINNABLE,
//           cellCount: 1,
//         },
//       };
//       makeAiMove(potentialWins);
//       newPotentialWins = getPotentialWinState();
//     });

//     it('makes a move to the first available corner cell', () => {
//       expect(newPotentialWins['row-1'].currentState).toEqual(['o', null, null]);
//     });
//   });

//   describe('when the center & corner cells are taken, and there are no winning moves', () => {
//     beforeEach(() => {
//       potentialWins = {
//         'row-1': {
//           currentState: ['x', 'o', 'x'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 3,
//         },
//         'row-2': {
//           currentState: ['o', 'x', null],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 2,
//         },
//         'row-3': {
//           currentState: ['o', 'x', 'o'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 3,
//         },
//         'col-1': {
//           currentState: ['x', 'o', 'o'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 3,
//         },
//         'col-2': {
//           currentState: ['o', 'x', 'x'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 3,
//         },
//         'col-3': {
//           currentState: ['x', null, 'o'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 2,
//         },
//         'dia-1': {
//           currentState: ['x', 'x', 'o'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 3,
//         },
//         'dia-2': {
//           currentState: ['o', 'x', 'x'],
//           state: WinState.NOT_WINNABLE,
//           cellCount: 3,
//         },
//       };
//       makeAiMove(potentialWins);
//       newPotentialWins = getPotentialWinState();
//     });

//     it('makes a move to the first available edge cell', () => {
//       expect(newPotentialWins['row-2'].currentState).toEqual(['o', 'x', 'o']);
//     });
//   });
// });
