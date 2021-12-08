import {getInput} from "../commons";

type Command = "turn off" | "turn on" | "toggle";
type Coordinate = { x: number, y: number }
type Instruction = { command: Command, from: Coordinate, to: Coordinate };
type Input = Instruction[];
const year = 2015;
const day = 6;
const dataParser: DataParser<Input> = (data) => data
  .split("\n")
  .filter(row => row.trim().length > 0)
  .map((row) => {
    let command: Command;
    if (row.startsWith("turn off")) {
      command = "turn off";
      row = row.replace("turn off ", "");
    } else if (row.startsWith("turn on")) {
      command = "turn on";
      row = row.replace("turn on ", "");
    } else {
      command = "toggle";
      row = row.replace("toggle ", "");
    }
    const [rawFrom, rawTo] = row.split(" through ");
    const [fromX, fromY] = rawFrom.split(",").map(Number);
    const [toX, toY] = rawTo.split(",").map(Number);

    return {
      command,
      from: {x: fromX, y: fromY},
      to: {x: toX, y: toY}
    };
  })
;

const step1 = (input: Input) => () => {
  const litList = new Set();
  for (let i = 0; i < input.length; i++) {
    const {command, from, to}: Instruction = input[i];
    switch (command) {
      case "turn off": {
        for (let x = from.x; x <= to.x; ++x) {
          for (let y = from.y; y <= to.y; ++y) {
            litList.delete(`${x}|${y}`);
          }
        }
        break;
      }
      case "turn on": {
        for (let x = from.x; x <= to.x; ++x) {
          for (let y = from.y; y <= to.y; ++y) {
            litList.add(`${x}|${y}`);
          }
        }
        break;
      }
      case "toggle": {
        for (let x = from.x; x <= to.x; ++x) {
          for (let y = from.y; y <= to.y; ++y) {
            const coordinate = `${x}|${y}`
            if (litList.has(coordinate)) {
              litList.delete(coordinate);
            } else {
              litList.add(coordinate);
            }
          }
        }
        break;
      }
    }
  }

  console.log(`${year}     ${day}      1: `, litList.size);
};

const doOperationOnEveryPosition = (from: Coordinate, to: Coordinate, operation: (key: string) => void) => {
  for (let x = from.x; x <= to.x; ++x) {
    for (let y = from.y; y <= to.y; ++y) {
      operation(`${x}|${y}`)
    }
  }
}

const step2 = (input: Input) => () => {
  const litList: Map<string, number> = new Map();

  for (let i = 0; i < input.length; i++) {
    const {command, from, to}: Instruction = input[i];
    switch (command) {
      case "turn off": {
        doOperationOnEveryPosition(from, to, (key) => {
          litList.set(key, litList.has(key) ? Math.max(0, litList.get(key)! - 1) : 0)
        })
        break;
      }
      case "turn on": {
        doOperationOnEveryPosition(from, to, (key) => {
          litList.set(key, litList.has(key) ? litList.get(key)! + 1 : 1)
        })
        break;
      }
      case "toggle": {
        doOperationOnEveryPosition(from, to, (key) => {
          litList.set(key, litList.has(key) ? litList.get(key)! + 2 : 2)
        })
        break;
      }
    }
  }


  console.log(`${year}     ${day}      2: `, [...litList.values()].reduce((tot, lit) => tot + lit, 0));
}

const generateExport = async () => {
  const input = await getInput(year, day, dataParser)

  return {
    step1: step1(input),
    step2: step2(input)
  }
};

export default generateExport;
