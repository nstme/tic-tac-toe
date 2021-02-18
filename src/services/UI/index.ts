import { BoardChangeHandler, BoardState, BoardSetter, PotentialWins, } from "../State";
import readlineSync from "readline-sync";

export type getStyledBoard = (board: BoardState) => string;

function getStyledBoard(board: BoardState) {
  let result: string = '';
  let boardStyled: string[][];

  boardStyled = board.map(row => {
    return row.map((cell) => {
      return (cell !== null) ? cell.toString() : '_';
    })
  });

  boardStyled.forEach((row) => {
    let [cellA, cellB, cellC] = row;
    result += `${cellA} | ${cellB} | ${cellC}\n`;
  });

  return result;
}

//fact funct: accepts console log, change funct
export default function uiFactory(setBoardState: BoardSetter, output:(message: string) => void) {
  const renderer: BoardChangeHandler = async (
    board: BoardState,
    _potentialWins: PotentialWins,
  ) => {
    //search for 'reading user input function - readline'
    //render board
    //render propmpt message if user === human user
    //validate user input
    //call setBoardState with user input
    //render new board
    //output is our console.log function, can be tested as mock funct in tests (see AI and Windetector)
    let userName, message, index: string;
    let row, col: number;
    userName = readlineSync.question('What is your name?\n');
    message = `Hi, ${userName}! Welcome to tic tac toe game\n`;
    output(message);
    console.log(getStyledBoard(board));
    index = readlineSync.question('Enter row and column number separated by space\n');
    [row, col] = index.split(' ').map(e => parseInt(e));
    setBoardState(row, col, 'x');
  };

  return renderer;
}