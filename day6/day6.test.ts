import { charactersToFirstMarker, isUnique } from "./day6";

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

describe("charactersToFirstMarker", () => {
  it.each([
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
    ["nppdvjthqldpwncqszvftbrmjlhg", 6],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11],
  ])(
    "should identify first marker in %p after %p characters",
    (datastreamBuffer, expected) => {
      expect(charactersToFirstMarker(datastreamBuffer)).toBe(expected);
    }
  );
});
