import { getDistanceOfKeys } from './getDistanceOfKeys';

describe('getDistanceOfKeys', () => {
  it('C to Db is 1 semitone', () => {
    expect(getDistanceOfKeys('Db', 'C')).toEqual(1);
  });

  it('F to Bb is 5 semitones', () => {
    expect(getDistanceOfKeys('Bb', 'F')).toEqual(5);
  });

  it('C to Bb should be -2 semitones', () => {
    expect(getDistanceOfKeys('C', 'Bb')).toEqual(2);
  });

  it('Bb to C should be 2 semitones', () => {
    expect(getDistanceOfKeys('Bb', 'C')).toEqual(-2);
  });
})
