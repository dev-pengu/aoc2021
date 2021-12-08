import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(',').map((val) => parseInt(val));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const min = Math.min.apply(null, input);
  const max = Math.max.apply(null, input);
  const costs: number[] = [];
  for (let i = min; i <= max; i++) {
    costs.push(
      input.map((val) => (
        Math.abs(i - val)
      )).reduce((prev, curr) => (
        prev + curr
      ))
    )
  }
  return Math.min.apply(null, costs);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const min = Math.min.apply(null, input);
  const max = Math.max.apply(null, input);
  const costs: number[] = [];
  for (let i = min; i <= max; i++) {
    costs.push(
      input.map((val) => (
        Math.abs(i - val)
      )).map((val) => (
        (val * (val + 1)) / 2
      )).reduce((prev, curr) => (
        prev + curr
      ))
    );
  }
  return Math.min.apply(null, costs);
};

run({
  part1: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
