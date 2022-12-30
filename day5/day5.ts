import { splitIntoLines } from "../shared/splitIntoLines";
import { input } from "./input";

export const readStartingRow = (
  startingStacks: string[][],
  row: string
): string[][] => {
  for (let index = 0; index < row.length; index++) {
    const char = row[index];
    if ([" ", "[", "]"].includes(char)) {
      continue;
    }
    startingStacks[(index - 1) / 4].unshift(char);
  }
  return startingStacks;
};

export const readStartingStacks = (input: string[]): string[][] => {
  var startingStacks: string[][] = [];
  for (let index = 0; index < input[0].length; index += 4) {
    startingStacks.push([]);
  }

  input.forEach((row) => {
    startingStacks = readStartingRow(startingStacks, row);
  });

  return startingStacks;
};

interface Instruction {
  quantity: number;
  sourceStack: number;
  targetStack: number;
}

export const readInstruction = (instruction: string): Instruction => {
  if (!instruction.match(/^move \d+ from \d+ to \d+$/)) {
    throw new Error(`Cannot read instruction: ${instruction}`);
  }

  const splitInstruction = instruction.split(" ");

  const quantity = parseInt(splitInstruction[1]);
  const sourceStack = parseInt(splitInstruction[3]);
  const targetStack = parseInt(splitInstruction[5]);

  return { quantity, sourceStack, targetStack };
};

export const processInstructionCrateMover9000 = (
  stacks: string[][],
  instruction: Instruction
): string[][] => {
  for (let index = 0; index < instruction.quantity; index++) {
    const crate = stacks[instruction.sourceStack - 1].pop();
    stacks[instruction.targetStack - 1].push(crate);
  }
  return stacks;
};

export const getTopCrates = (stacks: string[][]): string => {
  var topCrates = "";
  stacks.forEach((stack) => {
    topCrates += stack.at(-1);
  });

  return topCrates;
};

export const part1 = (input: string[]): string => {
  const startingInput = input.slice(0, input.indexOf("") - 1);
  var stacks = readStartingStacks(startingInput);

  const instructionInput = input.slice(input.indexOf("") + 1);
  instructionInput.forEach((instructionRow) => {
    const instruction = readInstruction(instructionRow);
    stacks = processInstructionCrateMover9000(stacks, instruction);
  });

  return getTopCrates(stacks);
};

export const processInstructionCrateMover9001 = (
  stacks: string[][],
  instruction: Instruction
): string[][] => {
  const crates = stacks[instruction.sourceStack - 1].splice(
    -instruction.quantity
  );
  stacks[instruction.targetStack - 1] =
    stacks[instruction.targetStack - 1].concat(crates);

  return stacks;
};

export const part2 = (input: string[]): string => {
  const startingInput = input.slice(0, input.indexOf("") - 1);
  var stacks = readStartingStacks(startingInput);

  const instructionInput = input.slice(input.indexOf("") + 1);
  instructionInput.forEach((instructionRow) => {
    const instruction = readInstruction(instructionRow);
    stacks = processInstructionCrateMover9001(stacks, instruction);
  });

  return getTopCrates(stacks);
};

console.log("The answer to part 1 is...", part1(splitIntoLines(input)));
console.log("The answer to part 2 is...", part2(splitIntoLines(input)));
