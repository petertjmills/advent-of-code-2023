// Too slow

import fs from "fs";

const testinput = fs.readFileSync("./day5.input", "utf-8");

const seeds = testinput
  .split("\n")[0]
  .split(": ")[1]
  .split(" ")
  .map((item) => Number(item));

// seeds to pairs [[79, 14], [55, 13]]
const pairs = seeds.reduce((acc, item, index) => {
  if (index % 2 === 0) {
    acc.push([item]);
  } else {
    acc[acc.length - 1].push(item);
  }
  return acc;
}, []);

const mapper = (i, listItem) => {
  return i
    .split("\n\n")
    [listItem].split("\n")
    .slice(1)
    .map((r) => r.split(" ").map((item) => Number(item)))
    .map((r) => {
      return {
        dest: r[0],
        src: r[1],
        range: r[2],
      };
    });
};

const seed2soil = mapper(testinput, 1);
const soil2fertilizer = mapper(testinput, 2);
const fertilizer2water = mapper(testinput, 3);
const water2light = mapper(testinput, 4);
const light2temperature = mapper(testinput, 5);
const temperature2humidity = mapper(testinput, 6);
const humidity2location = mapper(testinput, 7);

const converter = (v, map) => {
  let out = v;
  map.forEach((item) => {
    if (item.src <= v && v < item.src + item.range) {
      out = item.dest + (v - item.src);
    }
  });

  return out;
};

// const test = (seed) => {
//     const soil = converter(seed, seed2soil);
//     const fertilizer = converter(soil, soil2fertilizer);
//     const water = converter(fertilizer, fertilizer2water);
//     const light = converter(water, water2light);
//     const temperature = converter(light, light2temperature);
//     const humidity = converter(temperature, temperature2humidity);
//     const location = converter(humidity, humidity2location);

//     return location;
//   }

const result = pairs
  .slice(0, 1)
  .map((pair) => {
    // const out = [];
    // for (let i = 0; i < pair[1]; i++) {
    //   console.log(i);
    //   const soil = converter(pair[0] + i, seed2soil);
    //   const fertilizer = converter(soil, soil2fertilizer);
    //   const water = converter(fertilizer, fertilizer2water);
    //   const light = converter(water, water2light);
    //   const temperature = converter(light, light2temperature);
    //   const humidity = converter(temperature, temperature2humidity);
    //   const location = converter(humidity, humidity2location);
    //   out.push(location);
    // }
    // return out;
    const arr = Array.from({ length: pair[1] }, (_, i) => i + 1);

    const o = arr.map((item) => {
      const soil = converter(pair[0] + item, seed2soil);
      const fertilizer = converter(soil, soil2fertilizer);
      const water = converter(fertilizer, fertilizer2water);
      const light = converter(water, water2light);
      const temperature = converter(light, light2temperature);
      const humidity = converter(temperature, temperature2humidity);
      const location = converter(humidity, humidity2location);
      return location;
    });
    return o;

    // const o = pair.
  })
  .flat()
  .reduce((acc, item) => Math.min(acc, item), Infinity);

console.log(result);
// console.log(test(82));
// console.log(light2temperature)
// console.log(converter(77, light2temperature))
