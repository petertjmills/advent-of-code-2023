import fs from "fs";

const input = fs.readFileSync("./day3.input", "utf-8");

const inputMatrix = input.split("\n").map((row) => row.split(""));
//add a border of false values to the inputMatrix columns and rows
inputMatrix.forEach((row) => {
  row.unshift(false);
  row.push(false);
});

inputMatrix.unshift(Array(inputMatrix[0].length).fill(false));
inputMatrix.push(Array(inputMatrix[0].length).fill(false));

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
        .slice(item.row, item.row + 3)
        .map((row) => row.slice(item.column, item.column + len + 2))

        .map((row) => row.map((item) => item === "*"));

      // get relative coords of true values
      const trueCoords = searchArray
        .map((row, rowIndex) =>
          row.map((item, columnIndex) =>
            item === true ? [rowIndex, columnIndex] : false
          )
        )
        .flat()
        .filter((item) => item !== false);

      // convert relative coords to absolute coords
      trueCoords.forEach((coord) => {
        coord[0] += item.row;
        coord[1] += item.column;
      });

      return {
        ...item,
        trueCoordsAbsolute: trueCoords,
      };
    })
  );

const result = inputMatch
  .map((row) => row.filter((item) => item.trueCoordsAbsolute.length != 0))
  .flat();

// find pairs with same trueCoordsAbsolute as array of tuples
const sumofpairs = result
  .map((item, index) => {
    const pairs = result
      .slice(index + 1)
      .filter(
        (otherItem) =>
          item.trueCoordsAbsolute.toString() ===
          otherItem.trueCoordsAbsolute.toString()
      )
      .map((otherItem) => item.number*otherItem.number);

    return pairs;
  }).flat().reduce((acc, item) => acc + item, 0);
  

console.log(sumofpairs);

