import { input } from "./input";

export const getCompartments = (bagContents: string) => {
  const halfway = bagContents.length / 2;
  const compartment1 = bagContents.substring(0, halfway);
  const compartment2 = bagContents.substring(halfway, bagContents.length);
  return { compartment1, compartment2 };
};

export const getSharedItem = (compartment1: string, compartment2: string) => {
  for (let index = 0; index < compartment1.length; index++) {
    const searchItem = compartment1[index];
    if (compartment2.includes(searchItem)) return searchItem;
  }
};

export const itemToPriority = (item: string): number =>
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(item) + 1;

export const day3 = (bags: string[]): number => {
  var totalPriorities = 0;
  bags.forEach((bag) => {
    const compartments = getCompartments(bag.trim());
    const sharedItem = getSharedItem(
      compartments.compartment1,
      compartments.compartment2
    );
    const priority = itemToPriority(sharedItem);
    totalPriorities += priority;
  });
  return totalPriorities;
};

export const splitIntoLines = (chunk: string): string[] => {
  return chunk.split("\n");
};

console.log("And the answer is...", day3(splitIntoLines(input)));
