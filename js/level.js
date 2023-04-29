import * as Game from "./const.js";
import { shuffleArray } from "./lib.js";

export function getChess(level) {
  switch (level) {
    case Game.LEVEL_4_X_5:
      return getChess4x5();
    case Game.LEVEL_5_X_6:
      return getChess5x6();
  }
}

function getChess4x5() {
  const pics = ["bp,bp,bn,bn,bb,bb,br,br,bq,bk", "wp,wp,wn,wn,wb,wb,wr,wr,wq,wk"];

  // making array out of comma seperated string
  const chessBlack = pics[0].split(",");
  const chessWhite = pics[1].split(",");

  const picsArray = [...chessBlack, ...chessWhite];

  const pair = shuffleArray(picsArray);
  return pair;
}

function getChess5x6() {
  const pics = [
    "ok,bp,bp,bp,bp,bp,bp,bn,bn,bb,bb,br,br,bq,bk",
    "ok,wp,wp,wp,wp,wp,wp,wn,wn,wb,wb,wr,wr,wq,wk",
  ];

  // making array out of comma seperated string
  const chessBlack = pics[0].split(",");
  const chessWhite = pics[1].split(",");

  const picsArray = [...chessBlack, ...chessWhite];

  const pair = shuffleArray(picsArray);
  return pair;
}
