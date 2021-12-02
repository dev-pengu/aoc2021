import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const parsedInput = rawInput.split('\n');
  return parsedInput.map((val) => {
    const direction = val.split(' ');
    return {command: direction[0], magnitude: +direction[1]};
  })
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const position = {x: 0, y: 0};
  input.forEach((val) => {
    switch (val.command) {
      case 'forward':
        position.x += val.magnitude;
        break;
      case 'down':
        position.y += val.magnitude;
        break;
      case 'up':
        position.y -= val.magnitude;
        break;
      default:
        break;
    }
  });
  return position.x * position.y;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const position = {horizontal: 0, depth: 0, aim: 0};
  input.forEach((val) => {
    switch (val.command) {
      case 'forward':
        position.horizontal += val.magnitude;
        position.depth += (position.aim * val.magnitude);
        break;
      case 'down':
        position.aim += val.magnitude;
        break;
      case 'up':
        position.aim -= val.magnitude;
        break;
      default:
        break;
    }
  })
  return position.horizontal * position.depth;
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
