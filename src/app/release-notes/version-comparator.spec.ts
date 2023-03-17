import { versionComparator } from "./version-comparator";

describe('versionComparator', () => {
  it('1.0.0 and 1.0.0 are equal', () => {
    expect(versionComparator('1.0.0', '1.0.0')).toEqual(0);
  });

  it('1.3.2 is before 1.3.3', () => {
    expect(versionComparator('1.3.2', '1.3.3')).toBeLessThan(0);
  });

  it('1.3.2 is before 1.4.3', () => {
    expect(versionComparator('1.3.2', '1.4.3')).toBeLessThan(0);
  });

  it('1.3.3 is after 1.1.2', () => {
    expect(versionComparator('1.3.3', '1.1.2')).toBeGreaterThan(0);
  });
});
