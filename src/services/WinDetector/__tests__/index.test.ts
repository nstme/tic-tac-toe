import { random } from 'faker';
import winDetectorFactory from '../';
import { WinState, BoardState, PotentialWins, BoardChangeHandler, Player, } from '../../State';

function getWinningState(): PotentialWins {
  const winningStates: PotentialWins[] = [
    {
      'row-1': {
        currentState: ['x', 'x', 'x'],
        state: WinState.WON,
        cellCount: 3,
      },
      'row-2': {
        currentState: ['o', 'x', 'o'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'row-3': {
        currentState: [null, 'o', 'o'],
        state: WinState.WINNABLE,
        cellCount: 2,
      },
      'col-1': {
        currentState: ['x', 'o', null],
        state: WinState.NOT_WINNABLE,
        cellCount: 2,
      },
      'col-2': {
        currentState: ['x', 'x', 'o'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'col-3': {
        currentState: ['x', 'o', 'o'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'dia-1': {
        currentState: ['x', 'x', 'o'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'dia-2': {
        currentState: [null, 'x', 'x'],
        state: WinState.WINNABLE,
        cellCount: 2,
      },
    },
    {
      'row-1': {
        currentState: [null, 'x', 'x'],
        state: WinState.WINNABLE,
        cellCount: 2,
      },
      'row-2': {
        currentState: ['o', 'o', 'o'],
        state: WinState.WON,
        cellCount: 3,
      },
      'row-3': {
        currentState: [null, 'x', 'o'],
        state: WinState.NOT_WINNABLE,
        cellCount: 2,
      },
      'col-1': {
        currentState: [null, 'o', null],
        state: WinState.WINNABLE,
        cellCount: 1,
      },
      'col-2': {
        currentState: ['x', 'o', 'x'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'col-3': {
        currentState: ['x', 'o', 'o'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'dia-1': {
        currentState: [null, 'o', 'o'],
        state: WinState.WINNABLE,
        cellCount: 2,
      },
      'dia-2': {
        currentState: [null, 'o', 'x'],
        state: WinState.NOT_WINNABLE,
        cellCount: 2,
      },
    },
    {
      'row-1': {
        currentState: [null, 'x', 'o'],
        state: WinState.NOT_WINNABLE,
        cellCount: 2,
      },
      'row-2': {
        currentState: ['o', 'o', 'o'],
        state: WinState.WON,
        cellCount: 3,
      },
      'row-3': {
        currentState: [null, 'x', 'o'],
        state: WinState.NOT_WINNABLE,
        cellCount: 2,
      },
      'col-1': {
        currentState: [null, 'o', null],
        state: WinState.WINNABLE,
        cellCount: 1,
      },
      'col-2': {
        currentState: ['x', 'o', 'x'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'col-3': {
        currentState: ['o', 'o', 'o'],
        state: WinState.WON,
        cellCount: 3,
      },
      'dia-1': {
        currentState: [null, 'o', 'o'],
        state: WinState.WINNABLE,
        cellCount: 2,
      },
      'dia-2': {
        currentState: [null, 'o', 'o'],
        state: WinState.WINNABLE,
        cellCount: 2,
      },
    },
    {
      'row-1': {
        currentState: ['o', 'x', 'x'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'row-2': {
        currentState: ['o', 'o', 'x'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'row-3': {
        currentState: ['x', 'x', 'o'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'col-1': {
        currentState: ['o', 'o', 'x'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'col-2': {
        currentState: ['x', 'o', 'x'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'col-3': {
        currentState: ['x', 'x', 'o'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
      'dia-1': {
        currentState: ['o', 'o', 'o'],
        state: WinState.WON,
        cellCount: 3,
      },
      'dia-2': {
        currentState: ['x', 'o', 'x'],
        state: WinState.NOT_WINNABLE,
        cellCount: 3,
      },
    },
  ]

  return random.arrayElement<PotentialWins>(winningStates);
}

function getLosingState(): PotentialWins {
  return {
    'row-1': {
      currentState: ['x', 'o', 'x'],
      state: WinState.NOT_WINNABLE,
      cellCount: 3,
    },
    'row-2': {
      currentState: [null, 'o', 'o'],
      state: WinState.NOT_WINNABLE,
      cellCount: 2,
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
      currentState: ['o', 'o', null],
      state: WinState.WINNABLE,
      cellCount: 2,
    },
    'col-3': {
      currentState: ['x', 'o', null],
      state: WinState.NOT_WINNABLE,
      cellCount: 2,
    },
    'dia-1': {
      currentState: ['x', 'o', null],
      state: WinState.NOT_WINNABLE,
      cellCount: 2,
    },
    'dia-2': {
      currentState: [null, 'o', 'x'],
      state: WinState.NOT_WINNABLE,
      cellCount: 2,
    },
  }
}

describe('WinDetector', () => {
  let setWinningPlayer: jest.Mock;
  let winDetector: BoardChangeHandler;
  const board:BoardState = [
    [null, 'x', 'x'],
    ['o', 'x', 'x'],
    ['x', 'x', 'o'],
  ];

  beforeEach(() => {
    setWinningPlayer = jest.fn();
    winDetector = winDetectorFactory(setWinningPlayer);
  });

  describe('a losing board state', () => {
    beforeEach(() => {
      const potentialWinState = getLosingState();
      winDetector(board, potentialWinState);
    });

    it('it does not update state', () => {
      expect(setWinningPlayer).toHaveBeenCalledTimes(0);
    });
  });

  describe('a winning board state', () => {
    let winningPlayer: Player;

    beforeEach(() => {
      const potentialWinState = getWinningState();
      const winningVertex = Object.keys(potentialWinState).find((vertex) => 
        potentialWinState[vertex].state === WinState.WON
      );
      const winningSymbol = potentialWinState[winningVertex!].currentState[0];
      winningPlayer = (winningSymbol === 'x') ? Player.PLAYER_1 : Player.PLAYER_2;
      
      winDetector(board, potentialWinState);
    });

    it('it calls setWinningPlayer', () => {
      expect(setWinningPlayer).toBeCalledTimes(1);
    });

    it('it updates the winning player', () => {
      expect(setWinningPlayer).toHaveBeenCalledWith(winningPlayer);
    });
  });
});