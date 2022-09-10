import { getCurrentAnswersLayout } from './getCurrentAnswersLayout';
import { testPureFunction } from '../../../shared/testing-utility/testPureFunction';

describe(getCurrentAnswersLayout.name, () => {
  testPureFunction(getCurrentAnswersLayout, [
    {
      args: [
        [
          {
            answer: '1',
            wasWrong: false,
          },
          {
            answer: '2',
            wasWrong: false,
          },
          {
            answer: '3',
            wasWrong: false,
          },
          {
            answer: '4',
            wasWrong: false,
          }
        ],
        {
          type: 'notes',
          segments: [
            {
              rightAnswer: '1',
              partToPlay: 'C4',
              playAfter: 0,
            },
            {
              rightAnswer: '2',
              partToPlay: 'C4',
            },
            {
              rightAnswer: '3',
              partToPlay: 'C4',
              playAfter: 0,
            },
            {
              rightAnswer: '4',
              partToPlay: 'C4',
            }
          ],
        }
      ],
      returnValue: [
        [
          {
            answer: '1',
            wasWrong: false,
            index: 0,
          },
          {
            answer: '3',
            wasWrong: false,
            index: 2,
          },
        ],
        [
          {
            answer: '2',
            wasWrong: false,
            index: 1,
          },
          {
            answer: '4',
            wasWrong: false,
            index: 3,
          },
        ]
      ]
    }
  ]);
});
