import {
  ScaleDegree,
  getDiatonicScaleDegreeWithAccidental,
  DiatonicScaleDegree,
} from './ScaleDegrees';
import { CadenceType } from '../../../exercises/utility/exerciseAttributes/tonalExercise';
import * as _ from 'lodash';
import { DeepReadonly } from '../../../../shared/ts-utility';

interface ScaleOption {
  scale: ScaleDegree[],
  isMajor: boolean
  rating: number; // the in case of ambiguity, the smaller number prevails
}

const optionsForBottomHalf: DeepReadonly<ScaleOption[]> = [
  {
    scale: ['4', '3', '2', '1'],
    isMajor: true,
    rating: 0,
  },
  {
    scale: ['4', 'b3', '2', '1'],
    isMajor: false,
    rating: 1,
  },
  {
    scale: ['4', 'b3', 'b2', '1'],
    isMajor: false,
    rating: 2,
  },
  {
    scale: ['#4', '3', '2', '1'],
    isMajor: true,
    rating: 3,
  }
];

const optionsForUpperHalf: DeepReadonly<ScaleOption[]> = [
  {
    scale: ['5', '6', '7', '1'], // major
    isMajor: true,
    rating: 0,
  },
  {
    scale: ['5', '6', 'b7', '1'], // mixolydian
    isMajor: true,
    rating: 3,
  },
  {
    scale: ['5', 'b6', '7', '1'], // harmonic minor
    isMajor: false,
    rating: 1,
  },
  {
    scale: ['5', 'b6', 'b7', '1'], // natural minor
    isMajor: false,
    rating: 2,
  },
];

export function getResolutionFromScaleDegree(
  scaleDegree: ScaleDegree,
  includedNotes: ScaleDegree[],
  cadenceType: CadenceType,
): DeepReadonly<ScaleDegree[]> {
  if (!includedNotes.includes(scaleDegree)) {
    throw new Error(`includedNotes (${includedNotes.join(',')}) must include scaleDegree ${scaleDegree}`);
  }

  function getScale(): DeepReadonly<ScaleDegree[]> {
    const diatonicDegreeToIncludedNotes = _.groupBy(includedNotes, includedNote => getDiatonicScaleDegreeWithAccidental(includedNote).diatonicScaleDegree);
    const options = getDiatonicScaleDegreeWithAccidental(scaleDegree).diatonicScaleDegree < 5 ? optionsForBottomHalf : optionsForUpperHalf;
    const optionsThatWorksWithIncludedNotes = options.filter(option => {
      return _.every(option.scale, scaleDegreeInScaleCandidate => {
        const diatonicDegree: DiatonicScaleDegree = getDiatonicScaleDegreeWithAccidental(scaleDegreeInScaleCandidate).diatonicScaleDegree;
        return _.isEmpty(diatonicDegreeToIncludedNotes[diatonicDegree]) || diatonicDegreeToIncludedNotes[diatonicDegree].includes(scaleDegreeInScaleCandidate);
      });
    });

    if (optionsThatWorksWithIncludedNotes.length === 0) {
      throw new Error(`Unexpected empty options for resolution. (includedNotes=${includedNotes.join(',')})`)
    }

    const optionsThatWorkWithCadenceType: DeepReadonly<ScaleOption>[] = optionsThatWorksWithIncludedNotes
      .filter(option => cadenceType === 'I IV V I' ? option.isMajor : !option.isMajor);

    if (_.isEmpty(optionsThatWorkWithCadenceType)) {
      optionsThatWorkWithCadenceType.push(...optionsThatWorksWithIncludedNotes); // ignoring cadence type if it contradicts
    }

    return _.minBy(optionsThatWorkWithCadenceType, 'rating')!.scale; // we asserted it's not empty before
  }

  const scale: DeepReadonly<ScaleDegree>[] = [...getScale()];
  const diatonicScaleDegree = getDiatonicScaleDegreeWithAccidental(scaleDegree).diatonicScaleDegree;
  const indexToStartFrom: number = diatonicScaleDegree <= 4 ? 4 - diatonicScaleDegree : diatonicScaleDegree - 5;
  const clippedScale: ScaleDegree[] = scale.splice(indexToStartFrom);
  if (!clippedScale.includes(scaleDegree)) { // i.e. scaleDegree is outside detected scale
    clippedScale.unshift(scaleDegree);
  }

  return clippedScale;
}
