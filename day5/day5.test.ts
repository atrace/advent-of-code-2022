import {
  getTopCrates,
  part1,
  part2,
  readInstruction,
  readStartingRow,
  readStartingStacks,
} from "./day5";

const testInputArray = [
  "    [D]    ",
  "[N] [C]    ",
  "[Z] [M] [P]",
  " 1   2   3 ",
  "",
  "move 1 from 2 to 1",
  "move 3 from 1 to 3",
  "move 2 from 2 to 1",
  "move 1 from 1 to 2",
];

describe("readStartingStacks", () => {
  it("should correctly interpret the whole starting stack", () => {
    // Arrange
    const startingStacksInput = ["    [D]    ", "[N] [C]    ", "[Z] [M] [P]"];

    // Act
    const result = readStartingStacks(startingStacksInput);

    // Assert
    expect(result).toEqual([["Z", "N"], ["M", "C", "D"], ["P"]]);
  });

  describe("readStartingRow", () => {
    it.each([
      ["    [D]    ", [[], ["D"], []]],
      ["[N] [C]    ", [["N"], ["C"], []]],
      ["[Z] [M] [P]", [["Z"], ["M"], ["P"]]],
    ])("should correctly interpret a row '%p'", (rowInput, expected) => {
      // Arrange / Act
      const result = readStartingRow([[], [], []], rowInput);

      // Assert
      expect(result).toEqual(expected);
    });
  });
});

describe("readInstruction", () => {
  it.each([
    ["move 1 from 2 to 1", 1, 2, 1],
    ["move 3 from 1 to 3", 3, 1, 3],
    ["move 2 from 23 to 1", 2, 23, 1],
    ["move 10 from 1 to 12", 10, 1, 12],
  ])(
    "should return the quantity, source stack, and target stack for a given string instruction",
    (instruction, quantity, sourceStack, targetStack) => {
      // Arrange / Act
      const result = readInstruction(instruction);

      // Assert
      expect(result).toEqual({ quantity, sourceStack, targetStack });
    }
  );

  it("should throw if instruction is in wrong order", () => {
    // Arrange
    const instruction = "from 10 to 2 move 17";

    const act = () => readInstruction(instruction);

    // Act / Assert
    expect(act).toThrow(
      new Error(`Cannot read instruction: from 10 to 2 move 17`)
    );
  });

  it("should throw if instruction is completely invalid", () => {
    // Arrange
    const instruction = "foobar 123456 jgfkdalg gjfi65754 567";

    const act = () => readInstruction(instruction);

    // Act / Assert
    expect(act).toThrow(
      new Error(`Cannot read instruction: foobar 123456 jgfkdalg gjfi65754 567`)
    );
  });
});

describe("getTopCrates", () => {
  it("should get the top crates of a given stack input", () => {
    /* Represents the following stack set up:
    [D]        
    [N] [C]    
    [Z] [M] [P]
    1   2   3 
    */

    // Arrange
    const stacks = [["Z", "N", "D"], ["M", "C"], ["P"]];

    // Act / Assert
    expect(getTopCrates(stacks)).toEqual("DCP");
  });
});

describe("part1", () => {
  it("should correctly identify the top crates of each stack from a full input", () => {
    expect(part1(testInputArray)).toEqual("CMZ");
  });
});

describe("part2", () => {
  it("should correctly identify the top crates of each stack from a full input", () => {
    expect(part2(testInputArray)).toEqual("MCD");
  });
});
