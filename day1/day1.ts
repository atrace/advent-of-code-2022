import * as events from "events";
import * as fs from "fs";
import * as readline from "readline";

const state: { currentCount: number; previousCounts: number[] } = {
  currentCount: 0,
  previousCounts: [],
};

interface ProcessLineByLineProps {
  fileName: string;
  processLine: (line: string) => void;
}

const processLineByLine = async ({
  fileName,
  processLine,
}: ProcessLineByLineProps) => {
  console.log("foo2");
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(fileName),
      crlfDelay: Infinity,
    });

    rl.on("line", processLine);

    await events.once(rl, "close");

    console.log("Reading file line by line with readline done.");
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB`
    );
  } catch (err) {
    console.error(err);
  }
  console.log("foo3");
  state.previousCounts.sort((a, b) => {
    return b - a;
  });
  console.log("Top calorie elf:", state.previousCounts[0]);

  console.log(
    "Sum of the top 3 caloried elves:",
    state.previousCounts[0] + state.previousCounts[1] + state.previousCounts[2]
  );
};

console.log("foo");

const thisDoesAThing = (line: string) => {
  console.log(`Line from file: ${line}`);

  if (line.length === 0) {
    state.previousCounts.push(state.currentCount);
    state.currentCount = 0;
    return;
  }

  state.currentCount += parseInt(line);
  console.log(state);
};

processLineByLine({
  fileName: "./day1/input.txt",
  processLine: thisDoesAThing,
});
console.log("helloooo?");
