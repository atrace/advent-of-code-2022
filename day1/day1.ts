import { processLineByLine } from "../shared/fileReader";

const state: { currentCount: number; previousCounts: number[] } = {
  currentCount: 0,
  previousCounts: [],
};

console.log("foo");

const processLine = (line: string) => {
  console.log(`Line from file: ${line}`);

  if (line.length === 0) {
    state.previousCounts.push(state.currentCount);
    state.currentCount = 0;
    return;
  }

  state.currentCount += parseInt(line);
  console.log(state);
};

const doSomeStuffWithStateAtTheEnd = () => {
  state.previousCounts.sort((a, b) => {
    return b - a;
  });
  console.log("Top calorie elf:", state.previousCounts[0]);

  console.log(
    "Sum of the top 3 caloried elves:",
    state.previousCounts[0] + state.previousCounts[1] + state.previousCounts[2]
  );
};

processLineByLine({
  fileName: "./day1/input.txt",
  processLine,
  doSomeStuffWithStateAtTheEnd,
});
console.log("helloooo?");
