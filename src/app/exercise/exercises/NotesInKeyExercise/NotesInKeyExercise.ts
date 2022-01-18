import { Exercise, } from '../../Exercise';
import { NotesRange, randomFromList } from '../../utility';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { getNoteType } from '../../utility/music/notes/getNoteType';
import { NoteType } from '../../utility/music/notes/NoteType';
import { getNoteOctave } from '../../utility/music/notes/getNoteOctave';
import { toNoteTypeNumber } from '../../utility/music/notes/toNoteTypeNumber';
import { noteTypeToNote } from '../../utility/music/notes/noteTypeToNote';
import { NotesInKeyExplanationComponent } from './notes-in-key-explanation/notes-in-key-explanation.component';
import { numberOfSegmentsControlDescriptorList, NumberOfSegmentsSetting } from '../utility/NumberOfSegmentsSetting';
import {
  playAfterCorrectAnswerControlDescriptorList,
  PlayAfterCorrectAnswerSetting
} from '../utility/PlayAfterCorrectAnswerSetting';
import {
  BaseMelodicDictationExercise,
  BaseMelodicDictationExerciseSettings,
  IMelodicQuestion,
  noteInCToSolfege,
  SolfegeNote
} from '../utility/BaseMelodicDictationExercise';

type NoteInKeySettings =
  BaseMelodicDictationExerciseSettings &
  NumberOfSegmentsSetting &
  PlayAfterCorrectAnswerSetting;

export class NotesInKeyExercise extends BaseMelodicDictationExercise<NoteInKeySettings> {
  readonly id: string = 'noteInKey';
  readonly name: string = `Notes in Key`;
  readonly summary: string = `Identify notes based on their tonal context in a major scale`;
  readonly explanation = NotesInKeyExplanationComponent;
  readonly rangeForKeyOfC = new NotesRange('G2', 'E4');
  readonly questionOptionsInC: Note[] = this._getQuestionOptionsInC();

  override getMelodicQuestionInC(): IMelodicQuestion {
    const noteOptions: Note[] = this.questionOptionsInC.filter(questionOption => this._settings.includedAnswers.includes(noteInCToSolfege[getNoteType(questionOption)]!));
    const randomQuestionsInC: Note[] = Array.from(Array(this._settings.numberOfSegments)).map(() => randomFromList(noteOptions));

    // calculation resolution
    let resolution: Note[] = [];
    if (this._settings.numberOfSegments === 1 && this._settings.playAfterCorrectAnswer) {
      const randomQuestionInC: Note = randomQuestionsInC[0];

      /**
       * Temporary solution, in the future we should either automatically detect it, or enable the user to set it in the setting
       * */
      const detectedScale: NoteType[] = this._settings.cadenceType === 'I IV V I' ? ['C', 'D', 'E', 'F', 'G', 'A', 'B'] : ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B'];

      const noteOctave: number = getNoteOctave(randomQuestionInC);
      const noteType: NoteType = getNoteType(randomQuestionInC);
      if (toNoteTypeNumber(noteType) < toNoteTypeNumber('G')) {
        const range = new NotesRange(noteTypeToNote('C', noteOctave), randomQuestionInC);
        resolution = range.getAllNotes(detectedScale).reverse();
      } else {
        const range = new NotesRange(randomQuestionInC, noteTypeToNote('C', noteOctave + 1));
        resolution = range.getAllNotes(detectedScale);
      }

      if (resolution[0] !== randomQuestionInC) {
        resolution.unshift(randomQuestionInC);
      }
    }

    return {
      segments: randomQuestionsInC,
      afterCorrectAnswer: resolution.map((note, index) => ({
        partToPlay: [{
          notes: note,
          duration: index === 0 ? '4n' : index === resolution.length - 1 ? '2n' : '8n',
        }],
        answerToHighlight: noteInCToSolfege[getNoteType(note)],
      })),
    }
  }

  private _getQuestionOptionsInC(): Note[] {
    return this.rangeForKeyOfC.getAllNotes().filter((note: Note) => noteInCToSolfege[getNoteType(note)]);
  }

  protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<NoteInKeySettings>[] {
    return [
      ...super._getSettingsDescriptor(),
      ...numberOfSegmentsControlDescriptorList('notes'),
      ...playAfterCorrectAnswerControlDescriptorList({
        show: ((settings: NoteInKeySettings) => settings.numberOfSegments === 1),
      }),
    ];
  }

  protected override _getDefaultSettings(): NoteInKeySettings {
    return {
      ...super._getDefaultSettings(),
      numberOfSegments: 1,
      playAfterCorrectAnswer: true,
    };
  }

  protected override _getDefaultSelectedIncludedAnswers(): SolfegeNote[] {
    return [
      'Do',
      'Re',
      'Mi',
    ]
  }
}
