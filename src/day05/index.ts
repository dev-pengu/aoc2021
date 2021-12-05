import run from "aocrunner";

class Point {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}

const parseInput = (rawInput: string) => {
  const parsedInput = rawInput.split('\n')
    .map((val) => val.split(' -> ')
    .map((val) => {
      const point = val.split(',')
      return new Point(+point[0], +point[1]);
    }));

  return parsedInput;
};

const part1 = (rawInput: string) => {
  const segments = parseInput(rawInput);
  const map: {point: Point, visitCount: number}[][] = []
  let maxX = 0,
      maxY = 0;
  segments.forEach((line) => {
    const begin = line[0];
    const end = line[1];
    const localMaxX = Math.max(begin.x, end.x);
    const localMaxY = Math.max(begin.y, end.y);
    if (localMaxX > maxX) {
      maxX = localMaxX;
    }
    if (localMaxY > maxY) {
      maxY = localMaxY;
    }
  });

  for (let i = 0; i <= maxX; i++) {
    map.push([]);
    for (let j = 0; j <= maxY; j++) {
      const point: Point = new Point(i, j);
      map[i].push({point, visitCount: 0});
    }
  }

  segments.forEach((line) => {
    const begin = line[0];
    const end = line[1];

    const xMax = Math.max(begin.x, end.x);
    const yMax = Math.max(begin.y, end.y);
    const xMin = Math.min(begin.x, end.x);
    const yMin = Math.min(begin.y, end.y);

    if (begin.y === end.y) {
      for (let i = xMin; i <= xMax; i++) {
        map[i][begin.y].visitCount++;
      }
    } else if (begin.x === end.x) {
      for (let i = yMin; i <= yMax; i++) {
        map[begin.x][i].visitCount++;
      }
    }
  });
  return map.flat().filter((point) => point.visitCount >= 2).length;
};

const part2 = (rawInput: string) => {
  const segments = parseInput(rawInput);
  const map: {point: Point, visitCount: number}[][] = []
  let maxX = 0,
      maxY = 0;
  segments.forEach((line) => {
    const begin = line[0];
    const end = line[1];
    const localMaxX = Math.max(begin.x, end.x);
    const localMaxY = Math.max(begin.y, end.y);
    if (localMaxX > maxX) {
      maxX = localMaxX;
    }
    if (localMaxY > maxY) {
      maxY = localMaxY;
    }
  });

  for (let i = 0; i <= maxX; i++) {
    map.push([]);
    for (let j = 0; j <= maxY; j++) {
      const point: Point = new Point(i, j);
      map[i].push({point, visitCount: 0});
    }
  }

  segments.forEach((line) => {
    const begin = line[0];
    const end = line[1];

    const xMax = Math.max(begin.x, end.x);
    const yMax = Math.max(begin.y, end.y);
    const xMin = Math.min(begin.x, end.x);
    const yMin = Math.min(begin.y, end.y);

    if (begin.y === end.y) {
      for (let i = xMin; i <= xMax; i++) {
        map[i][begin.y].visitCount++;
      }
    } else if (begin.x === end.x) {
      for (let i = yMin; i <= yMax; i++) {
        map[begin.x][i].visitCount++;
      }
    } else {
      const steps = Math.abs(begin.x - end.x);
      const xDir = end.x - begin.x > 0 ? 1 : -1;
      const yDir = end.y - begin.y > 0 ? 1 : -1;
      for (let i = 0; i <= steps; i++) {
        map[begin.x + (xDir * i)][begin.y + (yDir * i)].visitCount++;
      }
    }
  });
  return map.flat().filter((point) => point.visitCount >= 2).length;
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
