import { input } from "./input";

export const isUnique = (input: string[]): boolean => {
  while (input.length > 1) {
    const char = input.pop();
    if (input.includes(char)) {
      return false;
    }
  }
  return true;
};

export const charactersToFirstMarker = (
  datastreamBuffer: string,
  markerLength: number
): number => {
  var searchWindow: string[] = [];
  const chars = datastreamBuffer.split("");

  for (let index = 0; index < chars.length; index++) {
    searchWindow.push(chars[index]);
    if (searchWindow.length <= markerLength) {
      continue;
    }
    searchWindow.shift();

    // Use slice to make a copy of the array here, else js
    // would pass by reference and mutate the original array
    if (isUnique(searchWindow.slice())) {
      return index + 1;
    }
  }
};

export const charactersToFirstStartOfPacketMarker = (
  datastreamBuffer: string
): number => {
  return charactersToFirstMarker(datastreamBuffer, 4);
};

export const charactersToFirstStartOfMessageMarker = (
  datastreamBuffer: string
): number => {
  return charactersToFirstMarker(datastreamBuffer, 14);
};

console.log(
  "The answer to part 1 is...",
  charactersToFirstStartOfPacketMarker(input)
);

console.log(
  "The answer to part 2 is...",
  charactersToFirstStartOfMessageMarker(input)
);
