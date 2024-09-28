import { testPureFunction } from '../../shared/testing-utility/testPureFunction';
import {
  AnswerList,
  addViewLabelToAnswerList,
  filterIncludedAnswers,
  flatAnswerList,
  getAnswerListIterator,
  mapAnswerList,
  normalizedAnswerList,
} from './Exercise';

const mockAnswerList: AnswerList = {
  rows: [
    [
      'Answer 1',
      'Answer 2',
      {
        answer: 'Answer 3',
        space: 2,
      },
      {
        displayLabel: 'Answer 4',
        innerAnswersList: ['Answer 4.1', 'Answer 4.2'],
      },
    ],
  ],
};

describe('mapAnswerList', function () {
  testPureFunction(mapAnswerList, [
    {
      args: [
        mockAnswerList,
        (answerConfig) => ({
          ...answerConfig,
          space: (answerConfig.space ?? 1) * 2,
        }),
      ],
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
            },
            {
              displayLabel: 'Answer 4',
              innerAnswersList: [
                {
                  answer: 'Answer 4.1',
                  space: 2,
                },
                {
                  answer: 'Answer 4.2',
                  space: 2,
                },
              ],
              innerAnswersList2: null,
            },
          ],
        ],
      },
    },
  ]);
});

describe('addViewLabelToAnswerList', function () {
  testPureFunction(addViewLabelToAnswerList, [
    {
      args: [mockAnswerList, (answer) => answer.toUpperCase()],
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
            },
            {
              displayLabel: 'Answer 4',
              innerAnswersList: [
                {
                  answer: 'Answer 4.1',
                  displayLabel: 'ANSWER 4.1',
                },
                {
                  answer: 'Answer 4.2',
                  displayLabel: 'ANSWER 4.2',
                },
              ],
              innerAnswersList2: null,
            },
          ],
        ],
      },
    },
  ]);
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
      }),
      jasmine.objectContaining({
        answer: 'Answer 4.1',
        space: 1,
        displayLabel: 'Answer 4.1',
      }),
      jasmine.objectContaining({
        answer: 'Answer 4.2',
        space: 1,
        displayLabel: 'Answer 4.2',
      }),
    ]);
  });
});

describe('flatAnswerList', () => {
  testPureFunction(flatAnswerList, [
    {
      args: [mockAnswerList],
      returnValue: [
        'Answer 1',
        'Answer 2',
        'Answer 3',
        'Answer 4.1',
        'Answer 4.2',
      ],
    },
  ]);
});

describe('filterIncludedAnswers', () => {
  testPureFunction(
    (allAnswerList: AnswerList<string>, includedAnswersList: string[]) =>
      // normalizing to make it easier to test
      normalizedAnswerList(
        filterIncludedAnswers(allAnswerList, includedAnswersList),
      ),
    [
      {
        args: [mockAnswerList, ['Answer 1', 'Answer 3', 'Answer 4.2']],
        returnValue: {
          rows: [
            [
              jasmine.objectContaining({
                answer: 'Answer 1',
              }),
              jasmine.objectContaining({
                answer: null,
              }),
              jasmine.objectContaining({
                answer: 'Answer 3',
              }),
              jasmine.objectContaining({
                answer: 'Answer 4.2',
              }),
            ],
          ],
        },
      },
    ],
  );
});
