import { BoardChangeHandler, BoardState, BoardSetter, PotentialWins, } from "../State";
import readlineSync from "readline-sync";

export type RenderBoard = (board: BoardState) => void;

function renderBoard(board: BoardState) {
  let output: string = '';
  let boardRender: string[][];

  boardRender = board.map(row => {
    return row.map((cell) => {
      return (cell !== null) ? cell.toString() : '_';
    })
  });

  boardRender.forEach((row) => {
    let [cellA, cellB, cellC] = row;
    output += `${cellA} | ${cellB} | ${cellC}\n`;
  });

  console.log(output);
}

//fact funct: accepts console log, change funct
export default function uiFactory(setBoardState: BoardSetter, output:(message: string) => void) {
  const renderer: BoardChangeHandler = (
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
    renderBoard(board);
    let message: string = readlineSync.question('What is your name?');
    console.log('hi,username!!!', message);
    output(message);
    setBoardState(0, 1, 'x');
  };

  return renderer;
}