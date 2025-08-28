import { DeepReadonly, Mode, RomanNumeralChordSymbol } from '../../utility';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
import { getSimplestAcceptableChordAnalysis } from '../../utility/music/harmony/isAcceptableChordAnalysis';
import {
  AcceptEquivalentChordSettings,
  acceptableChordAnalysisOptions,
} from '../utility/settings/acceptEquivalentChordsSettings';
import {
  ModalAnalysis,
  ModalAnalysisSettings,
} from '../utility/settings/modal-analysis';
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
  settings: AcceptEquivalentChordSettings & ModalAnalysisSettings,
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
    const progressionsId = getProgressionId(
      chords,
      settings.modalAnalysis,
      question.mode,
    );

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
    // Extract chords from progression ID (remove mode prefix)
    const chordsA = parseProgressionId(progressionA);
    const chordsB = parseProgressionId(progressionB);

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

function removeLoop<T extends string>(arr: T[]): T[] {
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

function removeLoopClose<T extends string>(arr: T[]): T[] {
  if (arr.length >= 4 && arr[0] === arr[arr.length - 1]) {
    return arr.slice(0, -1);
  }

  return arr;
}

function getProgressionId(
  chords: RomanNumeralChordSymbol[],
  modalAnalysis: ModalAnalysis,
  mode: Mode,
) {
  const normalizedChords = chords.map((chord) =>
    RomanNumeralChord.convertAnalysis({
      chordSymbol: chord,
      mode,
      currentModalAnalysis: modalAnalysis,
      desiredModalAnalysis: '1-major-6-minor',
    }),
  );

  return `${mode}:${normalizedChords.join(' ')}`;
}

function parseProgressionId(progressionId: string) {
  const [, chordParts] = progressionId.split(':');
  return chordParts.split(' ') as RomanNumeralChordSymbol[];
}
