import {
  BoardState,
  PotentialWins,
  WinState,
  BoardChangeHandler,
  reset,
} from '../../State';

import uiFactory from '../';

describe('renderer', () => {
  let setBoardState: jest.Mock;
  let output: jest.Mock;
  let question: jest.Mock;
  let renderer: BoardChangeHandler;

  beforeEach(() => {
    reset();
    setBoardState = jest.fn();
    output = jest.fn();
    question = jest.fn(() => {
      return '0 1';
    });

    renderer = uiFactory(setBoardState, output, question);
  });

  describe('when the board is in a draw state', () => {
    const message = 'Draw';
    beforeEach(() => {
      reset();
      const board: BoardState = [
        ['o', 'x', 'o'],
        ['x', 'o', 'x'],
        ['x', 'o', 'x'],
      ];
      const potentialWinState: PotentialWins = {
        'row-1': {
          currentState: ['o', 'x', 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'row-2': {
          currentState: ['x', 'o', 'x'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'row-3': {
          currentState: ['x', 'o', 'x'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'col-1': {
          currentState: ['o', 'x', 'x'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'col-2': {
          currentState: ['x', 'o', 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'col-3': {
          currentState: ['o', 'x', 'x'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'dia-1': {
          currentState: ['o', 'o', 'x'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
        'dia-2': {
          currentState: ['x', 'o', 'o'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
        },
      };
      renderer(board, potentialWinState, 'o');
    });
    it('renders draw message', () => {
      expect(output).toHaveBeenCalledWith(message);
    });
    it('renders board and message ', () => {
      expect(output).toHaveBeenCalledTimes(2);
    });
  });

  describe('when the board is in a win state', () => {
    const message = 'Player x won';
    beforeEach(() => {
      reset();
      const board: BoardState = [
        ['o', 'o', 'x'],
        [null, 'x', null],
        ['x', null, 'o'],
      ];
      const potentialWinState: PotentialWins = {
        'row-1': {
          currentState: ['o', 'o', 'x'],
          state: WinState.NOT_WINNABLE,
          cellCount: 3,
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
          currentState: ['o', null, 'x'],
          state: WinState.NOT_WINNABLE,
          cellCount: 2,
        },
        'col-2': {
          currentState: ['o', 'x', null],
          state: WinState.NOT_WINNABLE,
          cellCount: 2,
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
          currentState: ['x', 'x', 'x'],
          state: WinState.WON,
          cellCount: 3,
        },
      };
      renderer(board, potentialWinState, 'x');
    });

    it('reders win message', () => {
      expect(output).toHaveBeenCalledWith(message);
    });
  });

  describe('when setBoardState is called', () => {
    beforeEach(() => {
      const board: BoardState = [
        ['o', null, 'o'],
        ['x', null, 'x'],
        [null, null, null],
      ];
      const potentialWinState: PotentialWins = {
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

      renderer(board, potentialWinState, 'o');
    });

    it('asks for the user input', () => {
      expect(question).toHaveBeenCalledWith(
        'Enter row and column number separated by space\n',
      );
    });

    it('calls setBoardState once', () => {
      expect(setBoardState).toHaveBeenCalledTimes(1);
    });

    it('calls setBoardState with the expected input', () => {
      expect(setBoardState).toHaveBeenCalledWith(0, 1, 'x');
    });

    it('renders the current state correctly', () => {
      expect(output).toHaveBeenCalledWith(`o | _ | o
x | _ | x
_ | _ | _
`);
    });
  });

  describe('given only one input', () => {
    let getNextMove: jest.Mock = jest.fn();
    let question: jest.Mock = jest.fn(() => {
      return '1';
    });
    const errorMessage =
      'Row and column must be between 0 and 2 inclusive and separated by space';

    beforeEach(() => {
      reset();
      const formatCheck = question().match(/^[0-2] [0-2]$/gm);
      if (!formatCheck) {
        output(errorMessage);
        getNextMove(question, output);
      }
    });
    it('Prints and error message and tries again', () => {
      expect(output).toHaveBeenCalledWith(errorMessage);
      expect(getNextMove).toHaveBeenCalledWith(question, output);
    });
  });

  describe('given out of range input', () => {
    let getNextMove: jest.Mock = jest.fn();
    let question: jest.Mock = jest.fn(() => {
      return '3 1';
    });
    const errorMessage =
      'Row and column must be between 0 and 2 inclusive and separated by space';

    beforeEach(() => {
      reset();
      const formatCheck = question().match(/^[0-2] [0-2]$/gm);
      if (!formatCheck) {
        output(errorMessage);
        getNextMove(question, output);
      }
    });
    it('Prints and error message and tries again', () => {
      expect(output).toHaveBeenCalledWith(errorMessage);
      expect(getNextMove).toHaveBeenCalledWith(question, output);
    });
  });

  describe('given non-numeric input', () => {
    let getNextMove: jest.Mock = jest.fn();
    let question: jest.Mock = jest.fn(() => {
      return 'a 1';
    });
    const errorMessage =
      'Row and column must be between 0 and 2 inclusive and separated by space';

    beforeEach(() => {
      reset();
      const formatCheck = question().match(/^[0-2] [0-2]$/gm);
      if (!formatCheck) {
        output(errorMessage);
        getNextMove(question, output);
      }
    });
    it('Prints and error message and tries again', () => {
      expect(output).toHaveBeenCalledWith(errorMessage);
      expect(getNextMove).toHaveBeenCalledWith(question, output);
    });
  });
});
