import fs from "fs";

const input = fs.readFileSync("day1.input", "utf8");

const numberMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const output = input
  .split("\n")
  .map((line) =>
    Array.from(
      line.matchAll(/(?=(eight|seven|six|five|four|three|two|one|nine|\d))/g)
    )
      .map((item) => item[1])
      .map((item) => numberMap[item] || item)
  )
  .map((item) => parseInt(item[0] + item[item.length - 1]))
  .reduce((acc, curr) => acc + curr, 0);

console.log(output);