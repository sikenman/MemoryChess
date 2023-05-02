# MemoryChess
Memory game with chess pieces.
- Game development was started on April 28, 2023.
----
## Features of MemoryChess
- Classic memory game of levels 4 × 5 and 5 × 6.
  - User has to match same colored pawn, knight and bishop.
  - User has to match different colored queen and king.
  - User can only match black and white king at the last.
    - the game ends with flipping animation of the kings.
  - Once kings are matched, the game is won.
- Two sets of chess piece are available at each level.
  - User can toggle between classic mode or modern mode.
- The game over modal dialog box is shown when the user completes the game.
- The game level saved using **_window.sessionStorage_** and **_window.localStorage_**.
  - The game level and game mode is saved when used closes the tab.
- Emoji (⭐) is used as favicon.

## JavaScript features used
- Used Fisher–Yates shuffling algorithm.
  - [Fisher–Yates Shuffle](https://bost.ocks.org/mike/shuffle/)
- Make use of a 2D array to load the games.
- Changing CSS variables through JavaScript.
- Used template literal or a template string.
- Make use of export and import modules with JS files.
- Implemented Module pattern in the game.
  - Implemented getters and setters.
- Implemented (Immediately Invoked Function Expressions).
- Context menu on the right click is disabled (via JavaScript).
- Make use of nullish coalescing operator or double question mark (??).
- Make use of regex (match) function to distinguish between emoji and pictures.
- Used window.sessionStorage and window.localStorage.

## CSS features used
- CSS variables were used.
- Used Media Queries Level 4.
- Selection of text is disabled (via CSS).
- Responsive grid design that adjusts to different screen sizes.
  - Celebs pictures auto adjusts according to viewport.
  - CSS media queries for responsive design.

### Sample CSS code used
```css
.grid-card {
  cursor: pointer;
  font-size: 5rem;
  min-width: 8rem;
  min-height: 8rem;
  background-color: whitesmoke;
  border: 1px solid #d9d9d9;
  height: calc(100vh / var(--card-divisior));

  /* show emoji at the center */
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.grid-card img.pic200 {
  width: auto;
  height: auto;
  overflow: hidden;
}

.first-grid {
  border-top-left-radius: 1.5rem;
}
.top-right-grid {
  border-top-right-radius: 1.5rem;
}
.bottom-left-grid {
  border-bottom-left-radius: 1.5rem;
}
.last-grid {
  border-bottom-right-radius: 1.5rem;
}
```
### Sample JavaScript code used
```javascript
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
```