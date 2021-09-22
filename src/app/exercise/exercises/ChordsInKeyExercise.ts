import { BaseTonalExercise } from './utility/BaseTonalExercise';
import { Exercise, } from '../Exercise';
import {
  Chord,
  voiceChordProgression,
  TriadInversion
} from '../utility/music/chords';
import { randomFromList } from '../utility';
import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { BaseCommonSettingsExerciseSettings } from './utility/BaseCommonSettingsExercise';
import {
  NumberOfSegmentsSetting,
  numberOfSegmentsControlDescriptorList
} from './utility/NumberOfSegmentsSetting';

type RomanNumeralChord = 'I'/* | 'ii' | 'iii'*/ | 'IV' | 'V' | 'vi'/* | 'viiᵒ'*/;

interface ChordOption {
  chord: Chord;
  romanNumeral: RomanNumeralChord;
}

type ChordInKeySettings = NumberOfSegmentsSetting & BaseCommonSettingsExerciseSettings<RomanNumeralChord>;

const chordsInC: { chord: Chord; romanNumeral: RomanNumeralChord }[] = [
  {
    chord: new Chord('C'),
    romanNumeral: 'I',
  },
  {
    chord: new Chord('F'),
    romanNumeral: 'IV',
  },
  {
    chord: new Chord('G'),
    romanNumeral: 'V',
  },
  {
    chord: new Chord('Am'),
    romanNumeral: 'vi',
  },
];

const romanNumeralToChordInC: { [romanNumeral in RomanNumeralChord]?: Chord } = _.mapValues(_.keyBy(chordsInC, 'romanNumeral'), 'chord');

// todo: go over those resolutions as they are not the best
const romanNumeralToResolution: {
  [romanNumeral in RomanNumeralChord]: {
    [inversion in 0 | 1 | 2]: ReadonlyArray<{
      romanNumeral: RomanNumeralChord,
      chordVoicing: Note[],
    }>
  }
} = {
  I: {
    0: [],
    1: [],
    2: [
      {
        romanNumeral: 'V',
        chordVoicing: romanNumeralToChordInC['V']!.getVoicing({topVoicesInversion: TriadInversion.Fifth}),
      },
      {
        romanNumeral: 'I',
        chordVoicing: romanNumeralToChordInC['I']!.getVoicing({topVoicesInversion: TriadInversion.Octave}),
      }
    ],
  },
  IV: {
    0: [
      {
        romanNumeral: 'V',
        chordVoicing: romanNumeralToChordInC['V']!.getVoicing({
          topVoicesInversion: TriadInversion.Third,
          octave: 3
        }),
      },
      {
        romanNumeral: 'I',
        chordVoicing: romanNumeralToChordInC['I']!.getVoicing({topVoicesInversion: TriadInversion.Octave}),
      },
    ],
    1: [
      {
        romanNumeral: 'V',
        chordVoicing: romanNumeralToChordInC['V']!.getVoicing({topVoicesInversion: TriadInversion.Fifth}),
      },
      {
        romanNumeral: 'I',
        chordVoicing: romanNumeralToChordInC['I']!.getVoicing({topVoicesInversion: TriadInversion.Octave}),
      },
    ],
    2: [
      {
        romanNumeral: 'V',
        chordVoicing: romanNumeralToChordInC['V']!.getVoicing({topVoicesInversion: TriadInversion.Third}),
      },
      {
        romanNumeral: 'I',
        chordVoicing: romanNumeralToChordInC['I']!.getVoicing({
          topVoicesInversion: TriadInversion.Octave,
          octave: 5
        }),
      },
    ],
  },
  V: {
    0: [{
      romanNumeral: 'I',
      chordVoicing: romanNumeralToChordInC['I']!.getVoicing({topVoicesInversion: TriadInversion.Octave}),
    }],
    1: [{
      romanNumeral: 'I',
      chordVoicing: romanNumeralToChordInC['I']!.getVoicing({
        topVoicesInversion: TriadInversion.Octave,
        octave: 5
      }),
    }],
    2: [{
      romanNumeral: 'I',
      chordVoicing: romanNumeralToChordInC['I']!.getVoicing({
        topVoicesInversion: TriadInversion.Octave,
        octave: 5
      }),
    }],
  },
  vi: {
    0: [
      {
        romanNumeral: 'IV',
        chordVoicing: romanNumeralToChordInC['IV']!.getVoicing({
          topVoicesInversion: TriadInversion.Octave,
        }),
      },
      {
        romanNumeral: 'V',
        chordVoicing: romanNumeralToChordInC['V']!.getVoicing({
          topVoicesInversion: TriadInversion.Fifth,
        }),
      },
      {
        romanNumeral: 'I',
        chordVoicing: romanNumeralToChordInC['I']!.getVoicing({
          topVoicesInversion: TriadInversion.Octave,
        }),
      },
    ],
    1: [
      {
        romanNumeral: 'IV',
        chordVoicing: romanNumeralToChordInC['IV']!.getVoicing({
          topVoicesInversion: TriadInversion.Third,
        }),
      },
      {
        romanNumeral: 'V',
        chordVoicing: romanNumeralToChordInC['V']!.getVoicing({
          topVoicesInversion: TriadInversion.Third,
        }),
      },
      {
        romanNumeral: 'I',
        chordVoicing: romanNumeralToChordInC['I']!.getVoicing({
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        }),
      },
    ],
    2: [
      {
        romanNumeral: 'IV',
        chordVoicing: romanNumeralToChordInC['IV']!.getVoicing({
          topVoicesInversion: TriadInversion.Fifth,
          octave: 5
        }),
      },
      {
        romanNumeral: 'V',
        chordVoicing: romanNumeralToChordInC['V']!.getVoicing({
          topVoicesInversion: TriadInversion.Third,
        }),
      },
      {
        romanNumeral: 'I',
        chordVoicing: romanNumeralToChordInC['I']!.getVoicing({
          topVoicesInversion: TriadInversion.Octave,
          octave: 5,
        }),
      },
    ]
  }
}

