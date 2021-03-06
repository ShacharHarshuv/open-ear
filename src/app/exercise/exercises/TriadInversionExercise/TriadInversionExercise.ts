import {
  BaseTonalExercise,
  TonalExerciseSettings,
} from '../utility/base-exercises/BaseTonalExercise';
import { Exercise } from '../../Exercise';
import {
  ChordSymbol,
  TriadInversion,
  Chord,
} from '../../utility/music/chords';
import { randomFromList } from '../../../shared/ts-utility';
import * as Tone from 'tone';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { toSteadyPart } from '../../utility';
import { TriadInversionExplanationComponent } from './triad-inversion-explanation/triad-inversion-explanation.component';
import {
  IncludedAnswersSetting,
  IncludedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import SettingsControlDescriptor = Exercise.SettingsControlDescriptor;
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;

type TriadInversionAnswer = 'Root Position' | '1st Inversion' | '2nd Inversion'

const triadInversions: TriadInversionAnswer[] = [
  'Root Position',
  '1st Inversion',
  '2nd Inversion',
];

export type TriadInversionExerciseSettings = IncludedAnswersSettings<TriadInversionAnswer> &
  TonalExerciseSettings<TriadInversionAnswer> & {
  arpeggiateSpeed: number;
  playRootAfterAnswer: boolean;
}

@IncludedAnswersSetting<TriadInversionAnswer, TriadInversionExerciseSettings>({
  default: triadInversions,
})
export class TriadInversionExercise extends BaseTonalExercise<TriadInversionAnswer, TriadInversionExerciseSettings> {
  readonly id: string = 'triadInversions';
  readonly name: string = 'Triad Inversions';
  readonly summary: string = 'Find the inversion of a triad in close position';
  readonly explanation: ExerciseExplanationContent = TriadInversionExplanationComponent;

  getQuestionInC(): Exclude<Exercise.NotesQuestion<TriadInversionAnswer>, 'cadence'> {
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
        },
      ],
      info: '',
    };

    if (this._settings.playRootAfterAnswer) {
      question.afterCorrectAnswer = [
        {
          partToPlay: toSteadyPart(voicing[(3 - randomTriadInversion) % 3], '1n', 0.3),
          answerToHighlight: answer,
        },
      ]
    }

    return question;
  }

  override getQuestion(): Exercise.NotesQuestion<TriadInversionAnswer> {
    return {
      ...super.getQuestion(),
      cadence: undefined,
    }
  }

  protected override _getAnswersListInC(): Exercise.AnswerList<TriadInversionAnswer> {
    return {
      rows: triadInversions.map(triadInversion => [triadInversion]),
    };
  }

  override getSettingsDescriptor(): SettingsControlDescriptor<TriadInversionExerciseSettings>[] {
    return [
      ...super.getSettingsDescriptor(),
      {
        key: 'arpeggiateSpeed',
        info: 'When set to a value larger then zero, the chord will be arpeggiated, making it easier to pick up individual notes from it. <br>' +
          'Starter with a large settings and gradually reducing can be a good way to train your ear to pick up individual notes being played harmonically',
        descriptor: {
          controlType: 'slider',
          label: 'Arpeggiate Speed',
          min: 0,
          max: 100,
          step: 1,
        },
      },
      {
        key: 'playRootAfterAnswer',
        descriptor: {
          controlType: 'checkbox',
          label: 'Play Root After Correct Answer',
        },
      },
    ];
  }

  protected override _getDefaultSettings(): TriadInversionExerciseSettings {
    return {
      ...super._getDefaultSettings(),
      arpeggiateSpeed: 0,
      playRootAfterAnswer: true,
      includedAnswers: ['Root Position', '1st Inversion', '2nd Inversion'],
    };
  }
}
