let turn = "x";
let symbols = [["", "", ""], ["", "", ""], ["", "", ""]];

const board = document.querySelector(".board");
const tiles = Array.from(document.querySelectorAll(".tile"));
const resetBtn = document.querySelector(".reset");

resetBtn.addEventListener("click", reset);

board.addEventListener("click", ({ target }) => {
  const classes = Array.from(target.classList);
  if (classes.includes("tile") && classes.length !== 1) return;

  const idx = tiles.indexOf(target);

  target.classList.add(`tile-${turn}`);
  symbols[idx % 3][Math.floor(idx / 3)] = turn;
  turn = turn === "x" ? "o" : "x";

  displayTurn(turn);

  checkWin();
});

function displayTurn(turn) {
  const turn_text = document.querySelector(".turn");
  turn_text.innerText = `${turn.toUpperCase()} turn`;
}

function checkWin() {
  let win = false;
  symbols.forEach((row) => {
    if (row.every((symbol) => symbol === "x")) win = true;
  });
  symbols.forEach((row) => {
    if (row.every((symbol) => symbol === "o")) win = true;
  });
  for (let i = 0; i < 3; i++) {
    if (symbols[0][i] !== "" && symbols[0][i] === symbols[1][i] && symbols[1][i] === symbols[2][i])
      win = true;
  }
  if (symbols[0][0] !== "" && symbols[0][0] === symbols[1][1] && symbols[1][1] === symbols[2][2])
    win = true;
  if (symbols[0][2] !== "" && symbols[0][2] === symbols[1][1] && symbols[1][1] === symbols[2][0])
    win = true;
  if (win) {
    alert(turn === "x" ? "o" : "x" + " won!");
  }
  else if (symbols.every((row) => row.every((symbol) => symbol !== ""))) {
    alert("Draw!");
  }
}

function reset() {
  turn = "x";
  symbols = [["", "", ""], ["", "", ""], ["", "", ""]];
  tiles.forEach((tile) => tile.classList.remove("tile-x", "tile-o"));
  displayTurn(turn);
}
