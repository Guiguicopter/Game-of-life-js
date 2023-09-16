function getRandomInt(min, max) {
  // returns a random number between min(included) and max(excluded)
  let number = Math.floor(Math.random() * (max - min)) + min;
  return number;
}

function createBoard(sizeX, sizeY) {
  let board = [];
  let line = [];
  for (let i = 0; i < sizeY; i++) {
    line = [];
    for (let j = 0; j < sizeX; j++) {
      line.push(getRandomInt(0, 2));
    }
    board.push(line);
  }
  // console.log(board);
  return board;
}

function nextBoardState(sizeX, sizeY, board) {
  let changingCells = [];
  let nextBoard = createBoard(sizeX, sizeY);

  for (let i = 0; i < sizeY; i++) {
    for (let j = 0; j < sizeX; j++) {
      let total = 0;

      for (let y = -1; y < 2; y++) {
        for (let x = -1; x < 2; x++) {
          if ((0 <= i + y) & (i + y < sizeY) & (0 <= j + x) & (j + x < sizeX)) {
            if (i + y != i || j + x != j) {
              // console.log(i + y, j + x);
              total += board[i + y][j + x];
            }
          }
        }
      }

      if ((3 <= total) & (total <= 3)) {
        nextBoard[i][j] = 1;
        if (board[i][j] == 0) {
          changingCells.push([i, j]);
        }
      } else if (total <= 1 || total >= 4) {
        nextBoard[i][j] = 0;
        if (board[i][j] == 1) {
          changingCells.push([i, j]);
        }
      } else {
        nextBoard[i][j] = board[i][j];
      }
    }
  }

  return [nextBoard, changingCells];
}
