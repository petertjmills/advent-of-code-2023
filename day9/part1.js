import fs from "fs";

const input = fs
  .readFileSync("./input", "utf-8")
  .split("\n")
  .map((item) => item.split(" ").map((item) => Number(item)));

function pascals(numRows) {
  numRows = numRows;
  if (numRows === 0) return [];
  if (numRows === 1) return [[1]];
  let result = [];
  for (let row = 1; row <= numRows; row++) {
    let arr = [];
    for (let col = 0; col < row; col++) {
      if (col === 0 || col === row - 1) {
        arr.push(1);
      } else {
        arr.push(result[row - 2][col - 1] + result[row - 2][col]);
      }
    }
    result.push(arr);
  }
  return result.pop();
}

const getResult = (input) => {
  const pasc = pascals(input.length);

  const r = input.reduce((acc, item, idx) => {
    if (idx % 2 === 0) {
      return acc + item * pasc[idx];
    } else {
      return acc - item * pasc[idx];
    }
  }, 0);
  if (r != 0) {
    return getResult(input.slice(0, input.length - 1));
  }

  input.pop();
  pasc.shift();

  // do r + (input[0] * pasc[0]) - (input[1] * pasc[1]) ... + (input[n] * pasc[n])
  const f = input.reduce((acc, item, idx) => {
    if (idx % 2 === 0) {
      return acc + item * pasc[idx];
    } else {
      return acc - item * pasc[idx];
    }
  }, r);

  return f;
};

const result = input
  .map((item) => getResult(item.reverse()))
  .reduce((acc, item) => acc + item, 0);


console.log(result);
