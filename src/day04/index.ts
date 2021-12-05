import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const idx = rawInput.indexOf('\n');
  const numbers = rawInput.slice(0, idx).split(',').map((val) => +val);

  const boards = rawInput
    .slice(idx + 2)
    .split('\n\n')
    .map(
      (val) => val.split('\n')
        .map(
          (val) => val.split(' ').filter((val) => val !== '')
          .map(
            (val) => +val)));
  return {numbers, boards};
};

const checkForWin = (board: number[][]): boolean => {
  // check for horizontal win
  for (const row of board) {
    if (row.filter((num) => num !== -1).length === 0) {
      return true;
    }
  };

  for (let i = 0; i < board[0].length; i++) {
    if (board[0][i] === -1 && board[1][i] === -1 && board[2][i] === -1
      && board[3][i] === -1 && board[4][i] === -1) {
        return true;
      }
  }
  return false;
};

const part1 = (rawInput: string) => {
  const {numbers, boards} = parseInput(rawInput);
  const emptyArr: number[] = [];
  let winningNumber = -1;
  let boardSum = 0;
  for (const number of numbers) {
    for (const board of boards) {
      const flat = emptyArr.concat.apply([], board)
      let col = flat.indexOf(number);
      let row = -1;
      if (col != -1) {
        while (board[++row].length <= col) {
          col -= board[row].length;
        }
        board[row][col] = -1;
      }
      if (checkForWin(board)) {
        winningNumber = number;
        boardSum = board.flat().filter((val) => val !== -1).reduce((prev, curr) => prev + curr);
        break;
      }
    };
    if (winningNumber !== -1) {
      break;
    }
  };
  return winningNumber * boardSum;
};

const part2 = (rawInput: string) => {
  const {numbers, boards} = parseInput(rawInput);
  const emptyArr: number[] = [];
  let winningNumber = -1;
  let boardSum = 0;
  const winningBoards: number[] = [];
  for (const number of numbers) {
    for (let i = 0; i < boards.length; i++) {
      if (winningBoards.indexOf(i) !== -1) {
        continue;
      }
      const board = boards[i];
      const flat = emptyArr.concat.apply([], board);
      let col = flat.indexOf(number);
      let row = -1;
      if (col !== -1) {
        while (board[++row].length <= col) {
          col -= board[row].length;
        }
        board[row][col] = -1;
      }
      if (checkForWin(board)) {
        winningNumber = number;
        boardSum = board.flat().filter((val) => val !== -1).reduce((prev, curr) => prev + curr);
        winningBoards.push(i);
      }
    }
  }
  return boardSum * winningNumber;
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
