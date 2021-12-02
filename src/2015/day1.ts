import {getInput} from "../commons";

type Direction = "(" | ")";
type Input = Direction[];
const year = 2015;
const day = 1;
const dataParser: DataParser<Input> = (data) => data.trim().split("") as Direction[];

const addLevel = (direction: Direction): number => {
  switch (direction) {
    case "(":
      return +1;
    case ")":
      return -1;
  }
}

const step1 = (input: Input) => () => {
  let level = 0;

  for (let i = 0; i < input.length; ++i) {
    level += addLevel(input[i])
  }

  console.log(`${year}     ${day}      1: `, level);
};

const step2 = (input: Input) => () => {
  let level = 0;
  let lastIndex = 0;

  for (let i = 0; i < input.length; ++i) {
    level += addLevel(input[i])

    if (level === -1) {
      lastIndex = i;
      break;
    }
  }

  console.log(`${year}     ${day}      2: `, lastIndex + 1);
}

const generateExport = async () => {
  const input = await getInput(year, day, dataParser)

  return {
    step1: step1(input),
    step2: step2(input)
  }
};

export default generateExport
