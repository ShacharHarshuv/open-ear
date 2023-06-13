import { ChordType, chordTypeConfigMap } from './ChordType';

export function isChordTypeDiminished(chordType: ChordType) {
  const scaleDegreeList = chordTypeConfigMap[chordType].scaleDegreeList;
  return scaleDegreeList.includes('b3') && scaleDegreeList.includes('b5');
}
