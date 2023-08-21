export const caseChecker = (word: string) => {
  if (word === "REAL" || word === "DEMO") {
    return word;
  }
  return `Given word's style is incorrect`;
};
