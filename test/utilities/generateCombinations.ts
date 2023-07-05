export function* generateCombinations(
  elements: string[],
  numberElements: number
): Generator<string> {
  if (numberElements == 0) yield "";
  else {
    for (const elementIndex in elements) {
      const element = elements[elementIndex];
      const combinationsLowerRank = generateCombinations(
        elements.slice(1),
        numberElements - 1
      );

      // @ts-ignore
      for (const combinationLowerRank of combinationsLowerRank) {
        yield combinationLowerRank + element;
      }
    }
  }
}
