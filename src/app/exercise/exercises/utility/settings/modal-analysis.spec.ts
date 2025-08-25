import { EnharmonicScaleDegree, Mode } from 'src/app/exercise/utility';
import { ModalAnalysis, convertModalAnalysis } from './modal-analysis';

// todo: consider removing outer partial
const testCases: Partial<
  Record<
    ModalAnalysis,
    Partial<
      Record<
        Mode,
        {
          currentModalAnalysis: ModalAnalysis;
          input: EnharmonicScaleDegree;
          output: EnharmonicScaleDegree;
        }[]
      >
    >
  >
> = {
  'tonic-1': {
    [Mode.Major]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: '1',
        output: '1',
      },
      {
        currentModalAnalysis: 'tonic-1',
        input: '4',
        output: '4',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: 'b7',
        output: 'b7',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '#4',
      },
    ],
    [Mode.Minor]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: '5',
        output: '5',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '6',
        output: '1',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '2',
        output: '4',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '1',
        output: 'b3',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '6',
      },
    ],
    [Mode.Dorian]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: 'b3',
        output: 'b3',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '6',
        output: '1',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '2',
        output: '1',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '1',
        output: 'b7',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '6',
      },
    ],
    [Mode.Mixolydian]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: '2',
        output: '2',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '5',
        output: '1',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: 'b7',
        output: 'b3',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '#4',
      },
    ],
  },
  '1-major-6-minor': {
    [Mode.Major]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: '1',
        output: '1',
      },
      {
        currentModalAnalysis: 'tonic-1',
        input: '4',
        output: '4',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: 'b7',
        output: 'b7',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '#4',
      },
    ],
    [Mode.Minor]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: '5',
        output: '3',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '6',
        output: '6',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '2',
        output: '2',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '1',
        output: '1',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '#4',
      },
    ],
    [Mode.Dorian]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: 'b3',
        output: '1',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '6',
        output: '6',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '2',
        output: '6',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '1',
        output: '5',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '#4',
      },
    ],
    [Mode.Mixolydian]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: '2',
        output: '2',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '5',
        output: '1',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: 'b7',
        output: 'b3',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '#4',
      },
    ],
  },
  '1-ionian-always': {
    [Mode.Major]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: '1',
        output: '1',
      },
      {
        currentModalAnalysis: 'tonic-1',
        input: '4',
        output: '4',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: 'b7',
        output: 'b7',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '#4',
      },
    ],
    [Mode.Minor]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: '5',
        output: '3',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '6',
        output: '6',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '2',
        output: '2',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '1',
        output: '1',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '#4',
      },
    ],
    [Mode.Dorian]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: 'b3',
        output: '4',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '6',
        output: '2',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '2',
        output: '2',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '1',
        output: '1',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '7',
      },
    ],
    [Mode.Mixolydian]: [
      {
        currentModalAnalysis: 'tonic-1',
        input: '2',
        output: '6',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: '5',
        output: '5',
      },
      {
        currentModalAnalysis: '1-ionian-always',
        input: 'b7',
        output: 'b7',
      },
      {
        currentModalAnalysis: '1-major-6-minor',
        input: '#4',
        output: '#1',
      },
    ],
  },
};

describe('modalAnalysis', () => {
  Object.entries(testCases).forEach(([modalAnalysis, modes]) => {
    Object.entries(modes).forEach(([mode, cases]) => {
      cases?.forEach(({ currentModalAnalysis, input, output }) => {
        it(`should convert ${input} in mode ${mode} analyzed in ${currentModalAnalysis} to ${output} analyzed in ${modalAnalysis}`, () => {
          expect(
            convertModalAnalysis({
              scaleDegree: input,
              currentModalAnalysis,
              mode: Number(mode),
              desiredModalAnalysis: modalAnalysis as ModalAnalysis,
            }),
          ).toBe(output);
        });
      });
    });
  });
});
