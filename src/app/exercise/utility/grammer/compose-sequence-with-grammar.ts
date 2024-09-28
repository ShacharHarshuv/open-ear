import { randomFromList } from '../../../shared/ts-utility';
import { noRepeatsRule } from './no-repeats-rule';
import { Rule } from './rule';

export function composeSequenceWithGrammar<T>(
  availableOptions: readonly T[],
  length: number,
  rules: Rule<T>[] = [noRepeatsRule],
) {
  let lastChoice: T = randomFromList(availableOptions);
  const sequence = [lastChoice];
  while (sequence.length < length) {
    let optionsForNext = availableOptions.filter((option) =>
      rules.every((rule) => rule(lastChoice)(option)),
    );

    if (optionsForNext.length === 0) {
      console.warn(
        `No valid options for next choice after ${lastChoice}, falling back to random choice`,
      );
      optionsForNext = availableOptions.filter(
        (option) => option !== lastChoice,
      );
    }

    lastChoice = randomFromList(optionsForNext);
    sequence.push(lastChoice);
  }

  return sequence;
}
