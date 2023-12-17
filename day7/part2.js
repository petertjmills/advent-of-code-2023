import fs from "fs";

// const testinput = `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`;
const testinput = fs.readFileSync("./input", "utf-8");

const cardmap = "J.23456789TQKA".split("");

const strengths = (card) => {
  // card eg 32T3K should return [1, 0, 8, 1, 11]
  return card.split("").map((item) => cardmap.indexOf(item));
};

const type = (strengths) => {
  // highest number of same card
  const same = strengths.reduce((acc, item) => {
    acc[item] = acc[item] + 1 || 1;
    return acc;
  }, {});

  return Math.max(...Object.values(same));
};

// console.log(type(strengths("32T3K")));
const newTypeTest = (pair) => {
  let cards = {};
  let js = 0;

  pair[0].split("").forEach((x) => {
    if (x !== "J") {
      !cards[x] ? (cards[x] = 1) : cards[x]++;
    } else {
      js++;
    }
  });

  // redistribute j
  // remove j from cards
  let cardType = Object.values(cards).sort((a, b) => b - a);

  // cardType[0] += js;
  cardType[0] ? (cardType[0] += js) : (cardType[0] = js);

  if (cardType[0] === 5) {
    return 6;
  } else if (cardType[0] === 4) {
    return 5;
  } else if (cardType[0] === 3 && cardType[1] === 2) {
    return 4;
  } else if (cardType[0] === 3 && cardType[1] === 1) {
    return 3;
  } else if (cardType[0] === 2 && cardType[1] === 2) {
    return 2;
  } else if (cardType[0] === 2 && cardType[1] === 1) {
    return 1;
  } else {
    return 0;
  }
};

const input = testinput.split("\n").map(
  (item) =>
    new Object({
      card: item.split(" ")[0],
      bet: Number(item.split(" ")[1]),
      strengths: strengths(item.split(" ")[0]),
      type: type(strengths(item.split(" ")[0])),
      newType: newTypeTest(item.split(" ")),
    })
);

const compareStrengths = (strengths1, strengths2) => {
  for (let i = 0; i < strengths1.length; i++) {
    if (strengths1[i] > strengths2[i]) {
      return 1;
    } else if (strengths1[i] < strengths2[i]) {
      return -1;
    }
  }

  return 0;
};

const compareTypes = (type1, type2) => {
  if (type1 > type2) {
    return 1;
  } else if (type1 < type2) {
    return -1;
  } else {
    return 0;
  }
};

const compare = (card1, card2) => {
  if (compareTypes(card1.newType, card2.newType) === 0) {
    return compareStrengths(card1.strengths, card2.strengths);
  } else {
    return compareTypes(card1.newType, card2.newType);
  }
};

const result = input
  .toSorted(compare)
  .reduce((acc, item, idx) => acc + item.bet * (idx + 1), 0);
// .map((item, idx) => item.bet * (idx + 1))
// .reduce((acc, item) => acc + item, 0);

// console.log(result);
// console.log(input);
// duplicate cards in input

console.log(result);
