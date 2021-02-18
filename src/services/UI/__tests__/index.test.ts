import {
  BoardState,
  PotentialWins,
  WinState,
  BoardChangeHandler,
} from '../../State';

import uiFactory from '../';

describe('renderer', () => {
  let setBoardState: jest.Mock;
  let output: jest.Mock;
  let question: jest.Mock;
  let renderer: BoardChangeHandler;

  beforeEach(() => {
    setBoardState = jest.fn();
    output = jest.fn();
    question = jest.fn(() => {
      return '0 1';
    });

    renderer = uiFactory(setBoardState, output, question);
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

      renderer(board, potentialWinState);
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
    it('Prints and error message and tries again');
  });

  describe('given out of range input', () => {
    it('Prints and error message and tries again');
  });

  describe('given non-numeric input', () => {
    it('Prints and error message and tries again');
  });
});
