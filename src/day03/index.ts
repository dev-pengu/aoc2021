import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const gamma: string[] = [];
  const epsilon: string[] = [];
  for (let i = 0; i < input[0].length; i++ ) {
    let ones = 0,
        zeros = 0;
    for (let j = 0; j < input.length; j++) {
      if (+input[j][i] === 0) {
        zeros++;
      } else {
        ones++;
      }
    }
    if (ones > zeros) {
      gamma.push('1');
      epsilon.push('0');
    } else {
      gamma.push('0');
      epsilon.push('1');
    }
  }

  return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
};

const recursivePart2 = (input: string[], criteria: number, idx = 0): number => {
  input = [...input];
  if (input.length === 1) {
    return parseInt(input[0], 2);
  }
  let ones = 0,
      zeros = 0;
  input.forEach((val) => {
    val[idx] === '0' ? zeros++ : ones++;
  });
  if (criteria === 1) {
    if (ones >= zeros) {
      input = input.filter((val) => val[idx] === '1');
    } else {
      input = input.filter((val) => val[idx] === '0');
    }
  } else if (criteria === 0) {
    if (ones >= zeros) {
      input = input.filter((val) => val[idx] === '0');
    } else {
      input = input.filter((val) => val[idx] === '1');
    }
  }
  return recursivePart2(input, criteria, idx++);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let o2: string[] = [...input];
  let co2: string[] = [...input];

  for (let i = 0; i < input[0].length; i++) {
    let ones = 0,
        zeros =0;
    o2.forEach((val) => {
      val[i] === '0' ? zeros++ : ones++;
    });
    if (ones >= zeros) {
      if (o2.length > 1) {
        o2 = o2.filter((val) => val[i] === '1');
      }
    } else {
      if (o2.length > 1) {
        o2 = o2.filter((val) => val[i] === '0');
      }
    }
    ones = zeros = 0;
    co2.forEach((val) => {
      val[i] === '0' ? zeros++ : ones++;
    });
    if (ones >= zeros) {
      if (co2.length > 1) {
        co2 = co2.filter((val) => val[i] === '0');
      }
    } else {
      if (co2.length > 1) {
        co2 = co2.filter((val) => val[i] === '1');
      }
    }
  }
  
  return parseInt(o2[0], 2) * parseInt(co2[0], 2);
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
