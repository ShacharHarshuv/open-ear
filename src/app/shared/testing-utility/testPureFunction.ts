export function testPureFunction<GFunc extends (...args) => any>(
  func: GFunc,
  cases: {
    args: Parameters<GFunc>,
    returnValue: ReturnType<GFunc>
  }[]): void {
  cases.forEach(testCase => {
    it(`${func.name}(${testCase.args.join(', ')}) = ${testCase.returnValue}`, () => {
      expect(func(...testCase.args)).toEqual(testCase.returnValue);
    });
  })
}
