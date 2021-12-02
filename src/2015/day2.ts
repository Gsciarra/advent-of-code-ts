import {getInput} from "../commons";

type Input = [number, number, number][];
const year = 2015;
const day = 2;
const dataParser: DataParser<Input> = (data) => data
  .split("\n")
  .filter(row => row.trim().length > 0)
  .map(row => {
    const [l, w, h] = row.split("x");
    return [Number(l), Number(w), Number(h)];
  });

const step1 = (input: Input) => () => {
  let totalArea = 0;
  for (let i = 0; i < input.length; ++i) {
    const [l, w, h] = input[i];
    const side1 = l * w;
    const side2 = h * w;
    const side3 = l * h;

    totalArea += 2 * side1 + 2 * side2 + 2 * side3 + Math.min(side1, side2, side3);
  }

  console.log(`${year}     ${day}      1: `, totalArea);
};

const step2 = (input: Input) => () => {
  let totalRibbonLength = 0;
  for (let i = 0; i < input.length; ++i) {
    const [l1, l2, l3] = input[i].sort((a, b) => a - b);
    const lengthToWrap = l1 * 2 + l2 * 2;
    const lengthForBow = l1 * l2 * l3;

    totalRibbonLength += lengthToWrap + lengthForBow;
  }

  console.log(`${year}     ${day}      2: `, totalRibbonLength);
}

const generateExport = async () => {
  const input = await getInput(year, day, dataParser)

  return {
    step1: step1(input),
    step2: step2(input)
  }
};

export default generateExport;
