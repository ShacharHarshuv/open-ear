import { DeepReadonly, RomanNumeralChordSymbol } from '../../utility';
import { getSimplestAcceptableChordAnalysis } from '../../utility/music/harmony/isAcceptableChordAnalysis';
import {
  AcceptEquivalentChordSettings,
  acceptableChordAnalysisOptions,
} from '../utility/settings/acceptEquivalentChordsSettings';
import { YouTubeSongQuestion } from './songQuestions';

const chordsIntroductionOrder: RomanNumeralChordSymbol[] = [
  'V',
  'I',
  'IV',
  'vi',
  'ii',
  'iii',
  'III',
  'Vsus',
  'Isus',
  'II',
  'VI',
  'IV7',
  'I7',
  'I/3',
  'IV/6',
  'V/7',
  'bVII',
  'I7/b7',
  'bIII',
  'bII',
];

export function indexQuestionsByProgression(
  questions: DeepReadonly<YouTubeSongQuestion[]>,
  settings: AcceptEquivalentChordSettings,
) {
  const groups = new Map<string, DeepReadonly<YouTubeSongQuestion>[]>();

  for (const question of questions) {
    const chords = removeLoopClose(
      removeLoop(
        question.chords.map(({ chord }) =>
          getSimplestAcceptableChordAnalysis(
            chord,
            acceptableChordAnalysisOptions(settings),
          ),
        ),
      ),
    );
    const progressionsId = chords.join(' ');
    if (!groups.has(progressionsId)) {
      groups.set(progressionsId, []);
    }
    groups.get(progressionsId)!.push(question);
  }

  const getChordIndex = (chord: RomanNumeralChordSymbol) => {
    const index = chordsIntroductionOrder.indexOf(chord);
    return index === -1 ? Infinity : index;
  };

  const entries = Array.from(groups.entries());
  entries.sort(([progressionA], [progressionB]) => {
    const chordsA = progressionA.split(' ') as RomanNumeralChordSymbol[];
    const chordsB = progressionB.split(' ') as RomanNumeralChordSymbol[];

    const getHighestIndex = (chords: RomanNumeralChordSymbol[]) => {
      return Math.max(...chords.map(getChordIndex));
    };

    const highestIndexA = getHighestIndex(chordsA);
    const highestIndexB = getHighestIndex(chordsB);

    if (highestIndexA !== highestIndexB) {
      return highestIndexA - highestIndexB;
    }

    const indexA = getChordIndex(chordsA[0]);
    const indexB = getChordIndex(chordsB[0]);

    return indexA - indexB;
  });

  return new Map(entries);
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
  if (arr.length >= 4 && arr[0] === arr[arr.length - 1]) {
    return arr.slice(0, -1);
  }

  return arr;
}
