import fs from "fs";

const input = fs.readFileSync("./day2.input", "utf8");

// line is Game 1: 10 red, 7 green, 3 blue; 5 blue, 3 red, 10 green; 4 blue, 14 green, 7 red; 1 red, 11 green; 6 blue, 17 green, 15 red; 18 green, 7 red, 5 blue

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
      ),
  })) // for each in colors what is the max rgb value. -> max = {r: max(r) ...}
  .map((line) => {
    const max = {
      maxred: Math.max(...line.colors.map((c) => c.red).filter((c) => c)),
      maxgreen: Math.max(...line.colors.map((c) => c.green).filter((c) => c)),
      maxblue: Math.max(...line.colors.map((c) => c.blue).filter((c) => c)),
    };
    return {
      game: line.game,
      max: max,
      power: max.maxred * max.maxgreen * max.maxblue,
    };
  }).reduce((acc, cur) => acc + cur.power, 0);

console.log(lines);
