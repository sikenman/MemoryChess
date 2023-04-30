import * as Game from "./const.js";
import { getChess } from "./level.js";

/* 
  This is main code for memory chess game
  @Author: Siken Man Dongol
  @Date  : April 29, 2023
*/
const MemoryGame = (function () {
  // private variables
  let appTimer = null;
  let _gameLevel = null;
  let _gameMode = null;

  let _cardPairs = [];
  let _cardAnimation = false;

  const about = "MemoryChess Game Core";
  const author = "Siken M. Dongol";
  const modified = "Apr 28-29, 2023";

  // public methods
  return {
    about,
    author,
    modified,
    appTimer,
    set gameLevel(level) {
      // start the game at the level saved in the localStorage
      _gameLevel = level;
      window.sessionStorage.setItem("gameLevel", level);
    },
    get gameLevel() {
      return _gameLevel;
    },

    set gameMode(mode) {
      // start the game with the game mode saved in the localStorage
      _gameMode = mode;
      window.sessionStorage.setItem("gameMode", mode);
    },
    get gameMode() {
      return _gameMode;
    },

    set cardAnimation(value) {
      _cardAnimation = value ?? false;
    },
    get cardAnimation() {
      return _cardAnimation;
    },

    set cardPairs(value) {
      _cardPairs = value;
    },
    get cardPairs() {
      return _cardPairs;
    },

    // game initialization
    initGame: () => {
      const memoryGameObj = {
        about: MemoryGame.about,
        mode: MemoryGame.gameMode,
        level: MemoryGame.gameLevel,
        animation: MemoryGame.cardAnimation,
      };
      console.table(memoryGameObj);

      let gameTitle = null;
      let [cols, rows, cardDivisor] = [4, 5, null];

      switch (MemoryGame.gameLevel) {
        case Game.LEVEL_4_X_5:
          gameTitle = "4 × 5 Game";
          [cols, rows, cardDivisor] = [4, 5, 6.2];
          break;
        case Game.LEVEL_5_X_6:
          gameTitle = "5 × 6 Game";
          [cols, rows, cardDivisor] = [5, 6, 7.3];
          break;
      }

      // change the game title and heading (h1)
      const gameFullTitle = `${Game.APP_NAME} ${gameTitle}`;
      document.title = gameFullTitle;
      document.getElementById("game-level").innerHTML = gameFullTitle;

      // we already have 6 divs in HTML page
      // we dynamically generate remaining divs for the game
      let parentDiv = document.querySelector(".grid-container");

      const totalGrid = rows * cols;
      for (let i = 3; i < totalGrid; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("grid-card");
        // giving rounded corners to the grid at present at four corners
        if (i === cols - 1) newDiv.classList.add("top-right-grid");
        if (i === totalGrid + 1 - rows) newDiv.classList.add("bottom-left-grid");
        if (i === totalGrid - 1) newDiv.classList.add("last-grid");

        newDiv.dataset.id = i;
        parentDiv.appendChild(newDiv);
      }

      // changing the value of CSS variables
      let r = document.querySelector(":root");
      r.style.setProperty("--card-cols", cols);
      r.style.setProperty("--card-rows", rows);
      r.style.setProperty("--card-divisior", cardDivisor);

      // change card color when mode changes
      MemoryGame.setModeColor();

      // show animation during card click
      if (MemoryGame.cardAnimation === true) {
        const gridItems = document.querySelectorAll(".grid-card");
        gridItems.forEach((item) => {
          item.classList.add("show-animation");
        });
      }
    },

    setModeColor: () => {
      let r = document.querySelector(":root");

      let cardDarkColor = null;
      let cardLightColor = null;

      switch (MemoryGame.gameMode) {
        case Game.MODE_CLASSIC:
          cardDarkColor = "#c26b38";
          cardLightColor = "#efcca1";
          break;
        case Game.MODE_MODERN:
          cardDarkColor = "#96bc4b";
          cardLightColor = "#eeeed2";
          break;
      }

      // change the card color
      r.style.setProperty("--card-color", cardDarkColor);
      r.style.setProperty("--card-color-light", cardLightColor);
      r.style.setProperty("--status-text-color", cardDarkColor);
    },

    // Game Over
    gameOver: () => {
      // stop the timer
      clearInterval(MemoryGame.appTimer);

      // show [You Won] modal dialog
      document.getElementById("popup-dlg").classList.add("showme");
    },

    /* 
    This JS block handles displaying the timer on the screen in 0:00 (m:ss) format
    timer block is called after every 1 second
    */
    startTimer: () => {
      let [seconds, minutes] = [0, 0];

      MemoryGame.appTimer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
          minutes++;
          seconds = 0;
        }
        let mm = `${String(minutes).padStart(1, "0")}`;
        let ss = `${String(seconds).padStart(2, "0")}`;
        document.getElementById("timer").innerHTML = `${mm}:${ss}`;
      }, 1000);
    },
  };
})();

/* Start the MEMORY GAME */
{
  MemoryGame.cardAnimation = false;

  let gameState = JSON.parse(localStorage.getItem(Game.APP_NAME));
  if (gameState !== null) {
    // The object exists in localStorage
    console.log("From LocalStorage");
    console.log(gameState);
    MemoryGame.gameMode = gameState.mode;
    MemoryGame.gameLevel = gameState.level;
  } else {
    MemoryGame.gameMode = Game.MODE_CLASSIC;
    MemoryGame.gameLevel = Game.LEVEL_4_X_5;
  }
  MemoryGame.cardPairs = getChess(MemoryGame.gameLevel);
  console.log(MemoryGame.cardPairs);

  MemoryGame.initGame();
  MemoryGame.startTimer();
}

(function () {
  let [count, gameScore, gameMoves] = [0, 0, 0];

  let [firstClick, secondClick] = [null, null];
  let [firstPiece, secondPiece] = [null, null];

  const gridItems = document.querySelectorAll(".grid-card");
  gridItems.forEach((item) => {
    item.addEventListener("click", handleClick);
  });

  function handleClick(e) {
    gameMoves++;
    // display games moves (2 clicks = 1 move)
    if (gameMoves % 2 == 0) {
      document.getElementById("moves").innerHTML = Number(gameMoves / 2);
    }

    const picFilePattern = /[wbo][pnbrkq]/;
    let picPath = null;
    picPath = MemoryGame.gameMode === Game.MODE_CLASSIC ? "chess3" : "chess1";

    if (count === 0) {
      firstPiece = MemoryGame.cardPairs[this.dataset.id];

      /* code goes here */
    } else if (count === 1) {
      secondPiece = MemoryGame.cardPairs[this.dataset.id];

      if (secondPiece.match(picFilePattern)) {
        e.target.innerHTML = `<img class="pic200" src="./pics/${picPath}/${secondPiece}.png" />`;
      } else {
        e.target.textContent = secondPiece;
      }

      /* code goes here */
    }
  }
})();
