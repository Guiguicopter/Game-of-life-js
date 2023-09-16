import "../src/game-of-life.js";

const coef = 6;

const sizeX = 16 * coef;
const sizeY = 9 * coef;

// console.log(createBoard(sizeX, sizeY));

class cell {
  constructor(cordX, cordY, state) {
    this.cordX = cordX;
    this.cordY = cordY;
    this.state = state;
    this.style = `height : ${100 / sizeY}%; width : ${
      100 / sizeX
    }%; background-color : rgb(${Math.abs(255 * this.state)}, ${Math.abs(
      255 * this.state
    )}, ${Math.abs(255 * this.state)});top : ${
      (100 / sizeY) * this.cordY
    }%; left : ${(100 / sizeX) * this.cordX}%`;
    this.element = document.createElement("div");
    this.element.id = `${cordX},${cordY}`;
    this.element.classList.add("cell");
    this.element.style.cssText = this.style;
    document.body.appendChild(this.element);
  }

  changeState() {
    this.state = Math.abs(this.state - 1);
    this.element.style.cssText = `height : ${100 / sizeY}%; width : ${
      100 / sizeX
    }%; background-color : rgb(${Math.abs(255 * this.state)}, ${Math.abs(
      255 * this.state
    )}, ${Math.abs(255 * this.state)});top : ${
      (100 / sizeY) * this.cordY
    }%; left : ${(100 / sizeX) * this.cordX}%`;
  }
}

let board = createBoard(sizeX, sizeY);
let cells = [];

for (let i = 0; i < sizeY; i++) {
  let line = [];
  for (let j = 0; j < sizeX; j++) {
    line.push(new cell(j, i, board[i][j]));
  }
  cells.push(line);
}

document.addEventListener("keypress", (e) => {
  if (e["code"] == "Space") {
    // console.log(e["code"]);
    for (let cords of nextBoardState(sizeX, sizeY, board)[1]) {
      cells[cords[0]][cords[1]].changeState();
    }
    board = nextBoardState(sizeX, sizeY, board)[0];
    // console.log(board);
  }
});

document.addEventListener("click", (e) => {
  let element = e["srcElement"];
  console.log(element.getAttribute("id"));
  let id = [];
  let number = 0;
  for (let i of element.getAttribute("id")) {
    if (i == ",") {
      id.push(number);
      number = 0;
    } else {
      number *= 10;
      number += Number(i);
    }
  }
  id.push(number);
  cells[id[1]][id[0]].changeState();
  board[id[1]][id[0]] = Math.abs(board[id[1]][id[0]] - 1);
});
