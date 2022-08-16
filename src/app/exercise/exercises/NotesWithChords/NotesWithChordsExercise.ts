import {
  TonalExerciseSettings,
  tonalExercise,
  TonalExerciseUtils,
} from '../utility/exerciseAttributes/tonalExercise';
import { Exercise } from '../../Exercise';
import { randomFromList } from '../../../shared/ts-utility';
import {
  Chord,
  Direction,
} from '../../utility/music/chords';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteType } from '../../utility/music/notes/NoteType';
import {
  Interval,
  toNoteNumber,
  NotesRange,
  RomanNumeralChordSymbol,
  SolfegeNote,
  solfegeNoteToScaleDegree,
} from '../../utility';
import { transpose } from '../../utility/music/transpose';
import * as _ from 'lodash';
import { NotesWithChordsExplanationComponent } from './notes-with-chords-explanation/notes-with-chords-explanation.component';
import {
  IncludedAnswersSettings,
  includedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import { scaleDegreeToNoteType } from '../../utility/music/scale-degrees/scaleDegreeToNoteType';
import { composeExercise } from '../utility/exerciseAttributes/composeExercise';
import { createExercise } from '../utility/exerciseAttributes/createExercise';
import { romanNumeralToChordInC } from '../../utility/music/harmony/romanNumeralToChordInC';

type ChordDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type NoteWithChord = `${SolfegeNote}${ChordDegree}`;

const noteWithChordDescriptorMap: {
  [noteWithHarmonicContext in NoteWithChord]?: {
    chord: RomanNumeralChordSymbol,
    solfegeNote: SolfegeNote,
  }
} = {
  Do1: {
    chord: 'I',
    solfegeNote: 'Do',
  },
  Do2: {
    chord: 'viidim',
    solfegeNote: 'Do',
  },
  Do3: {
    chord: 'vi',
    solfegeNote: 'Do',
  },
  Do4: {
    chord: 'V',
    solfegeNote: 'Do',
  },
  Do5: {
    chord: 'IV',
    solfegeNote: 'Do',
  },
  Do6: {
    chord: 'iii',
    solfegeNote: 'Do',
  },
  Do7: {
    chord: 'ii',
    solfegeNote: 'Do',
  },
  Re1: {
    chord: 'ii',
    solfegeNote: 'Re',
  },
  Re2: {
    chord: 'I',
    solfegeNote: 'Re',
  },
  Re3: {
    chord: 'viidim',
    solfegeNote: 'Re',
  },
  Re4: {
    chord: 'vi',
    solfegeNote: 'Re',
  },
  Re5: {
    chord: 'V',
    solfegeNote: 'Re',
  },
  Re6: {
    chord: 'IV',
    solfegeNote: 'Re',
  },
  Re7: {
    chord: 'iii',
    solfegeNote: 'Re',
  },
  Mi1: {
    chord: 'iii',
    solfegeNote: 'Mi',
  },
  Mi2: {
    chord: 'ii',
    solfegeNote: 'Mi',
  },
  Mi3: {
    chord: 'I',
    solfegeNote: 'Mi',
  },
  Mi4: {
    chord: 'viidim',
    solfegeNote: 'Mi',
  },
  Mi5: {
    chord: 'vi',
    solfegeNote: 'Mi',
  },
  Mi6: {
    chord: 'V',
    solfegeNote: 'Mi',
  },
  Mi7: {
    chord: 'IV',
    solfegeNote: 'Mi',
  },
  Fa1: {
    chord: 'IV',
    solfegeNote: 'Fa',
  },
  Fa2: {
    chord: 'iii',
    solfegeNote: 'Fa',
  },
  Fa3: {
    chord: 'ii',
    solfegeNote: 'Fa',
  },
  Fa4: {
    chord: 'I',
    solfegeNote: 'Fa',
  },
  Fa5: {
    chord: 'viidim',
    solfegeNote: 'Fa',
  },
  Fa6: {
    chord: 'vi',
    solfegeNote: 'Fa',
  },
  Fa7: {
    chord: 'V',
    solfegeNote: 'Fa',
  },
  Sol1: {
    chord: 'V',
    solfegeNote: 'Sol',
  },
  Sol2: {
    chord: 'IV',
    solfegeNote: 'Sol',
  },
  Sol3: {
    chord: 'iii',
    solfegeNote: 'Sol',
  },
  Sol4: {
    chord: 'ii',
    solfegeNote: 'Sol',
  },
  Sol5: {
    chord: 'I',
    solfegeNote: 'Sol',
  },
  Sol6: {
    chord: 'viidim',
    solfegeNote: 'Sol',
  },
  Sol7: {
    chord: 'vi',
    solfegeNote: 'Sol',
  },
  La1: {
    chord: 'vi',
    solfegeNote: 'La',
  },
  La2: {
    chord: 'V',
    solfegeNote: 'La',
  },
  La3: {
    chord: 'IV',
    solfegeNote: 'La',
  },
  La4: {
    chord: 'iii',
    solfegeNote: 'La',
  },
  La5: {
    chord: 'ii',
    solfegeNote: 'La',
  },
  La6: {
    chord: 'I',
    solfegeNote: 'La',
  },
  Ti1: {
    chord: 'viidim',
    solfegeNote: 'Ti',
  },
  Ti2: {
    chord: 'vi',
    solfegeNote: 'Ti',
  },
  Ti3: {
    chord: 'V',
    solfegeNote: 'Ti',
  },
  Ti4: {
    chord: 'IV',
    solfegeNote: 'Ti',
  },
  Ti5: {
    chord: 'iii',
    solfegeNote: 'Ti',
  },
  Ti6: {
    chord: 'ii',
    solfegeNote: 'Ti',
  },
  Ti7: {
    chord: 'I',
    solfegeNote: 'Ti',
  },
}

type NoteWithChordsSettings = TonalExerciseSettings &
  IncludedAnswersSettings<NoteWithChord> & {
  voiceMode: 'soprano' | 'bass';
};

export function notesWithChordsExercise() {
  const voiceModeToRange: Record<NoteWithChordsSettings['voiceMode'], NotesRange> = {
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
        info: 'With soprano mode, the note in question will be played on top. \n' +
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
      }
    ],
    defaultSettings: {
      voiceMode: 'soprano',
    },
    id: 'notesWithChords',
    name: 'Notes with Chords',
    summary: 'Identify scale degrees in the context of different diatonic chords',
    explanation: NotesWithChordsExplanationComponent,
    getQuestion(settings: NoteWithChordsSettings, tonalExerciseUtils: TonalExerciseUtils): Exclude<Exercise.NotesQuestion<NoteWithChord>, "cadence"> {
      const randomAnswer: NoteWithChord = randomFromList(settings.includedAnswers)
      const descriptor: {
        chord: RomanNumeralChordSymbol,
        solfegeNote: SolfegeNote,
      } | undefined = noteWithChordDescriptorMap[randomAnswer];

      if (!descriptor) {
        throw new Error(`Missing descriptor for ${randomAnswer}`);
      }

      const chord: Chord = romanNumeralToChordInC(descriptor.chord)!;
      const noteType: NoteType = scaleDegreeToNoteType(solfegeNoteToScaleDegree[descriptor.solfegeNote]!, 'C');

      let chordVoicing: Note[] = chord.getVoicing({
        topVoicesInversion: randomFromList([0, 1, 2]),
        octave: 4,
        withBass: false,
      });

      const possibleNotesToSelect: Note[] = tonalExerciseUtils.getRangeForKeyOfC(voiceModeToRange[settings.voiceMode]).getAllNotes([noteType]);
      let note: Note = randomFromList(possibleNotesToSelect);

      if (settings.voiceMode === 'soprano') {
        while (toNoteNumber(note) < toNoteNumber(_.last(chordVoicing)!)) {
          chordVoicing = Chord.invertVoicing(chordVoicing, Direction.Down);
        }
      } else {
        console.log('note', note);
        console.log('chordVoicing', chordVoicing);
        while (toNoteNumber(note) > toNoteNumber(_.first(chordVoicing)!)) {
          chordVoicing = Chord.invertVoicing(chordVoicing, Direction.Up);
        }
      }

      if (settings.voiceMode === 'soprano') {
        let bass = chord.getBass();
        if (toNoteNumber(_.last(bass)!) > toNoteNumber(_.first(chordVoicing)!)) {
          bass = transpose(bass, -Interval.Octave)
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
      }
    },
    answerList: ((): Exercise.AnswerList<NoteWithChord> => {
      const solfegeSyllables = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'] as const;
      const chordDegrees = [1, 2, 3, 4, 5, 6, 7] as const;
      return {
        rows: chordDegrees.map(chordDegree => solfegeSyllables.map((solfegeNote): NoteWithChord => `${solfegeNote}${chordDegree}`)),
      };
    })()
  });
}
