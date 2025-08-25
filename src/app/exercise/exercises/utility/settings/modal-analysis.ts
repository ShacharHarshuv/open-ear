import {
  Accidental,
  EnharmonicScaleDegree,
  Mode,
  accidentalToDelta,
  getDiatonicScaleDegreeWithAccidental,
} from 'src/app/exercise/utility';
import { SettingsConfig } from '../../../exercise-logic/settings-config';

export type ModalAnalysis = 'tonic-1' | '1-major-6-minor' | '1-ionian-always';

export type ModalAnalysisSettings = {
  modalAnalysis: ModalAnalysis;
};

export const modalAnalysis: SettingsConfig<ModalAnalysisSettings> = {
  controls: [
    {
      key: 'modalAnalysis',
      info:
        'Determines how chord progression in different modes are analyzed. <br>' +
        'Tonic = 1; the tonic is always 1. Regardless of the mode. For example in the Dorian mode, you could have this progression: i IV' +
        '1 Major, 6 Minor; (recommended) the tonic is 1 for major modes, and 6 for minor modes. For example, the same Dorian progression will be vi II' +
        '1 Ionian always; 1 is always the ionian tonic, regardless of the mode. For example, the same Dorian progression will be ii V',
      descriptor: {
        label: 'Modal Analysis',
        controlType: 'select',
        options: [
          {
            label: 'Tonic = 1',
            value: 'tonic-1',
          },
          {
            label: '1 Major, 6 Minor',
            value: '1-major-6-minor',
          },
          {
            label: '1 Ionian always',
            value: '1-ionian',
          },
        ],
      },
    },
  ],
  defaults: {
    modalAnalysis: '1-major-6-minor',
  },
};

// todo: consider if we can simplify this / generate this
const modesSpellings: Record<
  ModalAnalysis,
  Record<Mode, EnharmonicScaleDegree[]>
> = {
  'tonic-1': {
    [Mode.Lydian]: ['1', '2', '3', '#4', '5', '6', '7'],
    [Mode.Ionian]: ['1', '2', '3', '4', '5', '6', '7'],
    [Mode.Mixolydian]: ['1', '2', '3', '4', '5', '6', 'b7'],
    [Mode.Dorian]: ['1', '2', 'b3', '4', '5', '6', 'b7'],
    [Mode.Aeolian]: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
    [Mode.Phrygian]: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'],
    [Mode.Locrian]: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'],
  },
  '1-major-6-minor': {
    // major
    [Mode.Lydian]: ['1', '2', '3', '#4', '5', '6', '7'],
    [Mode.Ionian]: ['1', '2', '3', '4', '5', '6', '7'],
    [Mode.Mixolydian]: ['1', '2', '3', '4', '5', '6', 'b7'],
    // minor
    [Mode.Dorian]: ['6', '7', '1', '2', '3', '#4', '5'],
    [Mode.Aeolian]: ['6', '7', '1', '2', '3', '4', '5'],
    [Mode.Phrygian]: ['6', 'b7', '1', '2', '3', '4', '5'],
    [Mode.Locrian]: ['6', 'b7', '1', '2', 'b3', '4', '5'],
  },
  '1-ionian-always': {
    [Mode.Lydian]: ['4', '5', '6', '7', '1', '2', '3'],
    [Mode.Ionian]: ['1', '2', '3', '4', '5', '6', '7'],
    [Mode.Mixolydian]: ['5', '6', '7', '1', '2', '3', '4'],
    [Mode.Dorian]: ['2', '3', '4', '5', '6', '7', '1'],
    [Mode.Aeolian]: ['6', '7', '1', '2', '3', '4', '5'],
    [Mode.Phrygian]: ['3', '4', '5', '6', '7', '1', '2'],
    [Mode.Locrian]: ['7', '1', '2', '3', '4', '5', '6'],
  },
};

export function convertModalAnalysis({
  scaleDegree,
  mode,
  currentModalAnalysis,
  desiredModalAnalysis,
}: {
  scaleDegree: EnharmonicScaleDegree;
  mode: Mode;
  currentModalAnalysis: ModalAnalysis;
  desiredModalAnalysis: ModalAnalysis;
}): EnharmonicScaleDegree {
  const currentModeSpelling = modesSpellings[currentModalAnalysis][mode];
  const { diatonicScaleDegree, accidental } =
    getDiatonicScaleDegreeWithAccidental(scaleDegree);

  let closestDiatonicDegreeIndex: number | undefined;
  let closestDiatonicDegree: EnharmonicScaleDegree | undefined;
  let closestDiatonicDegreeAccidental: Accidental | undefined;
  for (let i = 0; i < currentModeSpelling.length; i++) {
    const candidateParsed = getDiatonicScaleDegreeWithAccidental(
      currentModeSpelling[i],
    );
    if (candidateParsed.diatonicScaleDegree === diatonicScaleDegree) {
      closestDiatonicDegreeIndex = i;
      closestDiatonicDegree = currentModeSpelling[i];
      closestDiatonicDegreeAccidental = candidateParsed.accidental;
      break;
    }
  }
  if (
    closestDiatonicDegreeIndex === undefined ||
    closestDiatonicDegreeAccidental === undefined ||
    closestDiatonicDegree === undefined
  ) {
    throw new Error(`Couldn't find equivalent scale degree`);
  }

  const targetDeltaFromDiatonic =
    accidentalToDelta[accidental] -
    accidentalToDelta[closestDiatonicDegreeAccidental!];

  const closestDiatonicDegreeInDesiredAnalysis =
    modesSpellings[desiredModalAnalysis][mode][closestDiatonicDegreeIndex];

  const closestDiatonicDegreeInDesiredAnalysisParsed =
    getDiatonicScaleDegreeWithAccidental(
      closestDiatonicDegreeInDesiredAnalysis,
    );

  const newAccidental = shiftAccidental(
    closestDiatonicDegreeInDesiredAnalysisParsed.accidental,
    targetDeltaFromDiatonic,
  );

  return `${newAccidental}${closestDiatonicDegreeInDesiredAnalysisParsed.diatonicScaleDegree}` as EnharmonicScaleDegree;
}

const accidentalsOrder = [
  Accidental.Flat,
  Accidental.Natural,
  Accidental.Sharp,
];
export function shiftAccidental(
  accidental: Accidental,
  delta: number,
): Accidental {
  const currentAccidentalIndex = accidentalsOrder.indexOf(accidental);
  const newAccidentalIndex = currentAccidentalIndex + delta;
  if (newAccidentalIndex < 0) {
    throw new Error(
      `Not supporting accidental shift below ${accidentalsOrder[0]}`,
    );
  }
  if (newAccidentalIndex >= accidentalsOrder.length) {
    throw new Error(
      `Not supporting accidental shift above ${accidentalsOrder[accidentalsOrder.length - 1]}`,
    );
  }

  return accidentalsOrder[newAccidentalIndex];
}
