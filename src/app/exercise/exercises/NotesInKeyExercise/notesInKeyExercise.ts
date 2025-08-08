import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import Exercise from '../../exercise-logic';
import {
  DeepReadonly,
  Interval,
  NotesRange,
  ScaleDegree,
  SolfegeNote,
  getDiatonicScaleDegreeWithAccidental,
  getResolutionFromScaleDegree,
  getScaleDegreeFromNote,
  randomFromList,
  scaleDegreeToSolfegeNote,
  solfegeNoteToScaleDegree,
  toNoteNumber,
} from '../../utility';
import { NoteType } from '../../utility/music/notes/NoteType';
import { getNoteOctave } from '../../utility/music/notes/getNoteOctave';
import { getNoteType } from '../../utility/music/notes/getNoteType';
import { noteTypeToNote } from '../../utility/music/notes/noteTypeToNote';
import { noteTypeToScaleDegree } from '../../utility/music/scale-degrees/noteTypeToScaleDegree';
import { scaleDegreeToNoteType } from '../../utility/music/scale-degrees/scaleDegreeToNoteType';
import { transpose } from '../../utility/music/transpose';
import { composeExercise } from '../utility/exerciseAttributes/composeExercise';
import { createExercise } from '../utility/exerciseAttributes/createExercise';
import {
  IMelodicQuestion,
  MelodicDictationExerciseSettings,
  melodicExercise,
} from '../utility/exerciseAttributes/melodicDictationExercise';
import { TonalExerciseUtils } from '../utility/exerciseAttributes/tonalExercise';
import {
  IncludedAnswersSettings,
  includedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import {
  NumberOfSegmentsSetting,
  numberOfSegmentsControlDescriptorList,
} from '../utility/settings/NumberOfSegmentsSetting';
import {
  PlayAfterCorrectAnswerSetting,
  playAfterCorrectAnswerControlDescriptorList,
} from '../utility/settings/PlayAfterCorrectAnswerSetting';
import { NotesInKeyExplanationComponent } from './notes-in-key-explanation/notes-in-key-explanation.component';

type DiatonicIntervalCode =
  | '1'
  | '2'
  | '3'
  | '4'
  | '4#'
  | '5'
  | '6'
  | '7'
  | '8';

const diatonicIntervalCodeToIntervals: Record<
  DiatonicIntervalCode,
  Interval[]
> = {
  '1': [Interval.Unison],
  '2': [Interval.MinorSecond, Interval.MajorSecond],
  '3': [Interval.MinorThird, Interval.MajorThird],
  '4': [Interval.PerfectFourth],
  '4#': [Interval.AugmentedForth],
  '5': [Interval.PerfectFifth],
  '6': [Interval.MinorSixth, Interval.MajorSixth],
  '7': [Interval.MinorSeventh, Interval.MajorSeventh],
  '8': [Interval.Octave],
};

const diatonicIntervalAnswerList: Exercise.AnswerList<string> = {
  rows: [
    [
      { answer: '1', displayLabel: '1<sup>st</sup>' },
      { answer: '2', displayLabel: '2<sup>nd</sup>' },
      { answer: '3', displayLabel: '3<sup>rd</sup>' },
      { answer: '4', displayLabel: '4<sup>th</sup>' },
      { answer: '4#', displayLabel: 'aug4<sup>th</sup>' },
      { answer: '5', displayLabel: '5<sup>th</sup>' },
      { answer: '6', displayLabel: '6<sup>th</sup>' },
      { answer: '7', displayLabel: '7<sup>th</sup>' },
      { answer: '8', displayLabel: '8<sup>th</sup>' },
    ],
  ],
};

export type NoteInKeySettings = IncludedAnswersSettings<SolfegeNote> &
  MelodicDictationExerciseSettings &
  NumberOfSegmentsSetting &
  PlayAfterCorrectAnswerSetting & {
    notesRange: 'high' | 'middle' | 'bass' | 'contrabass';
    numberOfVoices: 1 | 2 | 3;
    harmonicIntervals: DiatonicIntervalCode[];
    melodicIntervals: DiatonicIntervalCode[];
  };

export function notesInKeyExercise() {
  const rangeOptionToNotesRange: {
    [range in NoteInKeySettings['notesRange']]: NotesRange;
  } = {
    high: new NotesRange('C4', 'G6'),
    middle: new NotesRange('G2', 'E4'),
    bass: new NotesRange('A1', 'C3'),
    contrabass: new NotesRange('Eb1', 'Eb2'),
  };

  const voiceRangeGap: Interval = Interval.MajorThird;

  function getSolfegeNoteOfNoteInC(note: Note): SolfegeNote {
    return scaleDegreeToSolfegeNote[
      noteTypeToScaleDegree(getNoteType(note), 'C')
    ];
  }

  return composeExercise(
    melodicExercise(),
    includedAnswersSettings<SolfegeNote>({
      defaultSelectedAnswers: ['Do', 'Re', 'Mi'],
      name: 'Scale Degrees',
    }),
    createExercise,
  )({
    id: 'noteInKey',
    name: `Scale Degrees`,
    summary: `Identify monophonic notes based on their tonal context in a particular key`,
    explanation: NotesInKeyExplanationComponent,
    getMelodicQuestionInC(
      settings: NoteInKeySettings,
      tonalExerciseUtils: TonalExerciseUtils,
    ): IMelodicQuestion {
      function getNoteOptionsFromRange(notesRange: NotesRange): Note[] {
        const rangeForKeyOfC: NotesRange =
          tonalExerciseUtils.getRangeForKeyOfC(notesRange);
        return rangeForKeyOfC
          .getAllNotes()
          .filter((questionOption) =>
            settings.includedAnswers.includes(
              getSolfegeNoteOfNoteInC(questionOption),
            ),
          );
      }

      const notesRange = rangeOptionToNotesRange[settings.notesRange];
      // if we want to add more voices below, we need to limit how low the top voice can go
      const topVoiceRange = new NotesRange(
        transpose(
          notesRange.lowestNoteName,
          voiceRangeGap * (settings.numberOfVoices - 1),
        ),
        notesRange.highestNoteName,
      );
      const noteOptions = getNoteOptionsFromRange(topVoiceRange);

      const permittedMelodicIntervals = _.flatMap(
        settings.melodicIntervals,
        (code) => diatonicIntervalCodeToIntervals[code],
      );

      let randomNotesInC: Note[] = [];
      let previousNote = randomFromList(noteOptions);
      randomNotesInC.push(previousNote);
      while (randomNotesInC.length < settings.numberOfSegments) {
        const options = noteOptions.filter((candidate) => {
          return permittedMelodicIntervals.includes(
            Math.abs(toNoteNumber(candidate) - toNoteNumber(previousNote)),
          );
        });
        previousNote = randomFromList(options);
        randomNotesInC.push(previousNote);
      }
      const randomQuestionInC: Note[][] = [randomNotesInC];

      const permittedHarmonicIntervals: Interval[] = _.flatMap(
        settings.harmonicIntervals,
        (code) => diatonicIntervalCodeToIntervals[code],
      );
      let currentVoiceRange: NotesRange = notesRange;
      while (randomQuestionInC.length < settings.numberOfVoices) {
        const lastVoice = _.last(randomQuestionInC)!;
        currentVoiceRange = transpose(currentVoiceRange, -voiceRangeGap);
        const noteOptionsForLowerVoice: Note[] =
          getNoteOptionsFromRange(currentVoiceRange);
        const lowerVoice = lastVoice.map((note: Note) => {
          const options: Note[] = noteOptionsForLowerVoice.filter((option) => {
            const interval: number = toNoteNumber(note) - toNoteNumber(option);
            // since all intervals are positive, this also verifies the new voice is lower
            return permittedHarmonicIntervals.includes(interval);
          });
          if (_.isEmpty(options)) {
            console.error(
              `No options for note ${note} in range ${currentVoiceRange.lowestNoteName} - ${currentVoiceRange.highestNoteName}`,
            );
            options.push(note);
          }
          return randomFromList(options);
        });
        randomQuestionInC.push(lowerVoice);
      }

      // calculation resolution
      let resolution: Note[] = [];
      if (
        settings.numberOfSegments === 1 &&
        settings.numberOfVoices === 1 &&
        settings.playAfterCorrectAnswer
      ) {
        const note: Note = randomNotesInC[0];

        const scaleDegree: ScaleDegree = getScaleDegreeFromNote('C', note);
        const resolutionInScaleDegrees: DeepReadonly<ScaleDegree[]> =
          getResolutionFromScaleDegree(
            scaleDegree,
            settings.includedAnswers.map(
              (solfege) => solfegeNoteToScaleDegree[solfege],
            ),
            settings.cadenceType,
          );
        const resolutionInNoteTypes: NoteType[] = resolutionInScaleDegrees.map(
          (scaleDegree) => scaleDegreeToNoteType(scaleDegree, 'C'),
        );
        let octaveNumber = getNoteOctave(note);
        resolution = resolutionInNoteTypes.map((noteType) =>
          noteTypeToNote(noteType, octaveNumber),
        );
        /**
         * For resolutions up the last note should be an octave above
         * (It's not ideal that this needs to be done manually. We should reconsider this)
         * */
        if (
          getDiatonicScaleDegreeWithAccidental(scaleDegree)
            .diatonicScaleDegree >= 5
        ) {
          resolution[resolution.length - 1] = transpose(
            resolution[resolution.length - 1],
            Interval.Octave,
          );
        }
      }

      return {
        segments: randomQuestionInC,
        afterCorrectAnswer: resolution.map((note, index) => ({
          partToPlay: [
            {
              notes: note,
              duration:
                index === 0
                  ? '4n'
                  : index === resolution.length - 1
                    ? '2n'
                    : '8n',
            },
          ],
          answerToHighlight: getSolfegeNoteOfNoteInC(note),
        })),
      };
    },
    settingsDescriptors: [
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
        key: 'randomizeRhythm',
        info: 'When on, each note will be given a random musical duration (8th, quarter, dotted quarter, half).',
        descriptor: {
          controlType: 'checkbox',
          label: 'Randomize Rhythm',
        },
      },
      {
        key: 'notesRange',
        info: 'Choose how high or low the notes will be played',
        descriptor: ((): Exercise.SelectControlDescriptor<
          NoteInKeySettings['notesRange']
        > => {
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
          };
        })(),
      },
      ...numberOfSegmentsControlDescriptorList('notes'),
      {
        show: (settings: NoteInKeySettings) => settings.numberOfSegments > 1,
        key: 'melodicIntervals',
        info:
          'Choose which intervals can be used melodically (between consecutive notes).\n' +
          'Note that the intervals are tonal, so 3<sup>rd</sup> can be both a major 3<sup>rd</sup> and a minor 3<sup>rd</sup>.',
        descriptor: {
          label: 'Melodic Intervals',
          controlType: 'included-answers',
          answerList: diatonicIntervalAnswerList,
        },
      },
      {
        key: 'numberOfVoices',
        info: 'Choose how many notes will be played simultaneously',
        descriptor: {
          label: 'Number of voices',
          controlType: 'slider',
          min: 1,
          max: 3,
          step: 1,
        },
      },
      {
        show: (settings: NoteInKeySettings) => settings.numberOfVoices > 1,
        key: 'harmonicIntervals',
        info:
          'Choose which intervals can be played harmonically (between voices)\n' +
          'Note that the intervals are tonal, so 3<sup>rd</sup> can be both a major 3<sup>rd</sup> and a minor 3<sup>rd</sup>.',
        descriptor: {
          label: 'Harmonic Intervals',
          controlType: 'included-answers',
          /**
           * Note here it's not really "answers" but we are still using the same component,
           * this should be renamed to be more generic
           * */
          answerList: diatonicIntervalAnswerList,
        },
      },
      ...playAfterCorrectAnswerControlDescriptorList({
        show: (settings: NoteInKeySettings) =>
          settings.numberOfSegments === 1 && settings.numberOfVoices === 1,
      }),
    ],
    defaultSettings: {
      numberOfSegments: 1,
      numberOfVoices: 1,
      playAfterCorrectAnswer: true,
      notesRange: 'middle',
      displayMode: 'numeral',
      randomizeRhythm: false,
      harmonicIntervals: ['3', '4', '5', '6', '8'],
      melodicIntervals: ['2', '3', '4', '4#', '5', '6', '7', '8'],
    },
  });
}
