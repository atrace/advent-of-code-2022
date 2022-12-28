import {
  getCompartments,
  getSharedItems,
  getSharedItemsForMultiple,
  itemToPriority,
  part1,
  part2,
} from "./day3";

describe("getCompartments", () => {
  it.each([
    ["vJrwpWtwJgWrhcsFMMfFFhFp", "vJrwpWtwJgWr", "hcsFMMfFFhFp"],
    [
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "jqHRNqRjqzjGDLGL",
      "rsFMfFZSrLrFZsSL",
    ],
    ["PmmdzqPrVvPwwTWBwg", "PmmdzqPrV", "vPwwTWBwg"],
  ])(
    "should split bag %p input up into compartments %p and %p",
    (bag, expectedCompartment1, expectedCompartment2) => {
      // Arrange / Act
      const result = getCompartments(bag);

      // Assert
      expect(result.compartment1).toEqual(expectedCompartment1);
      expect(result.compartment2).toEqual(expectedCompartment2);
    }
  );
});

describe("getSharedItems", () => {
  it("should get the single shared letter from both compartments", () => {
    // Arrange
    const compartment1 = "vJrwpWtwJgWr";
    const compartment2 = "hcsFMMfFFhFp";

    // Act
    const result = getSharedItems(compartment1, compartment2);

    // Assert
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual("p");
  });
});

describe("getSharedItemsBetweenBags", () => {
  it.each([
    [
      "r",
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
    ],
    [
      "Z",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ],
  ])(
    "should get the single shared letter %p from 3 elves' bags",
    (expectedSharedItem, bag1, bag2, bag3) => {
      // Arrange / Act
      const result = getSharedItemsForMultiple([bag1, bag2, bag3]);

      // Assert
      console.log("🚀 ~ result", result);
      expect(result[0]).toEqual(expectedSharedItem);
      expect(result.length).toEqual(1);
    }
  );
});

describe("itemToPriority", () => {
  it.each([
    ["a", 1],
    ["A", 27],
    ["z", 26],
    ["Z", 52],
    ["p", 16],
    ["L", 38],
    ["P", 42],
    ["v", 22],
  ])("should, for item %p, return priority %p", (item, priority) => {
    expect(itemToPriority(item)).toEqual(priority);
  });
});

describe("part1", () => {
  it("should calculate the sum of the priorities of shared items per bag", () => {
    // Arrange
    const bags = [
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ];

    // Act / Assert
    expect(part1(bags)).toEqual(157);
  });
});

describe("part2", () => {
  it("should calculate the sum of the priorities of shared items between 3 elves' bags", () => {
    // Arrange
    const bags = [
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ];

    // Act / Assert
    expect(part2(bags)).toEqual(70);
  });
});
