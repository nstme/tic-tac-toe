// import { random } from 'faker';
// import winDetectorFactory from '../';
// import { BoardState, Player } from '../../State';

// function getWinningBoard(): BoardState {
//   const boards: BoardState[] = [
//     [
//       ['x', 'x', 'x'],
//       ['o', 'x', 'o'],
//       [null, 'o', 'o'],
//     ],
//     [
//       [null, 'x', 'x'],
//       ['o', 'o', 'o'],
//       [null, 'x', 'o'],
//     ],
//     [
//       [null, 'x', 'o'],
//       ['o', 'o', 'o'],
//       [null, 'x', 'o'],
//     ],
//     [
//       [null, 'x', 'o'],
//       ['o', 'x', 'x'],
//       [null, 'x', 'o'],
//     ],
//     [
//       [null, 'x', 'x'],
//       ['o', 'x', 'x'],
//       ['x', 'x', 'o'],
//     ],
//     [
//       ['o', 'x', 'x'],
//       ['o', 'o', 'x'],
//       ['x', 'x', 'o'],
//     ],
//   ];

//   return random.arrayElement<BoardState>(boards);
// }

// function getLosingBoard(): BoardState {
//   return [
//     ['x', 'o', 'x'],
//     [null, 'o', 'o'],
//     [null, null, null],
//   ]
// }

// describe('WinDetector', () => {
//   const setWinningPlayer = jest.fn();
//   const winDetector = winDetectorFactory(setWinningPlayer);

//   describe('a losing board state', () => {
//     beforeEach(() => {
//       const board = getLosingBoard();

//       winDetector(board);
//     });

//     it('it does not update state', () => {
//       expect(setWinningPlayer).toHaveBeenCalledTimes(0);
//     });
//   });

//   describe('a winning board state', () => {
//     beforeEach(() => {
//       const board = getWinningBoard();

//       winDetector(board);
//     });

//     it('it updates the winning player', () => {
//       expect(setWinningPlayer).toBeCalledWith(Player.PLAYER_1);
//     });
//   });
// });