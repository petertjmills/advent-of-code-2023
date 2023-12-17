import fs from "fs";

const input = fs.readFileSync("./day3.input", "utf-8");
const specialCharacters = new Set(input.replace(/[\d.\n]/g, "").split(""));

const inputMatrix = input.split("\n").map((row) => row.split(""));
const inputMatch = input
  .split("\n")
  .map((line) => [...line.matchAll(/\d+/g)])
  .map((line, rowNumber) =>
    line.map((match) => {
      const item = {
        number: Number(match[0]),
        row: rowNumber,
        column: match.index,
      };

      const len = item.number.toString().length;

      const searchArray = inputMatrix
        .slice(
          Math.max(item.row - 1, 0),
          Math.min(item.row - 1 + 3, inputMatrix.length)
        )
        .map((row) =>
          row.slice(
            Math.max(item.column - 1, 0),
            Math.min(item.column - 1 + len + 2, row.length)
          )
        )
        .map((row) => row.map((item) => specialCharacters.has(item)))
        .map((row) => row.some((item) => item === true))
        .some((item) => item === true);

      return {
        ...item,
        searchArray,
      };
    })
  );

const result = inputMatch.map(row => row.filter(item => item.searchArray === true)).flat().reduce((acc, item) => acc + item.number, 0)

console.log(result);
// console.log(inputMatch[0]);
// console.log(inputMatrix[0][24]);

// console.log(specialCharacters)
// console.log(specialCharacters.has(undefined));
// console.log(inputMatrix.length);
