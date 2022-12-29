import {
  AssignmentRange,
  getAssignments,
  getOverlap,
  isFullyOverlapped,
  part1,
  part2,
} from "./day4";

describe("getAssignments", () => {
  it("should return numerical assignment range for a given string input", () => {
    // Arrange
    const assignmentInput = "2-4";

    // Act
    const result = getAssignments(assignmentInput);

    // Assert
    expect(result).toEqual([2, 4]);
  });

  it("should throw if input is of incorrect format", () => {
    // Arrange
    const assignmentInput = "2-";
    const test = () => getAssignments(assignmentInput);

    // Act / Assert
    expect(test).toThrow(new Error("Invalid assignment input 2-"));
  });
});

describe("getOverlap", () => {
  it("should identy no overlap for distinct pairs", () => {
    // Arrange
    const assignment1: AssignmentRange = [2, 4];
    const assignment2: AssignmentRange = [6, 8];

    // Act
    const result = getOverlap(assignment1, assignment2);

    // Assert
    expect(result).toBeUndefined();
  });

  it("should identy overlap for lower overlapping pairs", () => {
    // Arrange
    const assignment1: AssignmentRange = [5, 7];
    const assignment2: AssignmentRange = [7, 9];

    // Act
    const result = getOverlap(assignment1, assignment2);

    // Assert
    expect(result).toEqual([7, 7]);
  });

  it("should identy overlap for upper overlapping pairs", () => {
    // Arrange
    const assignment1: AssignmentRange = [6, 8];
    const assignment2: AssignmentRange = [4, 6];

    // Act
    const result = getOverlap(assignment1, assignment2);

    // Assert
    expect(result).toEqual([6, 6]);
  });

  it("should identy overlap for fully containing pairs", () => {
    // Arrange
    const assignment1: AssignmentRange = [2, 8];
    const assignment2: AssignmentRange = [3, 7];

    // Act
    const result = getOverlap(assignment1, assignment2);

    // Assert
    expect(result).toEqual([3, 7]);
  });

  it("should identy overlap for fully containing pairs with an aligned boundary", () => {
    // Arrange
    const assignment1: AssignmentRange = [2, 7];
    const assignment2: AssignmentRange = [3, 7];

    // Act
    const result = getOverlap(assignment1, assignment2);

    // Assert
    expect(result).toEqual([3, 7]);
  });
});

describe("isFullyOverlapped", () => {
  it.each([
    [true, [2, 8], [3, 7]],
    [true, [6, 6], [4, 6]],
    [true, [6, 10], [4, 12]],
    [false, [2, 4], [6, 8]],
  ])(
    "should return %p for a pair of ranges %p %p",
    (expected, assignment1, assignment2) => {
      // Act
      const result = isFullyOverlapped(
        assignment1 as AssignmentRange,
        assignment2 as AssignmentRange
      );

      // Assert
      expect(result).toEqual(expected);
    }
  );
});

describe("part1", () => {
  it("should identify two fully overlapped pairs", () => {
    // Arrange
    const input = [
      "2-4,6-8",
      "2-3,4-5",
      "5-7,7-9",
      "2-8,3-7",
      "6-6,4-6",
      "2-6,4-8",
    ];

    // Act
    const result = part1(input);

    // Assert
    expect(result).toEqual(2);
  });
});

describe("part1", () => {
  it("should identify two fully overlapped pairs", () => {
    // Arrange
    const input = [
      "2-4,6-8",
      "2-3,4-5",
      "5-7,7-9",
      "2-8,3-7",
      "6-6,4-6",
      "2-6,4-8",
    ];

    // Act
    const result = part2(input);

    // Assert
    expect(result).toEqual(4);
  });
});
