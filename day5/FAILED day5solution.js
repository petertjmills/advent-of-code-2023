
// This didn't work as maps are limited to 2^24 or 16,777,216 entries. The seed2soil map has 3,000,000,000+ entries.
// Tried on bun and it was taking too long

import fs from "fs";

const testinput = fs.readFileSync("./day5.input", "utf-8");

const seed2soil = new Map();
const soil2fertilizer = new Map();
const fertilizer2water = new Map();
const water2light = new Map();
const light2temperature = new Map();
const temperature2humidity = new Map();
const humidity2location = new Map();

const seeds = testinput
  .split("\n")[0]
  .split(": ")[1]
  .split(" ")
  .map((item) => Number(item));

const mapper = (i, map, listItem) => {
  return i
    .split("\n\n")
    [listItem].split("\n")
    .slice(1)
    .map((row) => {
      const r = row.split(" ").map((item) => Number(item));
      for (let i = 0; i < r[2]; i++) {
        map.set(r[1] + i, r[0] + i);
      }
    });
};

mapper(testinput, seed2soil, 1);
console.log("mapped seed2soil");
mapper(testinput, soil2fertilizer, 2);
console.log("mapped soil2fertilizer");
mapper(testinput, fertilizer2water, 3);
console.log("mapped fertilizer2water");
mapper(testinput, water2light, 4);
console.log("mapped water2light");
mapper(testinput, light2temperature, 5);
console.log("mapped light2temperature");
mapper(testinput, temperature2humidity, 6);
console.log("mapped temperature2humidity");
mapper(testinput, humidity2location, 7);
console.log("mapped humidity2location");

const seed2location = new Map();

const converter = (v, map) => {
  const result = map.get(v);
  if (result === undefined) {
    return v;
  }
  return result;
};

// console.log(converter(converter(79, seed2soil), soil2fertilizer));

const result = seeds
  .map((seed) => {
    const soil = converter(seed, seed2soil);
    const fertilizer = converter(soil, soil2fertilizer);
    const water = converter(fertilizer, fertilizer2water);
    const light = converter(water, water2light);
    const temperature = converter(light, light2temperature);
    const humidity = converter(temperature, temperature2humidity);
    const location = converter(humidity, humidity2location);
    return location;
  })
  .reduce((acc, item) => Math.min(acc, item), Infinity);
//result lowest : .reduce((acc, item) => Math.min(acc, item), Infinity)

console.log(result);
