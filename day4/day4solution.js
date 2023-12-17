import fs from "fs";

const input = fs.readFileSync("./day4.input", "utf-8");

const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const getMatches = (row) => {
  const data = {
    card_no: row
      .split(": ")[0]
      .split(" ")
      .filter((item) => item != "")[1],
    arr1: row
      .split(": ")[1]
      .split("|")[0]
      .split(" ")
      .filter((item) => item != ""),
    arr2: new Set(
      row
        .split(": ")[1]
        .split("|")[1]
        .split(" ")
        .filter((item) => item != "")
    ),
  };

  const matches = data.arr1
    .map((item) => data.arr2.has(item))
    .filter((item) => item === true).length;

  return {
    card_no: data.card_no,
    matchCount: matches,
  };
};

const inputArray = input.split("\n").map((row) => getMatches(row));

function calcNewCards(i) {
  const outputArray = i
    .map((item) => {
      return inputArray.slice(
        parseInt(item.card_no),
        parseInt(item.card_no) + item.matchCount
      );
    })
    .flat();

  // if any of outputArray has matchCount > 0, run calcNewCards again
  const outputArrayMatchCount = outputArray
    .map((item) => item.matchCount)
    .reduce((acc, item) => acc + item, 0);
  if (outputArrayMatchCount > 0) {
    const r = calcNewCards(outputArray);
    return [...outputArray, ...r];
  }

  return outputArray;
}

// const newInputArray = inputArray
//   .filter((item) => item.matchCount != 0)
//   .map((item) => {
//     return inputArray.slice(
//       parseInt(item.card_no),
//       parseInt(item.card_no) + item.matchCount
//     );
//   }).flat()

console.log(calcNewCards(inputArray).length + inputArray.length);
