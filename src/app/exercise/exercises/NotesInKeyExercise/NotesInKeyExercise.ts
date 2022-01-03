import { Exercise, } from '../../Exercise';
import { NotesRange, randomFromList } from '../../utility';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { getNoteType } from '../../utility/music/notes/getNoteType';
import { BaseTonalExercise, BaseTonalExerciseSettings, } from '../utility/BaseTonalExercise';
import { NoteType } from '../../utility/music/notes/NoteType';
import * as _ from 'lodash';
import { getNoteOctave } from '../../utility/music/notes/getNoteOctave';
import { toNoteTypeNumber } from '../../utility/music/notes/toNoteTypeNumber';
import { noteTypeToNote } from '../../utility/music/notes/noteTypeToNote';
import { NotesInKeyExplanationComponent } from './notes-in-key-explanation/notes-in-key-explanation.component';
import { numberOfSegmentsControlDescriptorList, NumberOfSegmentsSetting } from '../utility/NumberOfSegmentsSetting';
import {
  playAfterCorrectAnswerControlDescriptorList,
  PlayAfterCorrectAnswerSetting
} from '../utility/PlayAfterCorrectAnswerSetting';

export type SolfegeNote = 'Do' | 'Re' | 'Me' | 'Mi' | 'Fa' | 'Sol' | 'Le' | 'La' | 'Te' | 'Ti';

type NoteInKeySettings =
  BaseTonalExerciseSettings<SolfegeNote> &
  NumberOfSegmentsSetting &
  PlayAfterCorrectAnswerSetting;

const solfegeNotesInC: { solfege: SolfegeNote, note: NoteType }[] = [
  {
    note: 'C',
    solfege: 'Do',
  },
  {
    note: 'D',
    solfege: 'Re',
  },
  {
    note: 'D#', // using sharps to avoid ambiguity even when musically incorrect
    solfege: 'Me',
  },
  {
    note: 'E',
    solfege: 'Mi',
  },
  {
    note: 'E',
    solfege: 'Mi',
  },
  {
    note: 'F',
    solfege: 'Fa',
  },
  {
    note: 'G',
    solfege: 'Sol',
  },
  {
    note: 'A',
    solfege: 'La',
  },
  {
    note: 'G#',
    solfege: 'Le',
  },
  {
    note: 'A#',
    solfege: 'Te',
  },
  {
    note: 'B',
    solfege: 'Ti',
  },
]
const noteInCToSolfege: { [note in NoteType]?: SolfegeNote } = _.mapValues(_.keyBy(solfegeNotesInC, 'note'), 'solfege');

export class NotesInKeyExercise extends BaseTonalExercise<SolfegeNote, NoteInKeySettings> {
  readonly id: string = 'noteInKey';
  readonly name: string = `Notes in Key`;
  readonly summary: string = `Identify notes based on their tonal context in a major scale`;
  readonly explanation = NotesInKeyExplanationComponent;
  readonly rangeForKeyOfC = new NotesRange('G2', 'E4');
  readonly questionOptionsInC: { answer: SolfegeNote; question: Note }[] = this._getQuestionOptionsInC();

  getQuestionInC(): Exclude<Exercise.Question<SolfegeNote>, 'cadence'> {
    const randomQuestionsInC: { answer: SolfegeNote; question: Note }[] = Array.from(Array(this._settings.numberOfSegments))
      .map(() => randomFromList(this.questionOptionsInC.filter(questionOption => this._settings.includedAnswers.includes(questionOption.answer))));

    // calculation resolution
    let resolution: Note[] = [];
    if (this._settings.numberOfSegments === 1 && this._settings.playAfterCorrectAnswer) {
      const randomQuestionInC = randomQuestionsInC[0];

      /**
       * Temporary solution, in the future we should either automatically detect it, or enable the user to set it in the setting
       * */
      const detectedScale: NoteType[] = this._settings.cadenceType === 'I IV V I' ? ['C', 'D', 'E', 'F', 'G', 'A', 'B'] : ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B'];

      const noteOctave: number = getNoteOctave(randomQuestionInC.question);
      const noteType: NoteType = getNoteType(randomQuestionInC.question);
      if (toNoteTypeNumber(noteType) < toNoteTypeNumber('G')) {
        const range = new NotesRange(noteTypeToNote('C', noteOctave), randomQuestionInC.question);
        resolution = range.getAllNotes(detectedScale).reverse();
      } else {
        const range = new NotesRange(randomQuestionInC.question, noteTypeToNote('C', noteOctave + 1));
        resolution = range.getAllNotes(detectedScale);
      }

      if (resolution[0] !== randomQuestionInC.question) {
        resolution.unshift(randomQuestionInC.question);
      }
    }

    return {
      segments: randomQuestionsInC.map(randomQuestionInC => ({
        rightAnswer: randomQuestionInC.answer,
        partToPlay: [{
          notes: randomQuestionInC.question,
          duration: '2n',
        }],
      })),
      afterCorrectAnswer: resolution.map((note, index) => ({
        partToPlay: [{
          notes: note,
          duration: index === 0 ? '4n' : index === resolution.length - 1 ? '2n' : '8n',
        }],
        answerToHighlight: noteInCToSolfege[getNoteType(note)],
      })),
    }
  }

  protected _getAllAnswersList(): Exercise.AnswerList<SolfegeNote> {
    return {
      rows: [
        [
          {
            answer: null,
            space: 0.58
          },
          null, // Ra (to be added in the future to support more modes)
          'Me',
          null,
          null, // Fi / Se (to be added in the future to support more modes)
          'Le',
          'Te',
          {
            answer: null,
            space: 0.58,
          },
          null,
        ],
        [
          'Do',
          'Re',
          'Mi',
          'Fa',
          'Sol',
          'La',
          'Ti',
          'Do',
        ],
      ],
    }
  }

  private _getQuestionOptionsInC(): { answer: SolfegeNote; question: Note }[] {
    return this.rangeForKeyOfC.getAllNotes()
    .filter((note: Note) => noteInCToSolfege[getNoteType(note)])
    .map((note: Note): { answer: SolfegeNote; question: Note } => {
      return {
        question: note,
        answer: noteInCToSolfege[getNoteType(note)]!,
      }
    });
  }

  /**
   * @override
   * */
  protected _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<NoteInKeySettings>[] {
    return [
      ...super._getSettingsDescriptor(),
      ...numberOfSegmentsControlDescriptorList('notes'),
      ...playAfterCorrectAnswerControlDescriptorList({
        show: ((settings: NoteInKeySettings) => settings.numberOfSegments === 1),
      }),
    ];
  }

  /**
   * @override
   * */
  protected _getDefaultSettings(): NoteInKeySettings {
    return {
      ...super._getDefaultSettings(),
      numberOfSegments: 1,
      playAfterCorrectAnswer: true,
    };
  }

  /**
   * @Override
   * */
  protected _getIncludedAnswersOptions(): SolfegeNote[] {
    return [
      'Do',
      'Re',
      'Me',
      'Mi',
      'Fa',
      'Sol',
      'Le',
      'La',
      'Te',
      'Ti',
    ]
  }

  /**
   * @Override
   * */
  protected _getDefaultSelectedIncludedAnswers(): SolfegeNote[] {
    return [
      'Do',
      'Re',
      'Mi',
    ]
  }
}
