import { Exercise } from '../Exercise';
import {
  Chord,
  TriadInversion,
} from '../utility/music/chords';
import { randomFromList } from '../utility';
import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import {
  NumberOfSegmentsSetting,
  numberOfSegmentsControlDescriptorList,
} from './utility/NumberOfSegmentsSetting';
import {
  BaseTonalChordProgressionExercise,
  ChordProgressionQuestion,
  BaseTonalChordProgressionExerciseSettings,
} from './utility/BaseTonalChordProgressionExercise';

type RomanNumeralChord = 'I' | 'ii' | 'iii' | 'IV' | 'V' | 'vi' /*| 'viiᵒ'*/;

interface ChordOption {
  chord: Chord;
  answer: RomanNumeralChord;
}

type ChordInKeySettings = NumberOfSegmentsSetting & BaseTonalChordProgressionExerciseSettings<RomanNumeralChord>;

const chordsInC: { chord: Chord; answer: RomanNumeralChord }[] = [
  {
    chord: new Chord('C'),
    answer: 'I',
  },
  {
    chord: new Chord('Dm'),
    answer: 'ii',
  },
  {
    chord: new Chord('Em'),
    answer: 'iii',
  },
  {
    chord: new Chord('F'),
    answer: 'IV',
  },
  {
    chord: new Chord('G'),
    answer: 'V',
  },
  {
    chord: new Chord('Am'),
    answer: 'vi',
  },
  // {
  //   chord: new Chord('Bdim'), // todo: support dim chords
  //   answer: 'viiᵒ',
  // },
];

const romanNumeralToChordInC: { [romanNumeral in RomanNumeralChord]?: Chord } = _.mapValues(_.keyBy(chordsInC, 'answer'), 'chord');

// todo: go over those resolutions as they are not the best
const romanNumeralToResolution: {
  [romanNumeral in RomanNumeralChord]: {
    [inversion in 0 | 1 | 2]: ReadonlyArray<{
      romanNumeral: RomanNumeralChord,
      voicingConfig: Parameters<Chord['getVoicing']>[0],
    }>;
  }
} = {
  I: {
    0: [],
    1: [],
    2: [
      {
        romanNumeral: 'V',
        voicingConfig: { topVoicesInversion: TriadInversion.Fifth },
      },
      {
        romanNumeral: 'I',
        voicingConfig: { topVoicesInversion: TriadInversion.Octave },
      },
    ],
  },
  ii: {
    0: [
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        },
      },
    ],
    1: [
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
        },
      },
    ],
    2: [
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: { topVoicesInversion: TriadInversion.Fifth },
      },
    ],
  },
  iii: {
    0: [
      {
        romanNumeral: 'IV',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
          octave: 5,
        },
      },
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        },
      },
    ],
    1: [
      {
        romanNumeral: 'IV',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
        },
      },
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
          octave: 3,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
        },
      },
    ],
    2: [
      {
        romanNumeral: 'IV',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        },
      },
    ],
  },
  IV: {
    0: [
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
          octave: 3,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: { topVoicesInversion: TriadInversion.Octave },
      },
    ],
    1: [
      {
        romanNumeral: 'V',
        voicingConfig: { topVoicesInversion: TriadInversion.Fifth },
      },
      {
        romanNumeral: 'I',
        voicingConfig: { topVoicesInversion: TriadInversion.Octave },
      },
    ],
    2: [
      {
        romanNumeral: 'V',
        voicingConfig: { topVoicesInversion: TriadInversion.Third },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        },
      },
    ],
  },
  V: {
    0: [{
      romanNumeral: 'I',
      voicingConfig: { topVoicesInversion: TriadInversion.Octave },
    }],
    1: [{
      romanNumeral: 'I',
      voicingConfig: {
        topVoicesInversion: TriadInversion.Octave,
        octave: 5,
      },
    }],
    2: [{
      romanNumeral: 'I',
      voicingConfig: {
        topVoicesInversion: TriadInversion.Octave,
        octave: 5,
      },
    }],
  },
  vi: {
    0: [
      {
        romanNumeral: 'IV',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
        },
      },
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
        },
      },
    ],
    1: [
      {
        romanNumeral: 'IV',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        },
      },
    ],
    2: [
      {
        romanNumeral: 'IV',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Fifth,
          octave: 5,
        },
      },
      {
        romanNumeral: 'V',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Third,
        },
      },
      {
        romanNumeral: 'I',
        voicingConfig: {
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        },
      },
    ],
  },
};

export class ChordsInKeyExercise extends BaseTonalChordProgressionExercise<RomanNumeralChord, ChordInKeySettings> {
  readonly name: string = 'Chord in Key';
  readonly description: string = 'Recognise chords based on their tonal context in a key';
  protected _settings: ChordInKeySettings = this._getDefaultSettings();

  protected _getChordProgressionInC(): ChordProgressionQuestion<RomanNumeralChord> {
    const numberOfSegments = this._settings.numberOfSegments;
    const availableChords = chordsInC.filter(chordDescriptor => this._settings.includedAnswers.includes(chordDescriptor.answer));
    const chordProgression: ChordOption[] = [randomFromList(availableChords)];
    while (chordProgression.length < numberOfSegments) {
      chordProgression.push(randomFromList(availableChords.filter(chord => chord !== _.last(chordProgression)!)));
    }

    const question: ChordProgressionQuestion<RomanNumeralChord> = {
      segments: chordProgression,
    };

    if (numberOfSegments === 1) {
      question.afterCorrectAnswer = ({ firstChordInversion }) => {
        // calculate resolution
        const firstChordRomanNumeral: RomanNumeralChord = chordProgression[0].answer;
        const resolution: {
          romanNumeral: RomanNumeralChord,
          chordVoicing: Note[],
        }[] = [
          {
            romanNumeral: firstChordRomanNumeral,
            chordVoicing: chordProgression[0].chord.getVoicing({
              topVoicesInversion: firstChordInversion,
              withBass: this._settings.includeBass,
            }),
          },
          ...romanNumeralToResolution[firstChordRomanNumeral][firstChordInversion].map(chord => ({
            romanNumeral: chord.romanNumeral,
            chordVoicing: romanNumeralToChordInC[chord.romanNumeral]!.getVoicing({
              ...chord.voicingConfig,
              withBass: this._settings.includeBass,
            }),
          })),
        ];

        console.log(resolution);

        return resolution.map(({
          romanNumeral,
          chordVoicing,
        }, index) => ({
          answerToHighlight: romanNumeral,
          partToPlay: [{
            notes: chordVoicing,
            duration: index === resolution.length - 1 ? '2n' : '4n',
            velocity: 0.3,
          }],
        }));
      };
    }

    return question;
  }

  protected _getAllAnswersList(): Exercise.AnswerList<RomanNumeralChord> {
    return [
      'I',
      'ii',
      'iii',
      'IV',
      'V',
      'vi',
    ];
  }

  protected _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<ChordInKeySettings>[] {
    return [
      ...super._getSettingsDescriptor(),
      ...numberOfSegmentsControlDescriptorList,
    ];
  }

  private _getDefaultSettings(): ChordInKeySettings {
    return {
      ...this._settings,
      numberOfSegments: 1,
    };
  }
}
