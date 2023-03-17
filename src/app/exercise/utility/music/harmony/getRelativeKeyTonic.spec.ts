import { getRelativeKeyTonic } from "./getRelativeKeyTonic";
import { testPureFunction } from "../../../../shared/testing-utility/testPureFunction";
import { Mode } from "./Mode";

describe(getRelativeKeyTonic.name, () => {
  testPureFunction(getRelativeKeyTonic, [
    {
      args: ['D', Mode.Major],
      returnValue: 'B',
    },
    {
      args: ['D', Mode.Minor],
      returnValue: 'F',
    },
  ]);
});
