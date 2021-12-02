import {getInput} from "../commons";

type Direction = '^' | '>' | 'v' | '<';
type Coordinates = { x: number, y: number };
type Input = Direction[];
const year = 2015;
const day = 3;
const dataParser: DataParser<Input> = (data) => data.split('') as Direction[];

const step1 = (input: Input) => () => {
  const housesCoordinates = new Set();
  let x = 0;
  let y = 0;

  housesCoordinates.add("0|0");
  for (let i = 0; i < input.length; i++) {
    switch (input[i]) {
      case "^":
        y += 1;
        break;
      case ">":
        x += 1;
        break;
      case "v":
        y -= 1;
        break;
      case "<":
        x -= 1;
        break;
    }
    housesCoordinates.add(`${x}|${y}`);
  }

  console.log(`${year}     ${day}      1: `, housesCoordinates.size);
};

const step2 = (input: Input) => () => {
  const housesCoordinates = new Set();
  const santa = {x: 0, y: 0};
  const robotSanta = {x: 0, y: 0};

  housesCoordinates.add("0|0");
  const updateCoordinates = (oneSanta: Coordinates, direction: Direction) => {
    switch (direction) {
      case "^":
        oneSanta.y += 1;
        break;
      case ">":
        oneSanta.x += 1;
        break;
      case "v":
        oneSanta.y -= 1;
        break;
      case "<":
        oneSanta.x -= 1;
        break;
    }
    housesCoordinates.add(`${oneSanta.x}|${oneSanta.y}`);
  }

  for (let i = 1; i < input.length; i += 2) {
    updateCoordinates(santa, input[i - 1]);
    updateCoordinates(robotSanta, input[i]);
  }

  // @ts-ignore
  housesCoordinates.forEach((v: string) => {
    ["0|0", "-0|0", "0|-0", "-0|-0"].includes(v) && console.log(v)
  });

  console.log(`${year}     ${day}      2: `, housesCoordinates.size);
}

const generateExport = async () => {
  const input = await getInput(year, day, dataParser)

  return {
    step1: step1(input),
    step2: step2(input)
  }
};

export default generateExport;
