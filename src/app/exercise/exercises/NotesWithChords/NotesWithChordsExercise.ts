import { SolfegeNote, solfegeToNoteInC } from '../utility/BaseMelodicDictationExercise';
import { BaseTonalExercise } from '../utility/BaseTonalExercise';
import { Exercise } from '../../Exercise';
import { randomFromList } from '../../../shared/ts-utility';
import { RomanNumeralChord, romanNumeralToChordInC } from '../utility/BaseRomanAnalysisChordProgressionExercise';
import { Chord } from '../../utility/music/chords';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteType } from '../../utility/music/notes/NoteType';
import { noteTypeToNote } from '../../utility/music/notes/noteTypeToNote';
import { Interval, toNoteNumber } from '../../utility';
import { transpose } from '../../utility/music/transpose';
import * as _ from 'lodash';
import {
  NotesWithChordsExplanationComponent
} from './notes-with-chords-explanation/notes-with-chords-explanation.component';

type ChordDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type NoteWithChord = `${SolfegeNote}${ChordDegree}`;

const noteWithChordDescriptorMap: {[noteWithHarmonicContext in NoteWithChord]?: {
  chord: RomanNumeralChord,
  solfegeNote: SolfegeNote,
}} = {
  Do1: {
    chord: 'I',
    solfegeNote: 'Do',
  },
  Do2: {
    chord: 'viiᵒ',
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
    chord: 'viiᵒ',
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
    chord: 'viiᵒ',
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
    chord: 'viiᵒ',
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
    chord: 'viiᵒ',
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
    chord: 'viiᵒ',
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

export class NotesWithChordsExercise extends BaseTonalExercise<NoteWithChord> {
  readonly id: string = 'notesWithChords';
  readonly name: string = 'Notes with Chords';
  readonly summary: string = 'Identify scale degrees in the context of different diatonic chords';
  readonly explanation: Exercise.ExerciseExplanationContent = NotesWithChordsExplanationComponent;

  protected _getAllAnswersListInC(): Exercise.AnswerList<NoteWithChord> {
    const solfegeSyllables = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'] as const;
    const chordDegrees = [1, 2, 3, 4, 5, 6, 7] as const;
    return {
      rows: chordDegrees.map(chordDegree => solfegeSyllables.map((solfegeNote): NoteWithChord => `${solfegeNote}${chordDegree}`)),
    };
  }

  getQuestionInC(): Exclude<Exercise.Question<NoteWithChord>, "cadence"> {
    const randomAnswer: NoteWithChord = randomFromList(this._settings.includedAnswers)
    const descriptor: {
      chord: RomanNumeralChord,
      solfegeNote: SolfegeNote,
    } | undefined = noteWithChordDescriptorMap[randomAnswer];

    if (!descriptor) {
      throw new Error(`Missing descriptor for ${randomAnswer}`);
    }

    const chord: Chord = romanNumeralToChordInC[descriptor.chord]!;
    const noteType: NoteType = solfegeToNoteInC[descriptor.solfegeNote]!;

    const chordVoicing: Note[] = chord.getVoicing({
      topVoicesInversion: randomFromList([0, 1, 2]),
      octave: 3,
    });

    let note = noteTypeToNote(noteType, 4);

    while (toNoteNumber(note) <= toNoteNumber(_.last(chordVoicing)!)) {
      note = transpose(note, Interval.Octave);
    }

    return {
      segments: [
        {
          rightAnswer: randomAnswer,
          partToPlay: [
            {
              notes: chordVoicing,
              velocity: 0.2,
              time: 0,
              duration: '2n',
            },
            {
              notes: [note],
              velocity: 1,
              time: 0,
              duration: '2n',
            }
          ]
        }
      ]
    }
  }

  protected override _getDefaultSelectedIncludedAnswers(): NoteWithChord[] {
    return [
      'Do1',
      'Do3',
      'Do5',
    ]
  }

  /* Overriding to ensure order is right */
  protected override _getIncludedAnswersOptions(): NoteWithChord[] {
    return [
      'Do1',
      'Do3',
      'Do5',
      'Re1',
      'Re3',
      'Re5',
      'Mi1',
      'Mi3',
      'Mi5',
      'Fa1',
      'Fa3',
      'Fa5',
      'Sol1',
      'Sol3',
      'Sol5',
      'La1',
      'La3',
      'La5',
      'Ti1',
      'Ti3',
      'Ti5',
    ]
  }
}
