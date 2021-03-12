import {
  BoardChangeHandler,
  BoardState,
  BoardSetter,
  PotentialWins,
  WinState,
} from '../State';
import { BasicOptions } from 'readline-sync';

export type getStyledBoard = (board: BoardState) => string;
export type QuestionFunction = (
  query?: string,
  options?: BasicOptions,
) => string;
export type OutputFunction = (message: string) => void;

function getStyledBoard(board: BoardState) {
  let result = '';

  const styledBoard = board.map((row) => {
    return row.map((cell) => {
      return cell !== null ? cell.toString() : '_';
    });
  });

  styledBoard.forEach((row) => {
    const [cellA, cellB, cellC] = row;

    result += `${cellA} | ${cellB} | ${cellC}\n`;
  });

  return result;
}

function getNextMove(
  question: QuestionFunction,
  output: OutputFunction,
): [number, number] {
  const userIndexInput = question(
    'Enter row and column number separated by space\n',
  );

  const formatCheck = userIndexInput.match(/^[0-2] [0-2]$/gm);

  if (!formatCheck) {
    output(
      'Row and column must be between 0 and 2 inclusive and separated by space',
    );
    return getNextMove(question, output);
  }

  const [row, col] = userIndexInput.split(' ').map((e: string) => parseInt(e));

  return [row, col];
}

function isDrawState(potentialWins: PotentialWins) {
  return (
    Object.keys(potentialWins).find(
      (key) => potentialWins[key].state !== WinState.NOT_WINNABLE,
    ) === undefined
  );
}

function isWinState(potentialWins: PotentialWins) {
  let winningPlayerSymbol = undefined;
  for (const vertex in potentialWins) {
    if (potentialWins[vertex].state === WinState.WON) {
      //checks only first element in winning vertex as the rest are the same
      const winningCell = potentialWins[vertex].currentState[0];
      if (winningCell) {
        winningPlayerSymbol = winningCell;
      }
    }
  }
  return winningPlayerSymbol;
}

export default function uiFactory(
  setBoardState: BoardSetter,
  output: OutputFunction,
  question: QuestionFunction,
): BoardChangeHandler {
  const renderer: BoardChangeHandler = (
    board: BoardState,
    potentialWins: PotentialWins,
  ) => {
    output(getStyledBoard(board));

    if (isDrawState(potentialWins)) {
      output('Draw');
      return;
    }

    if (isWinState(potentialWins)) {
      const winningPlayerSymbol = isWinState(potentialWins);
      output(`Player ${winningPlayerSymbol} won`);
      return;
    }

    const [row, col] = getNextMove(question, output);

    setBoardState(row, col, 'x');
  };

  return renderer;
}
