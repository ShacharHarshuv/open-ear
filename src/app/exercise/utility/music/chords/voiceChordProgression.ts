import { Note } from 'tone/Tone/core/type/NoteUnits';
import {
  Chord,
  ChordSymbol
} from './Chord/Chord';
import { toNoteNumber } from '../notes/toNoteName';
import * as _ from 'lodash';
import { NoteType } from '../notes/NoteType';
import { noteTypeToNote } from '../notes/noteTypeToNote';
import { transpose } from '../transpose';
import { Interval } from '../intervals/interval';

function voiceNextChord(currentChordVoicing: Note[], nextChord: Chord): Note[] {
  const highestVoice: Note = _.last(currentChordVoicing)!;
  const voicingOptionsForNextChord: Note[][] = [];
  for (let i = 0; i < nextChord.noteTypes.length; i++) {
    let possibleVoicing: Note[] = nextChord.getVoicing({
      topVoicesInversion: i,
      withBass: false,
    });
    // normalized for preferred octave, i.e. when the the soprano voice is the closest
    const highestNoteOfPossibleVoicing = _.last(possibleVoicing)!;
    possibleVoicing = transpose(possibleVoicing, _.round((toNoteNumber(highestVoice) - toNoteNumber(highestNoteOfPossibleVoicing)) / Interval.Octave))
    voicingOptionsForNextChord.push(possibleVoicing);
  }

  // rank chord movement by the movement of each voice
  const rankForEveryVoicing = voicingOptionsForNextChord.map((voicingOption: Note[]) => {
    if (voicingOption.length !== currentChordVoicing.length) {
      throw new Error(`voicing of different length not supported`); // (for now)
    }
    return _.sum(voicingOption.map((voice: Note, index: number): number => {
      return Math.abs(toNoteNumber(voice) - toNoteNumber(currentChordVoicing[index]));
    }));
  });

  let indexOfBestVoicing = 0;

  for (let i = 1; i < rankForEveryVoicing.length; i++) {
    if (rankForEveryVoicing[i] < rankForEveryVoicing[indexOfBestVoicing]) {
      indexOfBestVoicing = i;
    }
  }

  return voicingOptionsForNextChord[indexOfBestVoicing];
}

export function voiceChordProgression(chordOrChordSymbolList: (ChordSymbol | Chord)[], startingTopVoicesInversion: number = 0): Note[][] {
  const chordList: Chord[] = chordOrChordSymbolList.map((chordOrChordSymbol): Chord => {
    if (chordOrChordSymbol instanceof Chord) {
      return chordOrChordSymbol;
    }
    return new Chord(chordOrChordSymbol);
  })
  const chordVoicingWithoutBass: Note[][] = [chordList[0].getVoicing({
    topVoicesInversion: startingTopVoicesInversion,
    withBass: false,
  })];
  for (let i = 1; i < chordList.length; i++) {
    const nextChordVoicing: Note[] = voiceNextChord(chordVoicingWithoutBass[i - 1], chordList[i]);
    chordVoicingWithoutBass.push(nextChordVoicing);
  }
  // adding bass notes
  return chordVoicingWithoutBass.map((chordVoicing: Note[], index): Note[] => {
    const rootNote: NoteType = chordList[index].root;
    return [
      noteTypeToNote(rootNote, 2),
      noteTypeToNote(rootNote, 3),
      ...chordVoicing,
    ]
  });
}
