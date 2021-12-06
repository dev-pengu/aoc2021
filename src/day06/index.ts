import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(',').map((val) => parseInt(val));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let result = [...input]
  for (let i = 1; i <= 80; i++) {
    result.forEach((val, idx) => {
      if (val === 0) {
        result[idx] = 6;
        result.push(8);
      } else {
        result[idx] = val - 1;
      }
    });
  }
  return result.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const result: number[] = [];
  for (let i = 0; i <= 8; i++) {
    result.push(0);
  }
  input.forEach((val) => {
    result[val]++;
  });
  for (let i = 0; i < 256; i++) {
    const tmp: number[] = [0,0,0,0,0,0,0,0,0];
    result.forEach((val, idx) => {
      if (idx === 0) {
        tmp[6] += val;
        tmp[8] += val;
      } else {
        tmp[idx - 1] += val;
      }
    });
    tmp.forEach((val, idx) => {
      result[idx] = val;
    })
  }
  return result.reduce((prev, curr) => prev + curr);
};

run({
  part1: {
    tests: [
      { input: `3,4,3,1,2`, expected: 5934 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `3,4,3,1,2`, expected: 26984457539 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
