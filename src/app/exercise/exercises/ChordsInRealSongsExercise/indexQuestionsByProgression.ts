import { DeepReadonly } from '../../utility';
import { YouTubeSongQuestion } from './songQuestions';

export function indexQuestionsByProgression(
  questions: DeepReadonly<YouTubeSongQuestion[]>,
) {
  const groups = new Map<string, DeepReadonly<YouTubeSongQuestion>[]>();

  for (const question of questions) {
    const chords = removeLoopClose(
      removeLoop(question.chords.map(({ chord }) => chord)),
    );
    const progressionsId = chords.join(' ');
    if (!groups.has(progressionsId)) {
      groups.set(progressionsId, []);
    }
    groups.get(progressionsId)!.push(question);
  }

  // todo: consider sorting the progressions by "difficulty" (need to define this).
  return groups;
}

function removeLoop(arr: string[]): string[] {
  if (arr.length <= 1) return arr;

  for (
    let loopLength = 1;
    loopLength <= Math.floor(arr.length / 2);
    loopLength++
  ) {
    const endIndex = arr.length - loopLength;
    const loopStart = arr.slice(endIndex);
    const beforeLoop = arr.slice(0, endIndex);

    if (beforeLoop.length >= loopLength) {
      const potentialLoop = beforeLoop.slice(-loopLength);
      if (loopStart.every((item, index) => item === potentialLoop[index])) {
        return beforeLoop;
      }
    }
  }

  return arr;
}

function removeLoopClose(arr: string[]): string[] {
  if (arr.length > 4 && arr[0] === arr[arr.length - 1]) {
    return arr.slice(1, -1);
  }

  return arr;
}
