import { BaseTonalExercise } from './BaseTonalExercise';
import { Exercise } from '../../Exercise';
import {
  ChordSymbol,
  TriadInversion,
  Chord,
} from '../../utility/music/chords';
import { randomFromList } from '../../../shared/ts-utility';
import { BaseCommonSettingsExerciseSettings } from './BaseCommonSettingsExercise';
import SettingsControlDescriptor = Exercise.SettingsControlDescriptor;
import * as Tone from 'tone';
import { Note } from 'tone/Tone/core/type/NoteUnits';

type TriadInversionAnswer = 'Root Position' | '1st Inversion' | '2nd Inversion'

const triadInversions: TriadInversionAnswer[] = [
  'Root Position',
  '1st Inversion',
  '2nd Inversion',
];

export type TriadInversionExerciseSettings = BaseCommonSettingsExerciseSettings<TriadInversionAnswer> & {
  arpeggiateSpeed: number;
}

export class TriadInversionExercise extends BaseTonalExercise<TriadInversionAnswer, TriadInversionExerciseSettings> {
  readonly name: string = 'Triad Inversions';
  readonly description: string = 'Find the inversion of a triad in close position';

  getQuestionInC(): Exclude<Exercise.Question<TriadInversionAnswer>, 'cadence'> {
    const chordsInC: ChordSymbol[] = ['C', 'Dm', 'Em', 'F', 'G', 'Am'];
    const randomChordInC: ChordSymbol = randomFromList(chordsInC);
    const randomTriadInversion: TriadInversion = randomFromList([0, 1, 2]);
    const answer = triadInversions[randomTriadInversion];
    const voicing: Note[] = new Chord(randomChordInC).getVoicing({
      topVoicesInversion: randomTriadInversion,
      withBass: false,
      octave: 3, // picking a lower octave as a high one is more difficult
    });
    return {
      segments: [
        {
          partToPlay: voicing.map((note, index) => {
            const noteDelay = index * this._settings.arpeggiateSpeed / 100;
            return {
              notes: note,
              velocity: 0.3,
              duration: Tone.Time('1n').toSeconds() + (voicing.length - 1) * this._settings.arpeggiateSpeed / 100 - Tone.Time(noteDelay).toSeconds(),
              time: noteDelay,
            }
          }),
          rightAnswer: answer,
        }
      ],
    };
  }

  getQuestion(): Exercise.Question<TriadInversionAnswer> {
    return {
      ...super.getQuestion(),
      cadence: undefined,
    }
  }

  protected _getAllAnswersList(): Exercise.AnswerList<TriadInversionAnswer> {
    return {
      rows: triadInversions.map(triadInversion => [triadInversion]),
    };
  }

  /**
   * @override
   * */
  protected _getSettingsDescriptor(): SettingsControlDescriptor<TriadInversionExerciseSettings>[] {
    return [
      ...super._getSettingsDescriptor(),
      {
        key: 'arpeggiateSpeed',
        descriptor: {
          controlType: 'SLIDER',
          label: 'Arpeggiate Speed',
          min: 0,
          max: 100,
          step: 1,
        }
      }
    ];
  }

  /**
   * @override
   * */
  protected _getDefaultSettings(): TriadInversionExerciseSettings {
    return {
      ...super._getDefaultSettings(),
      arpeggiateSpeed: 0,
    };
  }
}