export class ChordsInKeyExercise extends BaseTonalExercise<RomanNumeralChord, ChordInKeySettings> {
  readonly name: string = 'Chord in Key';
  readonly description: string = 'Recognise chords based on their tonal context in a key';
  protected _settings: ChordInKeySettings = this._getDefaultSettings();

  getQuestionInC(): Exclude<Exercise.Question<RomanNumeralChord>, "cadence"> {
    const numberOfSegments = this._settings.numberOfSegments;
    const availableChords = chordsInC.filter(chordDescriptor => this._settings.includedAnswers.includes(chordDescriptor.romanNumeral))
    const chordProgression: ChordOption[] = [randomFromList(availableChords)];
    while (chordProgression.length < numberOfSegments) {
      chordProgression.push(randomFromList(availableChords.filter(chord => chord !== _.last(chordProgression)!)));
    }

    const firstChordInversion: 0 | 1 | 2 = randomFromList([0, 1, 2]);

    const question: Exclude<Exercise.Question<RomanNumeralChord>, "cadence"> = {
      segments: voiceChordProgression(_.map(chordProgression, 'chord'), firstChordInversion)
        .map((voicing: Note[], index: number): Exercise.Question<RomanNumeralChord>['segments'][0] => {
          return {
            rightAnswer: chordProgression[index].romanNumeral,
            partToPlay: [{
              notes: voicing,
              velocity: 0.3,
              duration: '2n',
            }],
          }
        }),
    }

    if (numberOfSegments === 1) {
      // calculate resolution
      const firstChordRomanNumeral: RomanNumeralChord = chordProgression[0].romanNumeral;
      const resolution: {
        romanNumeral: RomanNumeralChord,
        chordVoicing: Note[],
      }[] = [
        {
          romanNumeral: firstChordRomanNumeral,
          chordVoicing: chordProgression[0].chord.getVoicing({topVoicesInversion: firstChordInversion}),
        },
        ...romanNumeralToResolution[firstChordRomanNumeral][firstChordInversion],
      ];
      question.afterCorrectAnswer = resolution.map(({
                                                      romanNumeral,
                                                      chordVoicing
                                                    }, index) => ({
        answerToHighlight: romanNumeral,
        partToPlay: [{
          notes: chordVoicing,
          duration: index === resolution.length - 1 ? '2n' : '4n',
          velocity: 0.3,
        }]
      }));
    }

    return question;
  }

  protected _getAllAnswersList(): Exercise.AnswerList<RomanNumeralChord> {
    return [
      'I',
      'IV',
      'V',
      'vi',
    ];
  }

  protected _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<ChordInKeySettings>[] {
    return [
      ...super._getSettingsDescriptor(),
      ...numberOfSegmentsControlDescriptorList,
    ]
  }

  private _getDefaultSettings(): ChordInKeySettings {
    return {
      ...this._settings,
      numberOfSegments: 1,
    };
  }
}
