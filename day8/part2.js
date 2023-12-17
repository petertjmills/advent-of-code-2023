import fs from "fs";

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

const as = rules.filter((item) => item.name.split("")[2] === "A");

const getSteps = (rules, current) => {
  let counter = 0;
  while (current.split("")[2] !== "Z") {
    const seq = newSequence[counter % newSequence.length];
    counter++;
    if (seq === 0) {
      current = left.get(current);
    } else {
      current = right.get(current);
    }
  }
  return counter;
};

const result = as.map((item) => getSteps(rules, item.name));
const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lcm = (a, b) => (a * b) / gcd(a, b);

console.log(result.reduce(lcm));
