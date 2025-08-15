import {
  DiatonicScaleDegree,
  Mode,
  ScaleDegree,
} from 'src/app/exercise/utility';
import { SettingsConfig } from '../../../exercise-logic/settings-config';

export type ModalAnalysisSettings = {
  modalAnalysis: 'tonic-1' | '1-major-6-minor' | '1-ionian-always';
};

export const modalAnalysis: SettingsConfig<ModalAnalysisSettings> = {
  controls: [
    {
      key: 'modalAnalysis',
      info:
        'Determines how chord progression in different modes are analyzed. <br>' +
        'Tonic = 1; the tonic is always 1. Regardless of the mode. For example in the Dorian mode, you could have this progression: i IV' +
        '1 Major, 6 Minor; (recommended) the tonic is 1 for major modes, and 6 for minor modes. For example, the same Dorian progression will be vi II' +
        '1 Ionian always; 1 is always the ionian tonic, regardless of the mode. For example, the same Dorian progression will be ii V',
      descriptor: {
        label: 'Modal Analysis',
        controlType: 'select',
        options: [
          {
            label: 'Tonic = 1',
            value: 'tonic-1',
          },
          {
            label: '1 Major, 6 Minor',
            value: '1-major-6-minor',
          },
          {
            label: '1 Ionian always',
            value: '1-ionian',
          },
        ],
      },
    },
  ],
  defaults: {
    modalAnalysis: '1-major-6-minor',
  },
};

export function convertModalAnalysis({
  scaleDegree,
  currentTonic,
  mode,
  modalAnalysis,
}: {
  scaleDegree: ScaleDegree;
  currentTonic: DiatonicScaleDegree;
  mode: Mode;
  modalAnalysis: ModalAnalysisSettings['modalAnalysis'];
}): ScaleDegree {
  return scaleDegree; // todo
}
