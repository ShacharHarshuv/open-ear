import { mod } from "./mod";
import { testPureFunction } from "../testing-utility/testPureFunction";

describe('mod', () => {
  testPureFunction(mod, [
    {
      args: [5, 12],
      returnValue: 5,
    },
    {
      args: [14, 12],
      returnValue: 2,
    },
    {
      args: [-4, 12],
      returnValue: 8,
    },
    {
      args: [-16, 12],
      returnValue: 8,
    },
  ]);
});
