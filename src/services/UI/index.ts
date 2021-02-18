import { BoardChangeHandler, BoardState, BoardSetter } from '../State';
import { BasicOptions } from 'readline-sync';

export type getStyledBoard = (board: BoardState) => string;
export type QuestionFunction = (
  query?: string,
  options?: BasicOptions,
) => string;
export type OutputFunction = (message: string) => void;

function getStyledBoard(board: BoardState) {
  let result = '';

  const boardStyled = board.map((row) => {
    return row.map((cell) => {
      return cell !== null ? cell.toString() : '_';
    });
  });

  boardStyled.forEach((row) => {
    const [cellA, cellB, cellC] = row;

    result += `${cellA} | ${cellB} | ${cellC}\n`;
  });

  return result;
}

function getNextMove(
  question: QuestionFunction,
  output: OutputFunction,
): [number, number] {
  const index = question('Enter row and column number separated by space\n');

  const [row, col] = index.split(' ').map((e: string) => parseInt(e));

  if (row < 0 || row > 2 || col < 0 || col > 2) {
    output('row and column must be between 0 and 2 inclusive.');

    return getNextMove(question, output);
  }

  return [row, col];
}

//fact funct: accepts console log, change funct
export default function uiFactory(
  setBoardState: BoardSetter,
  output: OutputFunction,
  question: QuestionFunction,
): BoardChangeHandler {
  const renderer: BoardChangeHandler = (board: BoardState) => {
    //search for 'reading user input function - readline'
    //render board
    //render propmpt message if user === human user
    //validate user input
    //call setBoardState with user input
    //render new board
    //output is our console.log function, can be tested as mock funct in tests (see AI and Windetector)
    output(getStyledBoard(board));

    const [row, col] = getNextMove(question, output);

    setBoardState(row, col, 'x');
  };

  return renderer;
}
