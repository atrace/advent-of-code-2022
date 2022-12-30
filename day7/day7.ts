import { splitIntoLines } from "../shared/splitIntoLines";
import { input } from "./input";

export enum ItemType {
  file = "FILE",
  unsized_directory = "UNSIZED_DIRECTORY",
  sized_directory = "SIZED_DIRECTORY",
}

interface Item {
  name: string;
  itemType: ItemType;
}

export interface File extends Item {
  itemType: ItemType.file;
  size: number;
}

interface GenericDirectory extends Item {
  contents: { [key: string]: Directory | File };
}

export interface UnsizedDirectory extends GenericDirectory {
  itemType: ItemType.unsized_directory;
}

export interface SizedDirectory extends GenericDirectory {
  itemType: ItemType.sized_directory;
  size: number;
}

export type Directory = UnsizedDirectory | SizedDirectory;

export const parseDirectoryTree = (
  terminalOutput: string[],
  currentDirectory: UnsizedDirectory
): UnsizedDirectory => {
  var listing = false;

  while (terminalOutput.length > 0) {
    const line = terminalOutput.shift();

    if (line === "$ ls") {
      // Assumption: not possible to get two ls commands in a row (pls)
      listing = true;
      continue;
    }

    if (line == "$ cd ..") {
      listing = false;
      return currentDirectory;
    }

    if (line.startsWith("$ cd")) {
      listing = false;
      const destinationDir = line.split(" ")[2];

      currentDirectory.contents[destinationDir] = parseDirectoryTree(
        terminalOutput,
        {
          name: destinationDir,
          itemType: ItemType.unsized_directory,
          contents: {},
        }
      );
    }

    if (listing === true) {
      const childInfo = line.split(" ");

      // Assumption: if we don't cd into a directory, we don't want it in our tree :shrug:
      if (childInfo[0] !== "dir") {
        currentDirectory.contents[childInfo[1]] = {
          name: childInfo[1],
          itemType: ItemType.file,
          size: parseInt(childInfo[0]),
        };
      }
    }
  }

  return currentDirectory;
};

export const calculateDirectorySize = (
  directory: UnsizedDirectory
): SizedDirectory => {
  var directorySize = 0;

  for (const key in directory.contents) {
    var item = directory.contents[key];

    if (item.itemType === ItemType.unsized_directory) {
      item = calculateDirectorySize(item);
      directory.contents[key] = item;
    }
    directorySize += item.size;
  }

  return {
    ...directory,
    itemType: ItemType.sized_directory,
    size: directorySize,
  };
};

export const sumDirectoriesWithSizeUnder100000 = (
  directory: SizedDirectory
): number => {
  var sizesUnder100000 = 0;

  for (const key in directory.contents) {
    var item = directory.contents[key];

    switch (item.itemType) {
      case ItemType.file:
        break;
      case ItemType.sized_directory:
        if (item.size < 100000) {
          sizesUnder100000 += item.size;
        }
        sizesUnder100000 += sumDirectoriesWithSizeUnder100000(item);

        break;
      default:
        throw new Error(
          `WTF is this?? Name: ${item.name}, type: ${item.itemType}`
        );
    }
  }
  return sizesUnder100000;
};

export const part1 = (input: string[]): number => {
  // Assume it always starts with a root directory of "/"
  input.shift();
  const startingTree: UnsizedDirectory = {
    name: "/",
    itemType: ItemType.unsized_directory,
    contents: {},
  };

  const unsizedDirectoryTree = parseDirectoryTree(input, startingTree);
  const sizedDirectoryTree = calculateDirectorySize(unsizedDirectoryTree);

  return sumDirectoriesWithSizeUnder100000(sizedDirectoryTree);
};

export const calculateSpaceNeeded = (
  totalSpace: number,
  requiredUnusedSpace: number,
  directorySize: number
): number => {
  const currentUnusedSpace = totalSpace - directorySize;
  return requiredUnusedSpace - currentUnusedSpace;
};

export const getDirectorySizesAboveThresholdSize = (
  directory: SizedDirectory,
  thresholdSize: number
): number[] => {
  var sufficientDirectorySizes: number[] = [];

  if (directory.size >= thresholdSize) {
    sufficientDirectorySizes.push(directory.size);
  }

  for (const key in directory.contents) {
    var item = directory.contents[key];

    switch (item.itemType) {
      case ItemType.file:
        break;
      case ItemType.sized_directory:
        if (item.size >= thresholdSize) {
          sufficientDirectorySizes.push(item.size);
        }
        sufficientDirectorySizes = sufficientDirectorySizes.concat(
          getDirectorySizesAboveThresholdSize(item, thresholdSize)
        );

        break;
      default:
        throw new Error(
          `WTF is this?? Name: ${item.name}, type: ${item.itemType}`
        );
    }
  }
  return sufficientDirectorySizes;
};

export const spaceFreedByDeletingSmallestSuffcientDirectory = (
  directory: SizedDirectory,
  spaceNeeded: number
): number => {
  const sufficientDirectories = getDirectorySizesAboveThresholdSize(
    directory,
    spaceNeeded
  );
  console.log("🚀 ~ sufficientDirectories", sufficientDirectories);

  sufficientDirectories.sort((a, b) => {
    return a - b;
  });
  console.log("🚀 ~ sufficientDirectories", sufficientDirectories);

  return sufficientDirectories[0];
};

export const part2 = (input: string[]): number => {
  // Assume it always starts with a root directory of "/"
  input.shift();
  const startingTree: UnsizedDirectory = {
    name: "/",
    itemType: ItemType.unsized_directory,
    contents: {},
  };

  const unsizedDirectoryTree = parseDirectoryTree(input, startingTree);
  const sizedDirectoryTree = calculateDirectorySize(unsizedDirectoryTree);

  const totalSpace = 70000000;
  const requiredUnusedSpace = 30000000;
  const directorySize = sizedDirectoryTree.size;
  const spaceNeeded = calculateSpaceNeeded(
    totalSpace,
    requiredUnusedSpace,
    directorySize
  );
  console.log("🚀 ~ spaceNeeded", spaceNeeded);

  return spaceFreedByDeletingSmallestSuffcientDirectory(
    sizedDirectoryTree,
    spaceNeeded
  );
};

// console.log("The answer to part 1 is...", part1(splitIntoLines(input)));
console.log("The answer to part 2 is...", part2(splitIntoLines(input)));
