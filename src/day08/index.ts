import run from "aocrunner";

const oneSegments = 2;
const fourSegments = 4;
const sevenSegments = 3;
const eightSegments = 7;
type Dictionary<T> = {[index: string]: T};

const parseInput = (rawInput: string) => {
  const lines = rawInput.split('\n');
  const input = lines.map((val) => val.split(' | ')).map((val) => ({signals: val[0].split(' '), outputs: val[1].split(' ')}));
  return input;
};

const filterFunc = (length: number): boolean => {
  if (length === oneSegments || length === fourSegments || length === sevenSegments || length === eightSegments){
    return true;
  }
  return false;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const counts = input.map((val) => {
    return val.outputs.filter((val) => filterFunc(val.length)).length;
  });
  return counts.reduce((prev, curr) => prev + curr);
};

const contains = ( str: string, arr: string[] ) => {
  for (const letter of arr) {
    if (str.indexOf(letter) === -1) {
      return false;
    }
  }
  return true;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const results: number[] = [];
  for (const row of input) {
    const counts: Dictionary<number> = {'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0};
    const mapping: Dictionary<string> = {'a': '', 'b': '', 'c': '', 'd': '', 'e': '', 'f': '', 'g': ''};
    const numbers: string[] = ['', '', '', '', '', '', '', '', '', ''];
    for (const signal of row.signals) {
      const splitSignal = signal.split('');
      for (const letter of splitSignal) {
        counts[letter]++;
      }
      if (signal.length === oneSegments) {
        numbers[1] = signal;
      } else if (signal.length === fourSegments) {
        numbers[4] = signal;
      } else if (signal.length === sevenSegments) {
        numbers[7] = signal;
      } else if (signal.length === eightSegments) {
        numbers[8] = signal;
      }
    }
    
    for (const [k, v] of Object.entries(counts)) {
      if (v === 6) {
        mapping['b'] = k;
      } else if (v === 4) {
        mapping['e'] = k;
      } else if (v === 9) {
        mapping['f'] = k;
      } else if (v === 7) {
        if (numbers[4].indexOf(k) !== -1) {
          mapping['d'] = k;
        } else {
          mapping['g'] = k;
        }
      } else if (v === 8) {
        if (numbers[1].indexOf(k) !== -1) {
          mapping['c'] = k;
        } else {
          mapping['a'] = k;
        }
      }
    }
    
    for (const signal of row.signals) {
      if (signal.length === 6 && contains(signal, [mapping['a'], mapping['b'], mapping['c'], mapping['e'], mapping['f'], mapping['g']])) {
        numbers[0] = signal
      } else if (signal.length === 5 && contains(signal, [mapping['a'], mapping['c'], mapping['d'], mapping['e'], mapping['g']])) {
        numbers[2] = signal;
      } else if (signal.length === 5 && contains(signal, [mapping['a'], mapping['c'], mapping['d'], mapping['f'], mapping['g']])) {
        numbers[3] = signal;
      } else if (signal.length === 5 && contains(signal, [mapping['a'], mapping['b'], mapping['d'], mapping['f'], mapping['g']])) {
        numbers[5] = signal;
      } else if (signal.length === 6 && contains(signal, [mapping['a'], mapping['b'], mapping['d'], mapping['e'], mapping['f'], mapping['g']])) {
        numbers[6] = signal;
      } else if (signal.length === 6 && contains(signal, [mapping['a'], mapping['b'], mapping['c'], mapping['d'], mapping['f'], mapping['g']])) {
        numbers[9] = signal;
      }
    }
    numbers.forEach((val, idx) => {
      numbers[idx] = val.split('').sort().join('');
    });
    const outputArr: number[] = [];
    for (const output of row.outputs) {
      const sortedOutput = output.split('').sort().join('');
      const decimalRep = numbers.indexOf(sortedOutput);
      outputArr.push(decimalRep);
    }

    results.push(parseInt(outputArr.join('')));
  }

  return results.reduce((prev, curr) => prev + curr);
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
      {input: 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf', expected: 5353},
      { input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
dbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`
      , expected: 61229 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
