import { splitIntoLines } from "../shared/splitIntoLines";
import { input } from "./input";

export type AssignmentRange = [number, number];

export const getAssignments = (assignmentInput: string): AssignmentRange => {
  if (!assignmentInput.match(/^\d+-\d+$/)) {
    throw new Error(`Invalid assignment input ${assignmentInput}`);
  }

  const sections = assignmentInput.split("-");

  return [parseInt(sections[0]), parseInt(sections[1])];
};

export const getOverlap = (
  assignment1: AssignmentRange,
  assignment2: AssignmentRange
): AssignmentRange | undefined => {
  // no overlap
  if (assignment1[1] < assignment2[0] || assignment1[0] > assignment2[1]) {
    return undefined;
  }

  // fully contained
  if (assignment1[0] <= assignment2[0] && assignment1[1] >= assignment2[1]) {
    return assignment2;
  }
  if (assignment2[0] <= assignment1[0] && assignment2[1] >= assignment1[1]) {
    return assignment1;
  }

  // lower overlap
  if (assignment1[0] <= assignment2[0] && assignment1[1] >= assignment2[0]) {
    return [assignment2[0], assignment1[1]];
  }

  // upper overlap
  if (assignment2[0] <= assignment1[0] && assignment2[1] >= assignment1[0]) {
    return [assignment1[0], assignment2[1]];
  }
};

export const isFullyOverlapped = (
  assignment1: AssignmentRange,
  assignment2: AssignmentRange
): boolean => {
  const overlap = getOverlap(assignment1, assignment2);

  return overlap === assignment1 || overlap === assignment2;
};

export const part1 = (assignments: string[]): number => {
  var count = 0;
  for (let index = 0; index < assignments.length; index++) {
    const elfAssignmnets = assignments[index].split(",");
    const assignment1 = getAssignments(elfAssignmnets[0]);
    const assignment2 = getAssignments(elfAssignmnets[1]);

    if (isFullyOverlapped(assignment1, assignment2)) {
      count++;
    }
  }
  return count;
};

export const part2 = (assignments: string[]): number => {
  var count = 0;
  for (let index = 0; index < assignments.length; index++) {
    const elfAssignmnets = assignments[index].split(",");
    const assignment1 = getAssignments(elfAssignmnets[0]);
    const assignment2 = getAssignments(elfAssignmnets[1]);

    if (getOverlap(assignment1, assignment2)) {
      count++;
    }
  }
  return count;
};

console.log("The answer to part 1 is...", part1(splitIntoLines(input)));
console.log("The answer to part 2 is...", part2(splitIntoLines(input)));
