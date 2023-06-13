import { ChordType, chordTypeConfigMap } from './ChordType';

export function isChordTypeMajor(chordType: ChordType): boolean {
  // we include augmented chords in this on purpose, since they are usually a variant of a major chord
  return chordTypeConfigMap[chordType].scaleDegreeList.includes('3');
}
