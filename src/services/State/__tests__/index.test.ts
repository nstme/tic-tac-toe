import {
  getBoardState,
  setBoardState,
  getCurrentPlayer,
  setCurrentPlayer,
  onBoardChange,
  onPlayerChange,
  BoardState,
  Player,
  reset,
  getWinningPlayer,
  setWinningPlayer,
  onPlayerWon,
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
  let player: Player | undefined;
  let board: BoardState | undefined;

  afterEach(() => {
    reset();

    player = undefined;
    board = undefined;
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

  describe('getCurrentUser', () => {
    beforeEach(() => {
      setCurrentPlayer(Player.PLAYER_1);

      player = getCurrentPlayer();
    });

    it('returns the expected player', () => {
      expect(player).toEqual(Player.PLAYER_1);
    });
  });

  describe('reset', () => {
    beforeEach(() => {
      setCurrentPlayer(Player.PLAYER_1);
      setupBoard();

      reset();

      player = getCurrentPlayer();
      board = getBoardState();
    });

    it('resets the player', () => {
      expect(player).toBeUndefined();
    });

    it('resets the board', () => {
      expect(board).toEqual([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ])
    });
  });

  describe('getWinningPlayer', () => {
    beforeEach(() => {
      setWinningPlayer(Player.PLAYER_1);

      player = getWinningPlayer();
    });

    it('returns the expected player', () => {
      expect(player).toEqual(Player.PLAYER_1);
    });
  });

  describe('onPlayerWon', () => {

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
        ])
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
        ])
      });
    });
  });

  describe('onPlayerChange', () => {
    describe('when onChange is called before setCurrentPlayer', () => {
      const onChange = jest.fn();

      beforeEach(() => {
        onPlayerChange(onChange);
        setCurrentPlayer(Player.PLAYER_1);
        player = getCurrentPlayer();
      });

      afterEach(() => {
        onChange.mockClear();
      });

      it('calls the callback each time the board is updated', () => {
        expect(onChange).toHaveBeenCalledTimes(2);
      });

      it('changes the current Player', () => {
        expect(player).toBe(Player.PLAYER_1);
      });
    });

    describe('when onChange is called after setCurrentPlayer', () => {
      const onChange = jest.fn();

      beforeEach(() => {
        setCurrentPlayer(Player.PLAYER_1);
        onPlayerChange(onChange);

        player = getCurrentPlayer();
      });

      afterEach(() => {
        onChange.mockClear();
      });

      it('calls the callback each time the board is updated', () => {
        expect(onChange).toHaveBeenCalledTimes(1);
      });

      it('changes the current Player', () => {
        expect(player).toBe(Player.PLAYER_1);
      });
    });
  });


  describe('onPlayerWon', () => {
    describe('when onChange is called before setCurrentPlayer', () => {
      const onChange = jest.fn();

      beforeEach(() => {
        onPlayerWon(onChange);
        setWinningPlayer(Player.PLAYER_1);

        player = getWinningPlayer();
      });

      afterEach(() => {
        onChange.mockClear();
      });

      it('calls the callback each time the board is updated', () => {
        expect(onChange).toHaveBeenCalledTimes(2);
      });

      it('changes the winning Player', () => {
        expect(player).toBe(Player.PLAYER_1);
      });
    });

    describe('when onChange is called after setWinningPlayer', () => {
      const onChange = jest.fn();

      beforeEach(() => {
        setWinningPlayer(Player.PLAYER_1);
        onPlayerWon(onChange);

        player = getWinningPlayer();
      });

      afterEach(() => {
        onChange.mockClear();
      });

      it('calls the callback each time the board is updated', () => {
        expect(onChange).toHaveBeenCalledTimes(1);
      });

      it('changes the current Player', () => {
        expect(player).toBe(Player.PLAYER_1);
      });
    });
  });
});