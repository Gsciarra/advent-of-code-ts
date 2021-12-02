import {getInput} from "../commons";

type Input = string[];
const year = 2015;
const day = 5;
const dataParser: DataParser<Input> = (data) => data.split('\n').filter(row => row.trim().length > 0);
// const vowelsRegex = new RegExp(/[aeiou]/g);
// const badString = new RegExp(/(ab|cd|pq|or|xy)/g);
// const containVowels = (text: string, atLeast: number): boolean => (text.match(vowelsRegex) || []).length >= atLeast;
const vowels = "aeiou".split("");
const badStrings = ["ab", "cd", "pq", "xy"];
const containVowels = (text: string, atLeast: number): boolean => text
  .split("")
  .filter(c => vowels.includes(c))
  .length >= atLeast;
const lettersInARow = (text: string, atLeast: number, distance: number): boolean => {
  let inARow = 1;
  for (let i = distance; i < text.length; ++i) {
    if (text[i] === text[i - distance]) {
      ++inARow
    } else {
      inARow = 1;
    }
    if (inARow === atLeast) {
      return true
    }
  }
  return false;
};
const containsBadStrings = (text: string) => badStrings.some(bad => text.includes(bad));
const hasPairRepetition = (text: string) => {
  for (let i = 1; i < text.length; i++) {
    const pair = text.substring(i - 1, i + 1);
    const current = text.split("");
    current.splice(i - 1, 2, "--");

    if (current.join("").includes(pair)) {
      return true
    }
  }
  return false;
}

const step1 = (input: Input) => () => {
  let nice = 0;

  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    if (!containsBadStrings(current) && containVowels(current, 3) && lettersInARow(current, 2, 1)) {
      ++nice;
    }
  }

  console.log(`${year}     ${day}      1: `, nice);
};

const step2 = (input: Input) => () => {
  let nice = 0;

  for (let i = 0; i < input.length; i++) {
    const current = input[i];

    if (lettersInARow(current, 2, 2) && hasPairRepetition(current)) {
      ++nice;
    }
  }
  console.log(`${year}     ${day}      2: `, nice);
}

const generateExport = async () => {
  const input = await getInput(year, day, dataParser)

  return {
    step1: step1(input),
    step2: step2(input)
  }
};

export default generateExport;

