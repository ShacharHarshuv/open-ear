import { isInKey } from './isInKey';

describe('isInKey', function () {
  it('Bb4 is in Bb major', () => {
    expect(isInKey('Bb4', 'Bb')).toBeTrue();
  });

  it('C#4 is not in Bb major', () => {
    expect(isInKey('C#4', 'Bb')).toBeFalse();
  });

  it('F3 is in Bb major', () => {
    expect(isInKey('F3', 'Bb')).toBeTrue();
  });

  it('F#3 is in G major', () => {
    expect(isInKey('F#3', 'G')).toBeTrue();
  });

  it('F5 is not in G major', () => {
    expect(isInKey('F5', 'G')).toBeFalse();
  });
});
