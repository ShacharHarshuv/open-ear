import { Exercise } from '../../Exercise';
import {
  NotesRange,
  randomFromList,
  SolfegeNote,
  scaleDegreeToSolfegeNote,
  getResolutionFromScaleDegree,
  getScaleDegreeFromNote,
  solfegeNoteToScaleDegree,
  ScaleDegree,
  DeepReadonly,
  getDiatonicScaleDegreeWithAccidental,
  Interval,
} from '../../utility';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { getNoteType } from '../../utility/music/notes/getNoteType';
import { NoteType } from '../../utility/music/notes/NoteType';
import { getNoteOctave } from '../../utility/music/notes/getNoteOctave';
import { noteTypeToNote } from '../../utility/music/notes/noteTypeToNote';
import { NotesInKeyExplanationComponent } from './notes-in-key-explanation/notes-in-key-explanation.component';
import {
  MelodicDictationExerciseSettings,
  BaseMelodicDictationExercise,
  IMelodicQuestion,
} from '../utility/exerciseAttributes/melodicDictationExercise';
import {
  NumberOfSegmentsSetting,
  numberOfSegmentsControlDescriptorList,
} from '../utility/settings/NumberOfSegmentsSetting';
import {
  PlayAfterCorrectAnswerSetting,
  playAfterCorrectAnswerControlDescriptorList,
} from '../utility/settings/PlayAfterCorrectAnswerSetting';
import {
  IncludedAnswersSetting,
  IncludedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import { CadenceTypeSetting } from '../utility/settings/CadenceTypeSetting';
import { noteTypeToScaleDegree } from '../../utility/music/scale-degrees/noteTypeToScaleDegree';
import { scaleDegreeToNoteType } from '../../utility/music/scale-degrees/scaleDegreeToNoteType';
import { transpose } from '../../utility/music/transpose';

type NoteInKeySettings =
  IncludedAnswersSettings<SolfegeNote> &
  MelodicDictationExerciseSettings &
  NumberOfSegmentsSetting &
  PlayAfterCorrectAnswerSetting & {
  notesRange: 'high' | 'middle' | 'bass' | 'contrabass',
};

@CadenceTypeSetting<NoteInKeySettings>()
@IncludedAnswersSetting<SolfegeNote, NoteInKeySettings>({
  default: [
    'Do',
    'Re',
    'Mi',
  ],
})
export class NotesInKeyExercise extends BaseMelodicDictationExercise<NoteInKeySettings> {
  readonly id: string = 'noteInKey';
  readonly name: string = `Scale Degrees`;
  readonly summary: string = `Identify monophonic notes based on their tonal context in a particular key`;
  readonly explanation = NotesInKeyExplanationComponent;
  static readonly rangeOptionToNotesRange: { [range in NoteInKeySettings['notesRange']]: NotesRange } = {
    high: new NotesRange('C4', 'G6'),
    middle: new NotesRange('G2', 'E4'),
    bass: new NotesRange('A1', 'C3'),
    contrabass: new NotesRange('Eb1', 'Eb2'),
  }

  private get _rangeForKeyOfC(): NotesRange {
    return this._getRangeForKeyOfC(NotesInKeyExercise.rangeOptionToNotesRange[this._settings.notesRange]);
  }

  private _getSolfegeNoteOfNoteInC(note: Note): SolfegeNote {
    return scaleDegreeToSolfegeNote[noteTypeToScaleDegree(getNoteType(note), 'C')];
  }

  override getMelodicQuestionInC(): IMelodicQuestion {
    const noteOptions: Note[] = this._getQuestionOptionsInC().filter(questionOption => this._settings.includedAnswers.includes(this._getSolfegeNoteOfNoteInC(questionOption)));
    let randomQuestionsInC: Note[] = Array.from(Array(this._settings.numberOfSegments)).map(() => randomFromList(noteOptions));

    // calculation resolution
    let resolution: Note[] = [];
    if (this._settings.numberOfSegments === 1 && this._settings.playAfterCorrectAnswer) {
      const note: Note = randomQuestionsInC[0];

      const scaleDegree: ScaleDegree = getScaleDegreeFromNote('C', note);
      const resolutionInScaleDegrees: DeepReadonly<ScaleDegree[]> = getResolutionFromScaleDegree(
        scaleDegree,
        this._settings.includedAnswers.map(solfege => solfegeNoteToScaleDegree[solfege]),
        this._settings.cadenceType,
      );
      const resolutionInNoteTypes: NoteType[] = resolutionInScaleDegrees.map(scaleDegree => scaleDegreeToNoteType(scaleDegree, 'C'));
      let octaveNumber = getNoteOctave(note);
      resolution = resolutionInNoteTypes.map(noteType => noteTypeToNote(noteType, octaveNumber));
      /**
       * For resolutions up the last note should be an octave above
       * (It's not ideal that this needs to be done manually. We should reconsider this)
       * */
      if (getDiatonicScaleDegreeWithAccidental(scaleDegree).diatonicScaleDegree >= 5) {
        resolution[resolution.length - 1] = transpose(resolution[resolution.length - 1], Interval.Octave);
      }
    }

    return {
      segments: randomQuestionsInC,
      afterCorrectAnswer: resolution.map((note, index) => ({
        partToPlay: [{
          notes: note,
          duration: index === 0 ? '4n' : index === resolution.length - 1 ? '2n' : '8n',
        }],
        answerToHighlight: this._getSolfegeNoteOfNoteInC(note),
      })),
    }
  }

  private _getQuestionOptionsInC(): Note[] {
    return this._rangeForKeyOfC.getAllNotes().filter((note: Note) => this._getSolfegeNoteOfNoteInC(note));
  }

  override getSettingsDescriptor(): Exercise.SettingsControlDescriptor<NoteInKeySettings>[] {
    return [
      ...super.getSettingsDescriptor(),
      {
        key: 'displayMode',
        info: 'Choose how the scale degrees are noted. <br>(This setting will apply only after you close the settings page.)',
        descriptor: {
          label: 'Display',
          controlType: 'select',
          options: [
            {
              label: 'Numbers',
              value: 'numeral',
            },
            {
              label: 'Movable-Do',
              value: 'solfege',
            },
          ],
        },
      },
      {
        key: 'notesRange',
        info: 'Choose how high or low the notes will be played',
        descriptor: ((): Exercise.SelectControlDescriptor<NoteInKeySettings['notesRange']> => {
          return {
            controlType: 'select',
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
              },
            ],
          }
        })(),
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
}
