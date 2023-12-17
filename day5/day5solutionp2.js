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

const inverseConverter = (v, map) => {
  let out = v;
  map.forEach((item) => {
    if (item.dest <= v && v < item.dest + item.range) {
      out = item.src + (v - item.dest);
    }
  });

  return out;
};

const location2seed = (v) => {
  const humidity = inverseConverter(v, humidity2location);
  const temperature = inverseConverter(humidity, temperature2humidity);
  const light = inverseConverter(temperature, light2temperature);
  const water = inverseConverter(light, water2light);
  const fertilizer = inverseConverter(water, fertilizer2water);
  const soil = inverseConverter(fertilizer, soil2fertilizer);
  const seed = inverseConverter(soil, seed2soil);

  return seed;
};

const isInPairRange = (v) => {
  return pairs.some((pair) => pair[0] <= v && v <= pair[0] + pair[1]);
};

let result = 0;

while (!isInPairRange(location2seed(result))) {
  result++;
}

console.log(result);
