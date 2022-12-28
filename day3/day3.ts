import { input } from "./input";

export const getCompartments = (bagContents: string) => {
  const halfway = bagContents.length / 2;
  const compartment1 = bagContents.substring(0, halfway);
  const compartment2 = bagContents.substring(halfway, bagContents.length);
  return { compartment1, compartment2 };
};

export const getSharedItems = (
  compartment1: string,
  compartment2: string
): string[] => {
  var sharedItems = [];
  for (let index = 0; index < compartment1.length; index++) {
    const searchItem = compartment1[index];
    if (
      compartment2.includes(searchItem) &&
      !sharedItems.includes(searchItem)
    ) {
      sharedItems.push(searchItem);
    }
  }
  return sharedItems;
};

export const getSharedItemsForMultiple = (bags: string[]): string[] => {
  var sharedItems = [bags.pop()];

  bags.forEach((bag) => {
    const sharedItemsString = sharedItems.join("");
    sharedItems = getSharedItems(sharedItemsString, bag);
  });

  return sharedItems;
};

export const itemToPriority = (item: string): number =>
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(item) + 1;

export const splitIntoLines = (chunk: string): string[] => {
  return chunk.split("\n");
};

export const part1 = (bags: string[]): number => {
  var totalPriorities = 0;
  bags.forEach((bag) => {
    const compartments = getCompartments(bag.trim());
    const sharedItem = getSharedItems(
      compartments.compartment1,
      compartments.compartment2
    )[0];
    const priority = itemToPriority(sharedItem);
    totalPriorities += priority;
  });
  return totalPriorities;
};

export const part2 = (bags: string[]): number => {
  var totalPriorities = 0;
  for (let index = 0; index < bags.length; index += 3) {
    const groupBags = bags.slice(index, index + 3);
    const badgeItem = getSharedItemsForMultiple(groupBags);

    const priority = itemToPriority(badgeItem[0]);
    totalPriorities += priority;
  }
  return totalPriorities;
};

console.log("And the answer for part 1 is...", part1(splitIntoLines(input)));
console.log("And the answer for part 2 is...", part2(splitIntoLines(input)));
