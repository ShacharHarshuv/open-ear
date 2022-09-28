import { InstrumentName } from './InstrumentExercise';

function getNumberedVariations(numberOfVariations: number): string[] {
  const array: string[] = [];
  for (let i = 0; i < numberOfVariations; i++) {
    array.push((i + 1).toString());
  }
  return array;
}

export const instrumentToVariationList: Record<InstrumentName, string[]> = {
  Clarinet: getNumberedVariations(2),
  Flute: getNumberedVariations(2),
}
