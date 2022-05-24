export function testPureFunction<GFunc extends (...args) => any>(
  func: GFunc,
  cases: {
    args: Parameters<GFunc>,
    returnValue: ReturnType<GFunc>,
    force?: boolean,
  }[]): void {
  cases.forEach(testCase => {
    (testCase.force ? fit : it)(`${func.name}(${testCase.args.map(arg => JSON.stringify(arg)).join(', ')}) = ${JSON.stringify(testCase.returnValue)}`, () => {
      expect(func(...testCase.args)).toEqual(testCase.returnValue);
    });
  })
}
