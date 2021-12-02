import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArr = input.split('\n').map((val) => (+val));
  let accumulator = 0;
  inputArr.forEach((val, idx) => {
    if (idx > 0) {
      if (val > inputArr[idx -1]) {
        accumulator++;
      }
    }
  })
  return accumulator;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArr = input.split('\n').map((val) => (+val));
  let accumulator = 0;
  inputArr.forEach((val, idx) => {
    if (idx > 2) {
      let sum1 = inputArr[idx - 3] + inputArr[idx - 2] + inputArr[idx - 1];
      let sum2 = val + inputArr[idx - 1] + inputArr[idx - 2];
      if (sum2 > sum1) {
        accumulator++;
      } 
    }
  });
  return accumulator;
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
