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
  IncludedAnswersSettings,
  includedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import { composeExercise } from '../utility/exerciseAttributes/composeExercise';
import { tonalExercise } from '../utility/exerciseAttributes/tonalExercise';
import { createExercise } from '../utility/exerciseAttributes/createExercise';

type TriadInversionAnswer = 'Root Position' | '1st Inversion' | '2nd Inversion'

const triadInversions: TriadInversionAnswer[] = [
  'Root Position',
  '1st Inversion',
  '2nd Inversion',
];

export type TriadInversionExerciseSettings =
  IncludedAnswersSettings<TriadInversionAnswer> & {
  // todo(#167): arpeggio speed can be a generic pluggable settings (and reused across different exercise)
  arpeggiateSpeed: number;
  playRootAfterAnswer: boolean;
  arpeggiatePlayMode: string;
}

export const triadInversionExercise = () => {
  const allAnswersList = {
    rows: triadInversions.map(triadInversion => [triadInversion]),
  };

  return composeExercise(
    includedAnswersSettings({
      name: 'Inversions',
    }),
    tonalExercise({
      playCadence: false,
      keySelection: false,
    }),
    createExercise,
  )({
    id: 'triadInversions',
    name: 'Triad Inversions',
    summary: 'Find the inversion of a triad in close position',
    explanation: TriadInversionExplanationComponent,
    answerList: allAnswersList,
    getQuestion(settings: TriadInversionExerciseSettings): Exclude<Exercise.NotesQuestion<TriadInversionAnswer>, 'cadence'> {
      const chordsInC: ChordSymbol[] = ['C', 'Dm', 'Em', 'F', 'G', 'Am'];
      const randomChordInC: ChordSymbol = randomFromList(chordsInC);
      const invertionOptions: TriadInversion[] = [0, 1, 2].filter(invertionOption => settings.includedAnswers.includes(triadInversions[invertionOption]));
      const randomTriadInversion: TriadInversion = randomFromList(invertionOptions);
      const answer = triadInversions[randomTriadInversion];
      let voicing: Note[] = new Chord(randomChordInC).getVoicing({
        topVoicesInversion: randomTriadInversion,
        withBass: false,
        octave: 3, // picking a lower octave as a high one is more difficult
      });
      let temp: Note[];
      const root: Note = Array.from(voicing)[(3 - randomTriadInversion) % 3];
      switch (settings.arpeggiatePlayMode) {
        case 'descending':
          voicing = voicing.reverse();
          break;
        case 'ascendingCycle':
          temp = Array.from(voicing);
          voicing = voicing.concat(temp.reverse());
          break;
        case 'descendingCycle':
          temp = Array.from(voicing.reverse());
          voicing = voicing.concat(temp.reverse());
          break;
      }
      const question: Exercise.Question<TriadInversionAnswer> = {
        segments: [
          {
            partToPlay: voicing.map((note, index) => {
              const noteDelay = index * settings.arpeggiateSpeed / 100;
              return {
                notes: note,
                velocity: 0.3,
                duration: Tone.Time('1n').toSeconds() + (voicing.length - 1) * settings.arpeggiateSpeed / 100 - Tone.Time(noteDelay).toSeconds(),
                time: noteDelay,
              }
            }),
            rightAnswer: answer,
          },
        ],
        info: '',
      };

      if (settings.playRootAfterAnswer) {
        question.afterCorrectAnswer = [
          {
            partToPlay: toSteadyPart(root, '1n', 0.3),
            answerToHighlight: answer,
          },
        ]
      }

      return question;
    },
    settingsDescriptors: [
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
      {
        key: 'arpeggiatePlayMode',
        info: 'Ascending , the note in question will be played from lower to higher. \n' +
          'Descending, the note in question will be played from higher to lower. ',
        descriptor: {
          label: 'Arpeggiate Play Mode',
          controlType: 'select',
          options: [
            {
              label: 'Ascending',
              value: 'ascending',
            },
            {
              label: 'Descending',
              value: 'descending',
            },
            {
              label: 'Ascending+Descending',
              value: 'ascendingCycle',
            },
            {
              label: 'Descending+Ascending',
              value: 'descendingCycle',
            },
          ],
        },
      },
    ],
    defaultSettings: {
      arpeggiateSpeed: 0,
      playRootAfterAnswer: true,
      arpeggiatePlayMode: 'ascending',
    },
  })
}
