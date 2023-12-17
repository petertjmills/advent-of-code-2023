import fs from "fs";
// const input = `LLR

// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)`;

const input = fs.readFileSync("./input", "utf-8");

const sequence = input.split("\n")[0];

const rules = input
  .split("\n")
  .slice(2)
  .map((item) => item.split(" = "))
  .map((item) => {
    const data = {
      name: item[0],
      rule: item[1]
        .replace(/\(|\)/g, "")
        .split(", ")
        .map((item) => item.split(" ")),
    };
    return data;
  });

const left = new Map();
const right = new Map();

rules.forEach((item) => {
  left.set(item.name, item.rule[0][0]);
  right.set(item.name, item.rule[1][0]);
});

const newSequence = sequence
  .replace(/L/g, 0)
  .replace(/R/g, 1)
  .split("")
  .map((item) => Number(item));

let current = "AAA";
let counter = 0;

while (current !== "ZZZ") {
  const seq = newSequence[counter % newSequence.length];
  counter++;
  if (seq === 0) {
    current = left.get(current);
  } else {
    current = right.get(current);
  }
}

console.log(counter);
