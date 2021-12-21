import { Exercise, } from '../../Exercise';
import { NotesRange, randomFromList } from '../../utility';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { getNoteType } from '../../utility/music/notes/getNoteType';
import { BaseTonalExercise, } from '../utility/BaseTonalExercise';
import { NoteType } from '../../utility/music/notes/NoteType';
import * as _ from 'lodash';
import { getNoteOctave } from '../../utility/music/notes/getNoteOctave';
import { toNoteTypeNumber } from '../../utility/music/notes/toNoteTypeNumber';
import { noteTypeToNote } from '../../utility/music/notes/noteTypeToNote';
import { NotesInKeyExplanationComponent } from './notes-in-key-explanation/notes-in-key-explanation.component';
import { BaseCommonSettingsExerciseSettings } from '../utility/BaseCommonSettingsExercise';
import { numberOfSegmentsControlDescriptorList, NumberOfSegmentsSetting } from '../utility/NumberOfSegmentsSetting';
import {
  playAfterCorrectAnswerControlDescriptorList,
  PlayAfterCorrectAnswerSetting
} from '../utility/PlayAfterCorrectAnswerSetting';

export type SolfegeNote = 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Ti';

type NoteInKeySettings =
  BaseCommonSettingsExerciseSettings<SolfegeNote> &
  NumberOfSegmentsSetting &
  PlayAfterCorrectAnswerSetting;

const CMajor: { solfege: SolfegeNote, note: NoteType }[] = [
  {
    note: 'C',
    solfege: 'Do',
  },
  {
    note: 'D',
    solfege: 'Re',
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
    note: 'B',
    solfege: 'Ti',
  },
]
const noteInCToSolfege: { [note in NoteType]?: SolfegeNote } = _.mapValues(_.keyBy(CMajor, 'note'), 'solfege');
const solfegeToNoteInC: { [note in SolfegeNote]?: NoteType } = _.mapValues(_.keyBy(CMajor, 'solfege'), 'note');

export class NotesInKeyExercise extends BaseTonalExercise<SolfegeNote, NoteInKeySettings> {
  readonly id: string = 'noteInKey';
  readonly name: string = `Notes in Key`;
  readonly summary: string = `Recognise notes based on their tonal context in a major scale`;
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
      const noteOctave: number = getNoteOctave(randomQuestionInC.question);
      const noteType: NoteType = getNoteType(randomQuestionInC.question);
      if (toNoteTypeNumber(noteType) < toNoteTypeNumber('G')) {
        const range = new NotesRange(noteTypeToNote('C', noteOctave), randomQuestionInC.question);
        resolution = range.getAllNotes('C').reverse();
      } else {
        const range = new NotesRange(randomQuestionInC.question, noteTypeToNote('C', noteOctave + 1));
        resolution = range.getAllNotes('C');
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
    return this.rangeForKeyOfC.getAllNotes('C').map((note: Note): { answer: SolfegeNote; question: Note } => {
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
}
