import { getCurrentAnswersLayout } from "./getCurrentAnswersLayout";
import { testPureFunction } from "../../../shared/testing-utility/testPureFunction";

describe(getCurrentAnswersLayout.name, () => {
  testPureFunction(getCurrentAnswersLayout, [
    {
      args: [
        [
          {
            answer: '1',
            wasWrong: false,
            playAfter: 0,
          },
          {
            answer: '2',
            wasWrong: false,
          },
          {
            answer: '3',
            wasWrong: false,
            playAfter: 0,
          },
          {
            answer: '4',
            wasWrong: false,
          },
        ],
      ],
      returnValue: [
        [
          jasmine.objectContaining({
            answer: '1',
            wasWrong: false,
            index: 0,
          }),
          jasmine.objectContaining({
            answer: '3',
            wasWrong: false,
            index: 2,
          }),
        ],
        [
          jasmine.objectContaining({
            answer: '2',
            wasWrong: false,
            index: 1,
          }),
          jasmine.objectContaining({
            answer: '4',
            wasWrong: false,
            index: 3,
          }),
        ],
      ],
    },
  ]);
});
