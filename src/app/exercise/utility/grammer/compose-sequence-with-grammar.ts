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
    lastChoice = randomFromList(
      availableOptions.filter((chord) =>
        rules.every((rule) => rule(lastChoice)(chord)),
      ),
    );
    sequence.push(lastChoice);
  }

  console.log('compose sequence result', sequence);
  return sequence;
}
