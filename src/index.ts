import { question } from 'readline-sync';
import aiFactory from './services/AI';
import {
  setBoardState,
  onBoardChange,
  // onWinChange,
  reset,
  setWinningPlayer,
} from './services/State';
import uiFactory from './services/UI';
import winDetectorFactory from './services/WinDetector';

function output(message: string): void {
  console.log(message);
}

function main() {
  reset();

  const ui = uiFactory(setBoardState, output, question);
  const ai = aiFactory(setBoardState);
  const winDetector = winDetectorFactory(setWinningPlayer);

  onBoardChange(ai);
  onBoardChange(ui);
  onBoardChange(winDetector);
}

main();
