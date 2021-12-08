/// <reference path="types.d.ts" />
import y2021 from './2021';
import y2015 from './2015';

const run = async () => {
  console.log("year   day    step");
  const {step1, step2} = await y2021.day8();

  step1();
  step2();
}

run()
