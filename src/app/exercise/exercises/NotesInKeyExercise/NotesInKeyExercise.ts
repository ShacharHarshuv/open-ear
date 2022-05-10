import { Exercise } from '../../Exercise';
import {
  NotesRange,
  randomFromList,
} from '../../utility';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { getNoteType } from '../../utility/music/notes/getNoteType';
import { NoteType } from '../../utility/music/notes/NoteType';
import { getNoteOctave } from '../../utility/music/notes/getNoteOctave';
import { toNoteTypeNumber } from '../../utility/music/notes/toNoteTypeNumber';
import { noteTypeToNote } from '../../utility/music/notes/noteTypeToNote';
import { NotesInKeyExplanationComponent } from './notes-in-key-explanation/notes-in-key-explanation.component';
import {
  numberOfSegmentsControlDescriptorList,
  NumberOfSegmentsSetting,
} from '../utility/NumberOfSegmentsSetting';
import {
  playAfterCorrectAnswerControlDescriptorList,
  PlayAfterCorrectAnswerSetting,
} from '../utility/PlayAfterCorrectAnswerSetting';
import {
  BaseMelodicDictationExercise,
  BaseMelodicDictationExerciseSettings,
  IMelodicQuestion,
  noteInCToSolfege,
  SolfegeNote,
} from '../utility/BaseMelodicDictationExercise';
import { transpose } from '../../utility/music/transpose';
import { getDistanceOfKeys } from '../../utility/music/keys/getDistanceOfKeys';

type NoteInKeySettings =
  BaseMelodicDictationExerciseSettings &
  NumberOfSegmentsSetting &
  PlayAfterCorrectAnswerSetting & {
    notesRange: 'high' | 'middle' | 'bass' | 'contrabass',
    displayMode: 'solfege' | 'numeral',
  };

type NoteInKeyDisplayMode = 'solfege' | 'numeral';

export class NotesInKeyExercise extends BaseMelodicDictationExercise<NoteInKeySettings> {
  readonly id: string = 'noteInKey';
  readonly name: string = `Scale Degrees`;
  readonly summary: string = `Identify monophonic notes based on their tonal context in a particular key`;
  readonly explanation = NotesInKeyExplanationComponent;
  static readonly rangeOptionToNotesRange: {[range in NoteInKeySettings['notesRange']]: NotesRange} = {
    high: new NotesRange('C4', 'G6'),
    middle: new NotesRange('G2', 'E4'),
    bass: new NotesRange('A1', 'C3'),
    contrabass: new NotesRange('Eb1', 'Eb2'),
  }
  static readonly displayModeToAnswerDisplayMap: {[mode in NoteInKeyDisplayMode]?: {[note in SolfegeNote]: string}} = {
    numeral: {
      Do: '1',
      Re: '2',
      Me: '♭3',
      Mi: '3',
      Fa: '4',
      Sol: '5',
      Le: '♭6',
      La: '6',
      Te: '♭7',
      Ti: '7',
    }
  }

  private get _rangeForKeyOfC(): NotesRange {
    return transpose(NotesInKeyExercise.rangeOptionToNotesRange[this._settings.notesRange], getDistanceOfKeys('C', this.key));
  }

  override getMelodicQuestionInC(): IMelodicQuestion {
    const noteOptions: Note[] = this._getQuestionOptionsInC().filter(questionOption => this._settings.includedAnswers.includes(noteInCToSolfege[getNoteType(questionOption)]!));
    let randomQuestionsInC: Note[] = Array.from(Array(this._settings.numberOfSegments)).map(() => randomFromList(noteOptions));

    // calculation resolution
    let resolution: Note[] = [];
    if (this._settings.numberOfSegments === 1 && this._settings.playAfterCorrectAnswer) {
      const randomQuestionInC: Note = randomQuestionsInC[0];

      /**
       * Temporary solution, in the future we should either automatically detect it, or enable the user to set it in the setting
       * */
      const detectedScale: NoteType[] = this._detectScale();

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

  getAnswerDisplay(answer: SolfegeNote): string {
    return NotesInKeyExercise.displayModeToAnswerDisplayMap[this._settings.displayMode]?.[answer] ?? answer;
  }

  private _getQuestionOptionsInC(): Note[] {
    return this._rangeForKeyOfC.getAllNotes().filter((note: Note) => noteInCToSolfege[getNoteType(note)]);
  }

  protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<NoteInKeySettings>[] {
    return [
      ...super._getSettingsDescriptor(),
      {
        key: 'displayMode',
        info: 'Choose how the scale degrees are noted. <br>(This setting will apply only after you close the settings page.)',
        descriptor: {
          label: 'Display',
          controlType: 'SELECT',
          options: [
            {
              label: 'Numbers',
              value: 'numeral',
            },
            {
              label: 'Movable-Do',
              value: 'solfege',
            }
          ]
        }
      },
      {
        key: 'notesRange',
        info: 'Choose how high or low the notes will be played',
        descriptor: ((): Exercise.SelectControlDescriptor<NoteInKeySettings['notesRange']> => {
          return {
            controlType: 'SELECT',
            label: 'Range',
            options: [
              {
                label: 'High',
                value: 'high',
              },
              {
                label: 'Middle',
                value: 'middle',
              },
              {
                label: 'Bass',
                value: 'bass',
              },
              {
                label: 'Contra Bass',
                value: 'contrabass',
              }
          ]
          }
        })()
      },
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
      notesRange: 'middle',
      displayMode: 'numeral',
    };
  }

  protected override _getDefaultSelectedIncludedAnswers(): SolfegeNote[] {
    return [
      'Do',
      'Re',
      'Mi',
    ]
  }

  private _detectScale(): NoteType[] {
    if (this._settings.cadenceType === 'I IV V I') {
      return ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    } else {
      if (this._settings.includedAnswers.includes('Te')) {
        return ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'];
      } else {
        return ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B'];
      }
    }
  }
}
