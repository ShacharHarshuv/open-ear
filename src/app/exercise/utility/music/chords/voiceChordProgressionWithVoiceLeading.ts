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
import { randomFromList } from '../../../../shared/ts-utility';

const MAX_AVG_VOICE_MOVEMENT = 8 / 3;

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

  // filter valid voicing (that has small movements in voices)
  const validVoicingOptions: Note[][] = voicingOptionsForNextChord.filter((voicingOption: Note[]): boolean => {
    if (voicingOption.length !== currentChordVoicing.length) {
      throw new Error(`voicing of different length not supported`); // (for now)
    }
    const rank: number = _.sum(voicingOption.map((voice: Note, index: number): number => {
      return Math.abs(toNoteNumber(voice) - toNoteNumber(currentChordVoicing[index]));
    }));

    return (rank / voicingOption.length <= MAX_AVG_VOICE_MOVEMENT);
  });

  return randomFromList(validVoicingOptions);
}

export function voiceChordProgressionWithVoiceLeading(chordOrChordSymbolList: (ChordSymbol | Chord)[], startingTopVoicesInversion: number = 0, options: {withBass: boolean} = {withBass: true}): Note[][] {
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
      ...(options.withBass ? [
        noteTypeToNote(rootNote, 2),
        noteTypeToNote(rootNote, 3),
      ] : []),
      ...chordVoicing,
    ]
  });
}
