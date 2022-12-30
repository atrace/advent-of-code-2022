import {
  charactersToFirstStartOfMessageMarker,
  charactersToFirstStartOfPacketMarker,
  isUnique,
} from "./day6";

describe("isUnique", () => {
  it("should return false when duplicates present", () => {
    // Arrange
    const input = ["m", "j", "q", "j"];

    // Act
    const result = isUnique(input);

    // Assert
    expect(result).toEqual(false);
  });

  it("should return true when unique string provided", () => {
    // Arrange
    const input = ["j", "p", "q", "m"];

    // Act
    const result = isUnique(input);

    // Assert
    expect(result).toEqual(true);
  });
});

describe("charactersToFirstStartOfPacketMarker", () => {
  it.each([
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
    ["nppdvjthqldpwncqszvftbrmjlhg", 6],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11],
  ])(
    "should identify first packet marker in %p after %p characters",
    (datastreamBuffer, expected) => {
      expect(charactersToFirstStartOfPacketMarker(datastreamBuffer)).toBe(
        expected
      );
    }
  );
});

describe("charactersToFirstStartOfMessageMarker", () => {
  it.each([
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 19],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 23],
    ["nppdvjthqldpwncqszvftbrmjlhg", 23],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 29],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 26],
  ])(
    "should identify first message marker in %p after %p characters",
    (datastreamBuffer, expected) => {
      expect(charactersToFirstStartOfMessageMarker(datastreamBuffer)).toBe(
        expected
      );
    }
  );
});
