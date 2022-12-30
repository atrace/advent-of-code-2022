import {
  calculateDirectorySize,
  calculateSpaceNeeded,
  Directory,
  ItemType,
  parseDirectoryTree,
  part1,
  part2,
  SizedDirectory,
  spaceFreedByDeletingSmallestSuffcientDirectory,
  sumDirectoriesWithSizeUnder100000,
  UnsizedDirectory,
} from "./day7";

const testInput = [
  "$ cd /",
  "$ ls",
  "dir a",
  "14848514 b.txt",
  "8504156 c.dat",
  "dir d",
  "$ cd a",
  "$ ls",
  "dir e",
  "29116 f",
  "2557 g",
  "62596 h.lst",
  "$ cd e",
  "$ ls",
  "584 i",
  "$ cd ..",
  "$ cd ..",
  "$ cd d",
  "$ ls",
  "4060174 j",
  "8033020 d.log",
  "5626152 d.ext",
  "7214296 k",
];

const expectedUnsizedTestStructure: Directory = {
  name: "/",
  itemType: ItemType.unsized_directory,
  contents: {
    a: {
      name: "a",
      itemType: ItemType.unsized_directory,
      contents: {
        e: {
          name: "e",
          itemType: ItemType.unsized_directory,
          contents: { i: { name: "i", itemType: ItemType.file, size: 584 } },
        },
        f: { name: "f", itemType: ItemType.file, size: 29116 },
        g: { name: "g", itemType: ItemType.file, size: 2557 },
        "h.lst": { name: "h.lst", itemType: ItemType.file, size: 62596 },
      },
    },
    "b.txt": { name: "b.txt", itemType: ItemType.file, size: 14848514 },
    "c.dat": { name: "c.dat", itemType: ItemType.file, size: 8504156 },
    d: {
      name: "d",
      itemType: ItemType.unsized_directory,
      contents: {
        j: { name: "j", itemType: ItemType.file, size: 4060174 },
        "d.log": { name: "d.log", itemType: ItemType.file, size: 8033020 },
        "d.ext": { name: "d.ext", itemType: ItemType.file, size: 5626152 },
        k: { name: "k", itemType: ItemType.file, size: 7214296 },
      },
    },
  },
};

const sizedTestDirectory: SizedDirectory = {
  name: "/",
  itemType: ItemType.sized_directory,
  contents: {
    a: {
      name: "a",
      itemType: ItemType.sized_directory,
      contents: {
        e: {
          name: "e",
          itemType: ItemType.sized_directory,
          contents: {
            i: { name: "i", itemType: ItemType.file, size: 584 },
          },
          size: 584,
        },
        f: { name: "f", itemType: ItemType.file, size: 29116 },
        g: { name: "g", itemType: ItemType.file, size: 2557 },
        "h.lst": { name: "h.lst", itemType: ItemType.file, size: 62596 },
      },
      size: 94853,
    },
    "b.txt": { name: "b.txt", itemType: ItemType.file, size: 14848514 },
    "c.dat": { name: "c.dat", itemType: ItemType.file, size: 8504156 },
    d: {
      name: "d",
      itemType: ItemType.sized_directory,
      contents: {
        j: { name: "j", itemType: ItemType.file, size: 4060174 },
        "d.log": { name: "d.log", itemType: ItemType.file, size: 8033020 },
        "d.ext": { name: "d.ext", itemType: ItemType.file, size: 5626152 },
        k: { name: "k", itemType: ItemType.file, size: 7214296 },
      },
      size: 24933642,
    },
  },
  size: 48381165,
};

describe("parseCommand", () => {
  it("should correctly interpret a cd command", () => {});
});

describe("parseDirectoryTree", () => {
  it("should parse a terminal output into a directory structure", () => {
    // Arrange
    const startingTree: UnsizedDirectory = {
      name: "/",
      itemType: ItemType.unsized_directory,
      contents: {},
    };

    // Act/ Assert
    expect(parseDirectoryTree(testInput.slice(1), startingTree)).toEqual(
      expectedUnsizedTestStructure
    );
  });
});

describe("calculateDirectorySize", () => {
  it.each([
    [
      "e",
      584,
      {
        name: "e",
        itemType: ItemType.unsized_directory,
        contents: { i: { name: "i", itemType: ItemType.file, size: 584 } },
      },
    ],
    [
      "a",
      94853,
      {
        name: "a",
        itemType: ItemType.unsized_directory,
        contents: {
          e: {
            name: "e",
            itemType: ItemType.unsized_directory,
            contents: { i: { name: "i", itemType: ItemType.file, size: 584 } },
          },
          f: { name: "f", itemType: ItemType.file, size: 29116 },
          g: { name: "g", itemType: ItemType.file, size: 2557 },
          "h.lst": { name: "h.lst", itemType: ItemType.file, size: 62596 },
        },
      },
    ],
    [
      "d",
      24933642,
      {
        name: "d",
        itemType: ItemType.unsized_directory,
        contents: {
          j: { name: "j", itemType: ItemType.file, size: 4060174 },
          "d.log": { name: "d.log", itemType: ItemType.file, size: 8033020 },
          "d.ext": { name: "d.ext", itemType: ItemType.file, size: 5626152 },
          k: { name: "k", itemType: ItemType.file, size: 7214296 },
        },
      },
    ],
    ["/", 48381165, expectedUnsizedTestStructure],
  ])(
    "should calculate directory %p size as %p",
    (_directoryName, expectedSize, directoryStructure) => {
      const sizedDirectory = calculateDirectorySize(
        directoryStructure as UnsizedDirectory
      );

      expect(sizedDirectory.size).toEqual(expectedSize);
    }
  );
});

describe("sumDirectoriesWithSizeUnder100000", () => {
  it("should correctly sum the sizes of all directories under 100000", () => {
    expect(sumDirectoriesWithSizeUnder100000(sizedTestDirectory)).toEqual(
      95437
    );
  });
});

describe("part1", () => {
  it("should correctly calculate total directory size for directories under 100000 for a given terminal output", () => {
    expect(part1(testInput.slice())).toEqual(95437);
  });
});

describe("calculateSpaceNeeded", () => {
  it("should figure out the minimum directory size that would free up enough space for the update", () => {
    const totalSpace = 70000000;
    const requiredUnusedSpace = 30000000;
    const directorySize = sizedTestDirectory.size;
    expect(
      calculateSpaceNeeded(totalSpace, requiredUnusedSpace, directorySize)
    ).toEqual(8381165);
  });
});

describe("spaceFreedByDeletingSmallestSuffcientDirectory", () => {
  it("should calculate the smallest sufficient directory size to free up 8381165", () => {
    expect(
      spaceFreedByDeletingSmallestSuffcientDirectory(
        sizedTestDirectory,
        8381165
      )
    ).toEqual(24933642);
  });
});

describe("part2", () => {
  it("should correctly calculate total directory size for directories under 100000 for a given terminal output", () => {
    expect(part2(testInput.slice())).toEqual(24933642);
  });
});
