import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { randomFromList } from '../../../shared/ts-utility';
import Exercise from '../../exercise-logic';
import {
  Interval,
  NotesRange,
  RomanNumeralChordSymbol,
  SolfegeNote,
  solfegeNoteToScaleDegree,
  toNoteNumber,
} from '../../utility';
import { Chord, Direction } from '../../utility/music/chords';
import { romanNumeralToChordInC } from '../../utility/music/harmony/romanNumeralToChordInC';
import { NoteType } from '../../utility/music/notes/NoteType';
import { scaleDegreeToNoteType } from '../../utility/music/scale-degrees/scaleDegreeToNoteType';
import { transpose } from '../../utility/music/transpose';
import { composeExercise } from '../utility/exerciseAttributes/composeExercise';
import { createExercise } from '../utility/exerciseAttributes/createExercise';
import {
  TonalExerciseSettings,
  TonalExerciseUtils,
  tonalExercise,
} from '../utility/exerciseAttributes/tonalExercise';
import {
  IncludedAnswersSettings,
  includedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import { NotesWithChordsExplanationComponent } from './notes-with-chords-explanation/notes-with-chords-explanation.component';

type ChordDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type NoteWithChord = `${SolfegeNote}${ChordDegree}`;

type HarmonyMode = 'triad' | 'seventh';

const noteWithChordDescriptorMap = ((): Partial<
  Record<
    NoteWithChord,
    {
      chord: Record<HarmonyMode, RomanNumeralChordSymbol>;
      solfegeNote: SolfegeNote;
    }
  >
> => {
  const I: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'I',
    seventh: 'Imaj7',
  };
  const ii: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'ii',
    seventh: 'ii7',
  };
  const iii: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'iii',
    seventh: 'iii7',
  };
  const IV: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'IV',
    seventh: 'IVmaj7',
  };
  const V: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'V',
    seventh: 'V7',
  };
  const vi: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'vi',
    seventh: 'vi7',
  };
  const viidim: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'viidim',
    seventh: 'viidim7',
  };

  return {
    Do1: {
      chord: I,
      solfegeNote: 'Do',
    },
    Do2: {
      chord: viidim,
      solfegeNote: 'Do',
    },
    Do3: {
      chord: vi,
      solfegeNote: 'Do',
    },
    Do4: {
      chord: V,
      solfegeNote: 'Do',
    },
    Do5: {
      chord: IV,
      solfegeNote: 'Do',
    },
    Do6: {
      chord: iii,
      solfegeNote: 'Do',
    },
    Do7: {
      chord: ii,
      solfegeNote: 'Do',
    },
    Re1: {
      chord: ii,
      solfegeNote: 'Re',
    },
    Re2: {
      chord: I,
      solfegeNote: 'Re',
    },
    Re3: {
      chord: viidim,
      solfegeNote: 'Re',
    },
    Re4: {
      chord: vi,
      solfegeNote: 'Re',
    },
    Re5: {
      chord: V,
      solfegeNote: 'Re',
    },
    Re6: {
      chord: IV,
      solfegeNote: 'Re',
    },
    Re7: {
      chord: iii,
      solfegeNote: 'Re',
    },
    Mi1: {
      chord: iii,
      solfegeNote: 'Mi',
    },
    Mi2: {
      chord: ii,
      solfegeNote: 'Mi',
    },
    Mi3: {
      chord: I,
      solfegeNote: 'Mi',
    },
    Mi4: {
      chord: viidim,
      solfegeNote: 'Mi',
    },
    Mi5: {
      chord: vi,
      solfegeNote: 'Mi',
    },
    Mi6: {
      chord: V,
      solfegeNote: 'Mi',
    },
    Mi7: {
      chord: IV,
      solfegeNote: 'Mi',
    },
    Fa1: {
      chord: IV,
      solfegeNote: 'Fa',
    },
    Fa2: {
      chord: iii,
      solfegeNote: 'Fa',
    },
    Fa3: {
      chord: ii,
      solfegeNote: 'Fa',
    },
    Fa4: {
      chord: I,
      solfegeNote: 'Fa',
    },
    Fa5: {
      chord: viidim,
      solfegeNote: 'Fa',
    },
    Fa6: {
      chord: vi,
      solfegeNote: 'Fa',
    },
    Fa7: {
      chord: V,
      solfegeNote: 'Fa',
    },
    Sol1: {
      chord: V,
      solfegeNote: 'Sol',
    },
    Sol2: {
      chord: IV,
      solfegeNote: 'Sol',
    },
    Sol3: {
      chord: iii,
      solfegeNote: 'Sol',
    },
    Sol4: {
      chord: ii,
      solfegeNote: 'Sol',
    },
    Sol5: {
      chord: I,
      solfegeNote: 'Sol',
    },
    Sol6: {
      chord: viidim,
      solfegeNote: 'Sol',
    },
    Sol7: {
      chord: vi,
      solfegeNote: 'Sol',
    },
    La1: {
      chord: vi,
      solfegeNote: 'La',
    },
    La2: {
      chord: V,
      solfegeNote: 'La',
    },
    La3: {
      chord: IV,
      solfegeNote: 'La',
    },
    La4: {
      chord: iii,
      solfegeNote: 'La',
    },
    La5: {
      chord: ii,
      solfegeNote: 'La',
    },
    La6: {
      chord: I,
      solfegeNote: 'La',
    },
    Ti1: {
      chord: viidim,
      solfegeNote: 'Ti',
    },
    Ti2: {
      chord: vi,
      solfegeNote: 'Ti',
    },
    Ti3: {
      chord: V,
      solfegeNote: 'Ti',
    },
    Ti4: {
      chord: IV,
      solfegeNote: 'Ti',
    },
    Ti5: {
      chord: iii,
      solfegeNote: 'Ti',
    },
    Ti6: {
      chord: ii,
      solfegeNote: 'Ti',
    },
    Ti7: {
      chord: I,
      solfegeNote: 'Ti',
    },
  };
})();

