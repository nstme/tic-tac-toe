import {
  getBoardState,
  setBoardState,
  onBoardChange,
  BoardState,
  reset,
  getPotentialWinState,
  PotentialWins,
  WinState,
} from '../';

function setupBoard() {
  setBoardState(0, 0, 'x');
  setBoardState(0, 1, null);
  setBoardState(0, 2, 'o');
  setBoardState(1, 0, null);
  setBoardState(1, 1, 'x');
  setBoardState(1, 2, null);
  setBoardState(2, 0, 'x');
  setBoardState(2, 1, null);
  setBoardState(2, 2, 'o');
}

describe('the State service', () => {
  let board: BoardState | undefined;
  let potentialWins: PotentialWins | undefined;

  beforeEach(() => {
    reset();
  });

  afterEach(() => {
    reset();

    board = undefined;
    potentialWins = undefined;
  });

  describe('getBoardState', () => {
    beforeEach(() => {
      setupBoard();

      board = getBoardState();
    });

    it('returns the board', () => {
      expect(board).toEqual([
        ['x', null, 'o'],
        [null, 'x', null],
        ['x', null, 'o'],
      ]);
    });
  });

  describe('getPotentialWinState', () => {
    beforeEach(() => {
      setupBoard();

      potentialWins = getPotentialWinState();
    });

    it('returns the potentialWins', () => {
      expect(potentialWins).toEqual({
        'row-1': {
          currentState: ['x', null, 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 2,
        },
        'row-2': {
          currentState: [null, 'x', null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'row-3': {
          currentState: ['x', null, 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 2,
        },
        'col-1': {
          currentState: ['x', null, 'x'],
          state: WinState.WINNABLE,
          cellCount: 2,
        },
        'col-2': {
          currentState: [null, 'x', null],
          state: WinState.WINNABLE,
          cellCount: 1,
        },
        'col-3': {
          currentState: ['o', null, 'o'],
          state: WinState.WINNABLE,
          cellCount: 2,
        },
        'dia-1': {
          currentState: ['x', 'x', 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'dia-2': {
          currentState: ['x', 'x', 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
      });
    });
  });

  describe('reset', () => {
    beforeEach(() => {
      setupBoard();

      reset();

      board = getBoardState();
      potentialWins = getPotentialWinState();
    });

    it('resets the board', () => {
      expect(board).toEqual([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ])
    });

    it('resets potentialWins', () => {
      expect(potentialWins).toEqual({
        'row-1': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
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
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
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
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
        'dia-2': {
          currentState: [null, null, null],
          state: WinState.WINNABLE,
          cellCount: 0,
        },
      });
    })
  });

  describe('onBoardChange', () => {

    describe('when onBoardChange is called before setBoardState', () => {
      const onChange = jest.fn();

      beforeEach(() => {
        onBoardChange(onChange);

        setBoardState(0, 0, 'x');
      });

      afterEach(() => {
        onChange.mockClear();
      });

      it('calls the callback each time the board is updated', () => {
        expect(onChange).toHaveBeenCalledTimes(2);
      });

      it('passes the current board state', () => {
        expect(onChange).toHaveBeenLastCalledWith([
          ['x', null, null],
          [null, null, null],
          [null, null, null],
        ],
        {
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
        })
      });
    });

    describe('when onBoardChange is called after setBoardState', () => {
      const onChange = jest.fn();

      beforeEach(() => {
        setBoardState(0, 0, 'x');

        onBoardChange(onChange);
      });

      afterEach(() => {
        onChange.mockClear();
      });

      it('calls the callback each time the board is updated', () => {
        expect(onChange).toHaveBeenCalledTimes(1);
      });

      it('passes the current board state', () => {
        expect(onChange).toHaveBeenCalledWith([
          ['x', null, null],
          [null, null, null],
          [null, null, null],
        ],
        {
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
        })
      });
    });
  });
});