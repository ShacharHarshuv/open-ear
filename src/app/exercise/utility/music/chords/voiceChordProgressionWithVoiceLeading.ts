import { Note } from 'tone/Tone/core/type/NoteUnits';
import {
  Chord,
  ChordSymbol,
} from './Chord/Chord';
import { toNoteNumber } from '../notes/toNoteName';
import * as _ from 'lodash';
import { NoteType } from '../notes/NoteType';
import { noteTypeToNote } from '../notes/noteTypeToNote';
import { transpose } from '../transpose';
import { randomFromList } from '../../../../shared/ts-utility';
import { Interval } from '../intervals/Interval';

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
    possibleVoicing = transpose(possibleVoicing, _.round((toNoteNumber(highestVoice) - toNoteNumber(highestNoteOfPossibleVoicing)) / Interval.Octave) * Interval.Octave)
    voicingOptionsForNextChord.push(possibleVoicing);
  }

  /*
  * Double some voices so the two voicings will have equal number of voices
  * [Returns an array as there may be more than one option]
  * */
  function balanceVoicing(voicing1: ReadonlyArray<Note>, voicing2: ReadonlyArray<Note>): [ReadonlyArray<Note>, ReadonlyArray<Note>][] {
    if (voicing1.length === voicing2.length) {
      return [[voicing1, voicing2]];
    } else if (voicing1.length > voicing2.length) {
      return balanceVoicing(voicing2, voicing1).map(_.reverse);
    } else { // voicing1.length < voicing2.length
      return voicing1.map((voiceToDouble, i): [ReadonlyArray<Note>, ReadonlyArray<Note>] => {
        const voicingWithDoubling = [...voicing1];
        voicingWithDoubling.splice(i, 0, voicingWithDoubling[i]);
        return [voicingWithDoubling, voicing2];
      });
    }
  }

  // filter valid voicing (that has small movements in voices)
  const validVoicingOptions: Note[][] = voicingOptionsForNextChord.filter((voicingOption: Note[]): boolean => {
    return _.some(balanceVoicing(voicingOption, currentChordVoicing), ([_voicingOption, _currentChordVoicing]) => {
      const rank: number = _.sum(_voicingOption.map((voice: Note, index: number): number => {
        return Math.abs(toNoteNumber(voice) - toNoteNumber(_currentChordVoicing[index]));
      }));

      return (rank / voicingOption.length <= MAX_AVG_VOICE_MOVEMENT);
    });
  });

  if (_.isEmpty(validVoicingOptions)) {
    console.warn(`No valid voicing was found for ${nextChord.symbol} giving ${currentChordVoicing}. Picking one at random.`);
    return randomFromList(voicingOptionsForNextChord);
  }

  return randomFromList(validVoicingOptions);
}

export function voiceChordProgressionWithVoiceLeading(chordOrChordSymbolList: (ChordSymbol | Chord)[], startingTopVoicesInversion: number = 0, options: { withBass: boolean } = {withBass: true}): Note[][] {
  if (_.isEmpty(chordOrChordSymbolList)) {
    throw new Error(`chordOrChordSymbolList is empty`);
  }

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
    if (!nextChordVoicing) {
      throw new Error(`Voicing is undefined. Chord progression: ${chordOrChordSymbolList.map(chord => chord instanceof Chord ? chord.symbol : chord).join(' ')}`);
    }
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
