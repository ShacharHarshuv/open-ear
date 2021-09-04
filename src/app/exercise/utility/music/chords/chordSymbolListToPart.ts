import { NoteEvent } from '../../../../services/player.service';
import { Subdivision } from 'tone/build/esm/core/type/Units';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteType } from '../notes/NoteType';
import { ChordPosition } from './ChordPosition';
import { ChordSymbol } from './Chord/Chord';

function voiceNextChord(currentChordVoicing: Note[], nextChordNotes: NoteType[]): Note[] {
  throw new Error(`Note implemented`);
}

export function chordSymbolListToPart(chordSymbolList: ChordSymbol[], startingPosition: ChordPosition = '5th', chordDuration: Subdivision = '4n'): NoteEvent[] {
  // const chordVoicingWithoutBass: Note[][] = [chordSymbolVoicing(chordSymbolList[0], startingPosition)];
  // for (let i = 1; i < chordSymbolList.length; i++) {
  //   chordVoicingWithoutBass.push(voiceNextChord(chordVoicingWithoutBass[i - 1], chordSymbolToNoteTypes(chordSymbolList[i])));
  // }
  // // adding bass notes
  // const chordVoicingWithBass: Note[][] = chordVoicingWithoutBass.map((chordVoicing: Note[], index): Note[] => {
  //   const rootNote: NoteType = chordSymbolToRootNote(chordSymbolList[index]);
  //   return [ // todo: add bass note
  //     ...chordVoicing
  //   ]
  // });
  //
  // return toSteadyPart(chordVoicingWithBass);

  throw new Error(`Note implemented`);
}