type NoteWithChordsSettings = TonalExerciseSettings &
  IncludedAnswersSettings<NoteWithChord> & {
    voiceMode: 'soprano' | 'bass';
    harmonyMode: HarmonyMode;
  };

export function notesWithChordsExercise() {
  const voiceModeToRange: Record<
    NoteWithChordsSettings['voiceMode'],
    NotesRange
  > = {
    soprano: new NotesRange('C4', 'G5'),
    bass: new NotesRange('G2', 'B3'),
  };
  return composeExercise(
    includedAnswersSettings<NoteWithChord>({
      defaultSelectedAnswers: ['Do1', 'Do3', 'Do5'],
    }),
    tonalExercise({
      cadenceTypeSelection: false,
    }),
    createExercise,
  )({
    settingsDescriptors: [
      {
        key: 'voiceMode',
        info:
          'With soprano mode, the note in question will be played on top. \n' +
          'With bass mode, the note in question will be played at the bottom (affectively changing the chord inversion)',
        descriptor: {
          label: 'Voice Mode',
          controlType: 'select',
          options: [
            {
              label: 'Soprano',
              value: 'soprano',
            },
            {
              label: 'Bass',
              value: 'bass',
            },
          ],
        },
      },
      {
        key: 'harmonyMode',
        info:
          'With triad mode, the chords will be triads. \n' +
          'With seventh mode, the chords will be seventh chords',
        descriptor: {
          label: 'Harmony Mode',
          controlType: 'select',
          options: [
            {
              label: 'Triad',
              value: 'triad',
            },
            {
              label: 'Seventh',
              value: 'seventh',
            },
          ],
        },
      },
    ],
    defaultSettings: {
      voiceMode: 'soprano',
      harmonyMode: 'triad',
    },
    id: 'notesWithChords',
    name: 'Scale Degrees With Chords',
    summary:
      '(previously "Notes With Chords")\n Identify scale degrees in the context of different diatonic chords',
    explanation: NotesWithChordsExplanationComponent,
    getQuestion(
      settings: NoteWithChordsSettings,
      tonalExerciseUtils: TonalExerciseUtils,
    ): Exclude<Exercise.NotesQuestion<NoteWithChord>, 'cadence'> {
      const randomAnswer: NoteWithChord = randomFromList(
        settings.includedAnswers,
      );
      const descriptor = noteWithChordDescriptorMap[randomAnswer];

      if (!descriptor) {
        throw new Error(`Missing descriptor for ${randomAnswer}`);
      }

      const chord: Chord = romanNumeralToChordInC(
        descriptor.chord[settings.harmonyMode],
      )!;
      const noteType: NoteType = scaleDegreeToNoteType(
        solfegeNoteToScaleDegree[descriptor.solfegeNote]!,
        'C',
      );

      let chordVoicing: Note[] = chord.getVoicing({
        position: randomFromList([0, 1, 2]),
        octave: 4,
        withBass: false,
      });

      const possibleNotesToSelect: Note[] = tonalExerciseUtils
        .getRangeForKeyOfC(voiceModeToRange[settings.voiceMode])
        .getAllNotes([noteType]);
      let note: Note = randomFromList(possibleNotesToSelect);

      if (settings.voiceMode === 'soprano') {
        while (toNoteNumber(note) < toNoteNumber(_.last(chordVoicing)!)) {
          chordVoicing = Chord.invertVoicing(chordVoicing, Direction.Down);
        }
      } else {
        while (toNoteNumber(note) > toNoteNumber(_.first(chordVoicing)!)) {
          chordVoicing = Chord.invertVoicing(chordVoicing, Direction.Up);
        }
      }

      if (settings.voiceMode === 'soprano') {
        let bass = chord.getBass();
        if (
          toNoteNumber(_.last(bass)!) > toNoteNumber(_.first(chordVoicing)!)
        ) {
          bass = transpose(bass, -Interval.Octave);
        }

        chordVoicing.unshift(...bass);
      }

      return {
        segments: [
          {
            rightAnswer: randomAnswer,
            partToPlay: [
              {
                notes: chordVoicing,
                velocity: 0.3,
                time: 0,
                duration: '2n',
              },
              {
                notes: [note],
                velocity: 1,
                time: 0,
                duration: '2n',
              },
            ],
          },
        ],
      };
    },
    answerList: ((): Exercise.AnswerList<NoteWithChord> => {
      const solfegeSyllables = [
        'Do',
        'Re',
        'Mi',
        'Fa',
        'Sol',
        'La',
        'Ti',
      ] as const;
      const chordDegrees = [1, 2, 3, 4, 5, 6, 7] as const;
      return {
        rows: chordDegrees.map((chordDegree) =>
          solfegeSyllables.map(
            (solfegeNote): NoteWithChord => `${solfegeNote}${chordDegree}`,
          ),
        ),
      };
    })(),
  });
}
