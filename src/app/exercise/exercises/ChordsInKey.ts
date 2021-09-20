import { BaseTonalExercise } from './BaseTonalExercise';
import {
  Exercise,
} from '../Exercise';
import {
  Chord,
  voiceChordProgression,
  ChordSymbol,
  TriadInversion
} from '../utility/music/chords';
import { randomFromList } from '../utility';
import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';

type RomanNumeralChord = 'I'/* | 'ii' | 'iii'*/ | 'IV' | 'V'/* | 'vi' | 'viiᵒ'*/;

interface ChordOption {
  chord: Chord;
  romanNumeral: RomanNumeralChord;
}

type ChordInKeySettings = {
  numberOfSegments: number;
}

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
    2: [],
  },
  IV: {
    0: [
      {
        romanNumeral: 'V',
        chordVoicing: romanNumeralToChordInC['V']!.getVoicing(TriadInversion.Third),
      },
      {
        romanNumeral: 'I',
        chordVoicing: romanNumeralToChordInC['I']!.getVoicing(TriadInversion.Octave),
      },
    ],
    1: [
      {
        romanNumeral: 'V',
        chordVoicing: romanNumeralToChordInC['V']!.getVoicing(TriadInversion.Fifth),
      },
      {
        romanNumeral: 'I',
        chordVoicing: romanNumeralToChordInC['I']!.getVoicing(TriadInversion.Octave),
      },
    ],
    2: [
      {
        romanNumeral: 'V',
        chordVoicing: romanNumeralToChordInC['V']!.getVoicing(TriadInversion.Third),
      },
      {
        romanNumeral: 'I',
        chordVoicing: romanNumeralToChordInC['I']!.getVoicing(TriadInversion.Octave, true, 4),
      },
    ],
  },
  V: {
    0: [{
      romanNumeral: 'I',
      chordVoicing: romanNumeralToChordInC['I']!.getVoicing(TriadInversion.Octave),
    }],
    1: [{
      romanNumeral: 'I',
      chordVoicing: romanNumeralToChordInC['I']!.getVoicing(TriadInversion.Octave),
    }],
    2: [{
      romanNumeral: 'I',
      chordVoicing: romanNumeralToChordInC['I']!.getVoicing(TriadInversion.Octave),
    }],
  }
}

export class ChordsInKey extends BaseTonalExercise<RomanNumeralChord, ChordInKeySettings> {
  readonly settingsDescriptor: Exercise.SettingsControlDescriptor<ChordInKeySettings>[] = ChordsInKey._getSettingsDescriptor();
  readonly name: string = 'Chord in Key';
  readonly description: string = 'Recognise chords based on their tonal context in a key';
  private _settings: ChordInKeySettings = {
    numberOfSegments: 1,
  }

  getAnswerList(): Exercise.AnswerList<RomanNumeralChord> {
    return [
      'I',
      'IV',
      'V',
    ];
  }

  private static _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<ChordInKeySettings>[] {
    return [{
      key: 'numberOfSegments',
      descriptor: {
        controlType: 'SLIDER',
        label: 'Number of chords',
        min: 1,
        max: 8,
        step: 1,
      }
    }]
  }

  getQuestionInC(): Exclude<Exercise.Question<RomanNumeralChord>, "cadence"> {
    const numberOfSegments = this._settings.numberOfSegments;
    const chordProgression: ChordOption[] = [randomFromList(chordsInC)];
    while (chordProgression.length < numberOfSegments) {
      chordProgression.push(randomFromList(chordsInC.filter(chord => chord !== _.last(chordProgression)!)));
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
          chordVoicing: chordProgression[0].chord.getVoicing(firstChordInversion),
        },
        ...romanNumeralToResolution[firstChordRomanNumeral][firstChordInversion],
      ];
      question.afterCorrectAnswer = resolution.map(({romanNumeral, chordVoicing}, index) => ({
        answerToHighlight: romanNumeral,
        partToPlay: [{
          notes: chordVoicing,
          duration: '2n',
          velocity: 0.3,
        }]
      }));
    }

    return question;
  }

  updateSettings(settings: ChordInKeySettings): void {
    this._settings = settings;
  }

  getCurrentSettings(): ChordInKeySettings {
    return this._settings;
  }
}
