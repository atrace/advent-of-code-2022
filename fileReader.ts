import * as events from "events";
import * as fs from "fs";
import * as readline from "readline";

interface ProcessLineByLineProps {
  fileName: string;
  processLine: (line: string) => void;
  doSomeStuffWithStateAtTheEnd: () => void;
}

export const processLineByLine = async ({
  fileName,
  processLine,
  doSomeStuffWithStateAtTheEnd,
}: ProcessLineByLineProps) => {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(fileName),
      crlfDelay: Infinity,
    });

    rl.on("line", processLine);

    //@ts-ignore ts-2339
    await events.once(rl, "close");

    console.log("Reading file line by line with readline done.");
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB`
    );
  } catch (err) {
    console.error(err);
  }

  doSomeStuffWithStateAtTheEnd();
};
