import { ChordType, chordTypeConfigMap } from './ChordType';

export function isChordTypeMinor(chordType: ChordType) {
  const scaleDegreeList = chordTypeConfigMap[chordType].scaleDegreeList;
  // we don't include diminished chord here, since they exist diatonic-ally in are usually analyzed as dominants
  return scaleDegreeList.includes('b3') && scaleDegreeList.includes('5');
}
