import {getInput} from "../commons";
import md5 from 'js-md5';

type Input = string;
const year = 2015;
const day = 4;
const dataParser: DataParser<Input> = (data) => data.trim();

const step1 = (input: Input) => () => {
  let numberForHash = 0;

  while (!md5(input + numberForHash).startsWith("00000")) {
    ++numberForHash;
  }

  console.log(`${year}     ${day}      1: `, numberForHash);
};

const step2 = (input: Input) => () => {
  let numberForHash = 0;

  while (!md5(input + numberForHash).startsWith("000000")) {
    ++numberForHash;
  }

  console.log(`${year}     ${day}      2: `, numberForHash);
}

const generateExport = async () => {
  const input = await getInput(year, day, dataParser)

  return {
    step1: step1(input),
    step2: step2(input)
  }
};

export default generateExport;
