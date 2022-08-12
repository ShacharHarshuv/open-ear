import {
  BaseMelodicDictationExercise,
  MelodicDictationExerciseSettings, IMelodicQuestion,
} from '../utility/exerciseFactories/BaseMelodicDictationExercise';
import { Exercise } from '../../Exercise';
import { Chord, ChordSymbol } from '../../utility/music/chords';
import { randomFromList } from '../../../shared/ts-utility';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { IncludedAnswersSettings } from '../utility/settings/IncludedAnswersSettings';
import { SolfegeNote } from '../../utility';

export type ChordArpeggioExerciseSettings = IncludedAnswersSettings<SolfegeNote> & MelodicDictationExerciseSettings;

export class ChordArpeggioExercise extends BaseMelodicDictationExercise<ChordArpeggioExerciseSettings> {
  readonly id: string = 'chordArpeggio';
  readonly name: string = 'Chord Arpeggio';
  readonly summary: string = 'Identify melodic lines that arpeggiate chord tones'
  readonly explanation: Exercise.ExerciseExplanationContent = 'In this exercise a chord will be played but its notes will be broken melodically, either ascending or descending. Your job is to understand what is the chord and work out the notes in it.';
  readonly includedChords: ChordSymbol[] = ['C', 'G']; // todo: make it part of the setting
  override readonly noteDuration = '4n';

  constructor() {
    super();

    // In the future we must get those from the selected chords
    this.updateSettings({
      ...this._settings,
      includedAnswers: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'],
    })
  }

  getMelodicQuestionInC(): IMelodicQuestion {
    const randomChord: ChordSymbol = randomFromList(this.includedChords);
    let voicing: Note[] = new Chord(randomChord).getVoicing({
      topVoicesInversion: 0, // todo: randomize out of available inversions that should be set in settings
      withBass: false,
    });
    const direction: 'asc' | 'desc' = randomFromList(['asc', 'desc']);
    if (direction === 'desc') {
      voicing = voicing.reverse();
    }

    return {
      segments: voicing,
    }
  }

  override getSettingsDescriptor(): Exercise.SettingsControlDescriptor<ChordArpeggioExerciseSettings>[] {
    return [
      // todo: add chord selection, inversion selection etc
    ];
  }
}
