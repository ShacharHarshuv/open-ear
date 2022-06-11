import { testPureFunction } from '../shared/testing-utility/testPureFunction';
import { Exercise } from './Exercise';
import getAnswerListIterator = Exercise.getAnswerListIterator;

const mockAnswerList: Exercise.AnswerList = {
  rows: [
    [
      'Answer 1',
      'Answer 2',
      {
        answer: 'Answer 3',
        space: 2,
      }
    ],
  ],
};


describe('mapAnswerList', function() {
  testPureFunction(Exercise.mapAnswerList, [
    {
      args: [mockAnswerList, answerConfig => ({
        ...answerConfig,
        space: (answerConfig.space ?? 1) * 2,
      })],
      returnValue: {
        rows: [
          [
            {
              answer: 'Answer 1',
              space: 2,
            },
            {
              answer: 'Answer 2',
              space: 2,
            },
            {
              answer: 'Answer 3',
              space: 4,
            }
          ],
        ],
      }
    },
  ])
});

describe('addViewLabelToAnswerList', function() {
  testPureFunction(Exercise.addViewLabelToAnswerList, [
    {
      args: [mockAnswerList, answer => answer.toUpperCase()],
      returnValue: {
        rows: [
          [
            {
              answer: 'Answer 1',
              displayLabel: 'ANSWER 1',
            },
            {
              answer: 'Answer 2',
              displayLabel: 'ANSWER 2',
            },
            {
              answer: 'Answer 3',
              displayLabel: 'ANSWER 3',
              space: 2,
            }
          ],
        ],
      }
    },
  ])
});

describe('getAnswerListIterator', () => {
  it('should work', () => {
    expect(Array.from(getAnswerListIterator(mockAnswerList))).toEqual([
      jasmine.objectContaining({
        answer: 'Answer 1',
        space: 1,
        displayLabel: 'Answer 1',
      }),
      jasmine.objectContaining({
        answer: 'Answer 2',
        space: 1,
        displayLabel: 'Answer 2',
      }),
      jasmine.objectContaining({
        answer: 'Answer 3',
        space: 2,
        displayLabel: 'Answer 3',
      })
    ])
  })
});

describe('flatAnswerList', () => {
  testPureFunction(Exercise.flatAnswerList, [
    {
      args: [mockAnswerList],
      returnValue: ['Answer 1', 'Answer 2', 'Answer 3'],
    }
  ]);
})
