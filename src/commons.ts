import {get} from 'https';
import {IncomingMessage} from "http";
import {readFileSync, writeFile, existsSync} from 'fs';
import {resolve} from 'path';
import {sessionToken} from "./private";

export const getInput: GetInput = (year, day, dataParser) => new Promise((res) => {
  const filePath = resolve(__dirname, `inputs/${year}/day${day}.txt`);
  if (existsSync(filePath)) {
    const input: string = readFileSync(filePath, {encoding: 'utf8', flag: 'r'});
    res(dataParser(input))
  } else {
    console.info(`Asking input for day ${day}/${year} from server`);
    get({
      hostname: "adventofcode.com",
      path: `/${year}/day/${day}/input`,
      headers: {'Cookie': `session=${sessionToken}`}
    }, (response: IncomingMessage) => {
      let data = '';
      response.on('data', function (chunk) {
        data += chunk;
      });
      response.on('end', function () {
        res(dataParser(data))
        writeFile(filePath, data, (err) => {
          console.log("err:", err)
        });
      });
    }).on('error', (e) => {
      throw Error("Request error: " + e)
    })
  }
});
