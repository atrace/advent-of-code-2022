import {
  day3,
  getCompartments,
  getSharedItem,
  itemToPriority,
  splitIntoLines,
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

describe("getShared", () => {
  it("should get the shared letter from both compartments", () => {
    // Arrange
    const compartment1 = "vJrwpWtwJgWr";
    const compartment2 = "hcsFMMfFFhFp";

    // Act
    const result = getSharedItem(compartment1, compartment2);

    // Assert
    expect(result).toEqual("p");
  });
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

describe("splitIntoLines", () => {
  it("should split a chunk into lines", () => {
    // Arrange
    const chunk = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

    // Act / Assert
    expect(splitIntoLines(chunk)).toEqual([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ]);
  });
});

describe("day3", () => {
  it("should calculate the sum of the priorities of shared items", () => {
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
    expect(day3(bags)).toEqual(157);
  });
});
