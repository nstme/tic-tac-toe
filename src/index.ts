import { question } from 'readline-sync';
import aiFactory from './services/AI';
import { setBoardState, onBoardChange, reset } from './services/State';
import uiFactory from './services/UI';

function output(message: string): void {
  console.log(message);
}

function main() {
  reset();

  const ui = uiFactory(setBoardState, output, question);
  const ai = aiFactory(setBoardState);

  onBoardChange(ai);
  console.log('^^^^^^^');
  onBoardChange(ui);

  // setBoardState(0, 0, 'o');
}

main();
