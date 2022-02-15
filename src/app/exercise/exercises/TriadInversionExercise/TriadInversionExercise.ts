import { BaseTonalExercise, BaseTonalExerciseSettings } from '../utility/BaseTonalExercise';
import { Exercise } from '../../Exercise';
import {
  ChordSymbol,
  TriadInversion,
  Chord,
} from '../../utility/music/chords';
import { randomFromList } from '../../../shared/ts-utility';
import { BaseCommonSettingsExerciseSettings } from '../utility/BaseCommonSettingsExercise';
import SettingsControlDescriptor = Exercise.SettingsControlDescriptor;
import * as Tone from 'tone';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { toSteadyPart } from '../../utility';
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;
import { TriadInversionExplanationComponent } from './triad-inversion-explanation/triad-inversion-explanation.component';

type TriadInversionAnswer = 'Root Position' | '1st Inversion' | '2nd Inversion'

const triadInversions: TriadInversionAnswer[] = [
  'Root Position',
  '1st Inversion',
  '2nd Inversion',
];

export type TriadInversionExerciseSettings = BaseTonalExerciseSettings<TriadInversionAnswer> & {
  arpeggiateSpeed: number;
  playRootAfterAnswer: boolean;
}

export class TriadInversionExercise extends BaseTonalExercise<TriadInversionAnswer, TriadInversionExerciseSettings> {
  readonly id: string = 'triadInversions';
  readonly name: string = 'Triad Inversions';
  readonly summary: string = 'Find the inversion of a triad in close position';
  readonly explanation: ExerciseExplanationContent = TriadInversionExplanationComponent;

  getQuestionInC(): Exclude<Exercise.Question<TriadInversionAnswer>, 'cadence'> {
    const chordsInC: ChordSymbol[] = ['C', 'Dm', 'Em', 'F', 'G', 'Am'];
    const randomChordInC: ChordSymbol = randomFromList(chordsInC);
    const invertionOptions: TriadInversion[] = [0, 1, 2].filter(invertionOption => this._settings.includedAnswers.includes(triadInversions[invertionOption]));
    const randomTriadInversion: TriadInversion = randomFromList(invertionOptions);
    const answer = triadInversions[randomTriadInversion];
    const voicing: Note[] = new Chord(randomChordInC).getVoicing({
      topVoicesInversion: randomTriadInversion,
      withBass: false,
      octave: 3, // picking a lower octave as a high one is more difficult
    });
    const question: Exercise.Question<TriadInversionAnswer> = {
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

    if (this._settings.playRootAfterAnswer) {
      question.afterCorrectAnswer =[
        {
          partToPlay: toSteadyPart(voicing[(3 - randomTriadInversion) % 3], '1n', 0.3),
          answerToHighlight: answer,
        },
      ]
    }

    return question;
  }

  override getQuestion(): Exercise.Question<TriadInversionAnswer> {
    return {
      ...super.getQuestion(),
      cadence: undefined,
    }
  }

  protected override _getAllAnswersListInC(): Exercise.AnswerList<TriadInversionAnswer> {
    return {
      rows: triadInversions.map(triadInversion => [triadInversion]),
    };
  }

  protected override _getSettingsDescriptor(): SettingsControlDescriptor<TriadInversionExerciseSettings>[] {
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
      },
      {
        key: 'playRootAfterAnswer',
        descriptor: {
          controlType: 'CHECKBOX',
          label: 'Play Root After Correct Answer',
        }
      }
    ];
  }

  protected override _getDefaultSettings(): TriadInversionExerciseSettings {
    return {
      ...super._getDefaultSettings(),
      arpeggiateSpeed: 0,
      playRootAfterAnswer: true,
    };
  }
}
