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

export const charactersToFirstMarker = (datastreamBuffer: string): number => {
  var lastFourCharacters: string[] = [];
  const chars = datastreamBuffer.split("");

  for (let index = 0; index < chars.length; index++) {
    lastFourCharacters.push(chars[index]);
    if (lastFourCharacters.length <= 4) {
      continue;
    }
    lastFourCharacters.shift();

    if (isUnique(lastFourCharacters.slice())) {
      return index + 1;
    }
  }
};

console.log("The answer to part 1 is...", charactersToFirstMarker(input));
