const max = {
  red: 12,
  green: 13,
  blue: 14,
};

import fs from "fs";

const input = fs.readFileSync("./day2.input", "utf8");

// line is Game 1: 10 red, 7 green, 3 blue; 5 blue, 3 red, 10 green; 4 blue, 14 green, 7 red; 1 red, 11 green; 6 blue, 17 green, 15 red; 18 green, 7 red, 5 blue. make object with game number and array of objects with color and number

const lines = input
  .split("\n")
  .map((line) => ({
    game: parseInt(line.split(":")[0].replace("Game ", "")),
    colors: line
      .split(":")[1]
      .split(";")
      .map((go) => go.split(",").map((c) => c.trim())) // [["10 red", "7 green", "3 blue"], ["5 blue", "3 red", "10 green"], ...] -> {r: 10, g: 7, b: 3}, {b: 5, r: 3, g: 10}, ...
      .map((go) =>
        go.reduce((acc, cur) => {
          const [n, c] = cur.split(" ");
          acc[c] = parseInt(n);
          return acc;
        }, {})
      ) // [{r: 10, g: 7, b: 3}, {b: 5, r: 3, g: 10}, ...] - are any of the values greater than max? greater than max is false (include or not) -> [{r: 0, g: 0, b: 0}, {b: 0, r: 0, g: 0}, ...]
      .map((go) => {
        const result = {};
        Object.keys(go).forEach((key) => {
          result[key] = go[key] > max[key] ? 0 : 1;
        });
        return result;
      })
      .map((go) => Object.values(go).every(Boolean)),
  }))
  .filter((line) => line.colors.every(Boolean))
  .reduce((acc, cur) => acc + cur.game, 0);

console.log(lines);
