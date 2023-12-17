const calcDistance = (hold, maxTime) => {
  return Math.max(hold * (maxTime - hold), 0);
};

const calcHoldLower = (distance, maxTime) => {
  return Math.ceil((maxTime - Math.sqrt(maxTime ** 2 - 4 * distance)) / 2);
};

const calcHoldUpper = (distance, maxTime) => {
  return Math.floor((maxTime + Math.sqrt(maxTime ** 2 - 4 * distance)) / 2);
};

import fs from "fs";

const input = fs
  .readFileSync("./input", "utf-8")
  .split("\n")
  .map((item) =>
    item
      .split(": ")
      .filter((item) => item !== "")[1]
      .replace(/\D/g, "")
  )
  .map((item) => Number(item));


const result = [input]
  .map((item) => {
    const lower = calcHoldLower(item[1], item[0]);
    const upper = calcHoldUpper(item[1], item[0]);

    return upper - lower + 1;
  })
  .reduce((acc, item) => acc * item);

console.log(result);
