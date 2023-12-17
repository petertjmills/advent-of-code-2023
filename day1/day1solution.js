import fs from "fs";

const input = fs.readFileSync("day1.input", "utf8");

const output = input
  .split("\n")
  .map((line) => line.replace(/\D/g, ""))
  .map((str) => Array.from(str))
  .map((arr) => parseInt(String(arr[0]) + String(arr[arr.length - 1])))
  .reduce((acc, curr) => acc + curr, 0);

console.log(output);
