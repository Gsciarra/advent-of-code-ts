import {getInput} from "../commons";

type WireName = string
type Input = { source: string | number, name: WireName }[];
const year = 2015;
const day = 7;

const dataParser: DataParser<Input> = (data) => data
  .split("\n")
  .filter(row => row.trim().length > 0)
  .map(row => {
    const [source, name] = row.split(" -> ");

    return {source: isNaN(+source) ? source : +source, name};
  })

const checkHasRef = (source: string | number): boolean => {
  if (typeof source === "number" || !isNaN(+source)) return false;

  if (source.includes("AND")) {
    const [ref1, ref2] = source.split(" AND ");
    return checkHasRef(ref1) || checkHasRef(ref2)
  } else if (source.includes("OR")) {
    const [ref1, ref2] = source.split(" OR ");
    return checkHasRef(ref1) || checkHasRef(ref2)
  } else if (source.includes("NOT")) {
    const [_, ref] = source.split(" ");
    return checkHasRef(ref)
  } else if (source.includes("LSHIFT")) {
    const [ref] = source.split(" LSHIFT ");
    return checkHasRef(ref)
  } else if (source.includes("RSHIFT")) {
    const [ref] = source.split(" RSHIFT ");
    return checkHasRef(ref)
  } else {
    return true;
  }
}

const step1 = (input: Input) => () => {
  const resolve = (index: number) => {
    const {source} = input[index];
    let newSource: number;

    if (typeof source === "number" || !isNaN(+source)) return;

    if (source.includes("AND")) {
      const [amount1, amount2] = source.split(" AND ");
      newSource = Number(amount1) & Number(amount2);
    } else if (source.includes("OR")) {
      const [amount1, amount2] = source.split(" OR ");
      newSource = Number(amount1) | Number(amount2);
    } else if (source.includes("NOT")) {
      const [_, amount] = source.split(" ");
      newSource = ~Number(amount);
    } else if (source.includes("LSHIFT")) {
      const [amount, shift] = source.split(" LSHIFT ");
      newSource = Number(amount) << Number(shift);
    } else if (source.includes("RSHIFT")) {
      const [amount, shift] = source.split(" RSHIFT ");
      newSource = Number(amount) >>> Number(shift);
    } else {
      newSource = Number(source);
    }
    input[index].source = newSource;
  }

  const replaceRefWithAmount = (ref: string, amount: number) => {
    for (let i = 0; i < input.length; i++) {
      const {source} = input[i];
      if (checkHasRef(source)) {
        input[i].source = (source as string)
          .split(" ")
          .map(s => s === ref ? amount : s)
          .join(" ");
      }

      if (typeof input[i].source !== "number" && !checkHasRef(input[i].source)) {
        resolve(i);
      }
    }
  }
  let noMoreRef = false;
  while (!noMoreRef) {
    noMoreRef = true;
    for (let i = 0; i < input.length; ++i) {
      const {source, name} = input[i];

      if (typeof source === "number") {
        replaceRefWithAmount(name, source);
      } else if (checkHasRef(source)) {
        noMoreRef = false;
      }
    }
  }

  console.log(`${year}     ${day}      1: `, +input.filter(({name}) => name === "a")[0].source);
};

const step2 = (input: Input) => () => {
  const resolve = (index: number) => {
    const {source} = input[index];
    let newSource: number;

    if (typeof source === "number" || !isNaN(+source)) return;

    if (source.includes("AND")) {
      const [amount1, amount2] = source.split(" AND ");
      newSource = Number(amount1) & Number(amount2);
    } else if (source.includes("OR")) {
      const [amount1, amount2] = source.split(" OR ");
      newSource = Number(amount1) | Number(amount2);
    } else if (source.includes("NOT")) {
      const [_, amount] = source.split(" ");
      newSource = ~Number(amount);
    } else if (source.includes("LSHIFT")) {
      const [amount, shift] = source.split(" LSHIFT ");
      newSource = Number(amount) << Number(shift);
    } else if (source.includes("RSHIFT")) {
      const [amount, shift] = source.split(" RSHIFT ");
      newSource = Number(amount) >>> Number(shift);
    } else {
      newSource = Number(source);
    }
    input[index].source = newSource;
  }

  const replaceRefWithAmount = (ref: string, amount: number) => {
    for (let i = 0; i < input.length; i++) {
      const {source} = input[i];
      if (checkHasRef(source)) {
        input[i].source = (source as string)
          .split(" ")
          .map(s => s === ref ? amount : s)
          .join(" ");
      }

      if (typeof input[i].source !== "number" && !checkHasRef(input[i].source)) {
        resolve(i);
      }
    }
  }
  replaceRefWithAmount("b", 16076);

  let noMoreRef = false;
  while (!noMoreRef) {
    noMoreRef = true;
    for (let i = 0; i < input.length; ++i) {
      const {source, name} = input[i];

      if (typeof source === "number") {
        replaceRefWithAmount(name, source);
      } else if (checkHasRef(source)) {
        noMoreRef = false;
      }
    }
  }

  console.log(`${year}     ${day}      2: `, +input.filter(({name}) => name === "a")[0].source);
}

const generateExport = async () => {
  const input = await getInput(year, day, dataParser)

  return {
    step1: step1([...input]),
    step2: step2([...input])
  }
};

export default generateExport;
