import { getDistanceOfKeys } from './getDistanceOfKeys';

describe('getDistanceOfKeys', () => {
  it('C to Db is 1 semitone', () => {
    expect(getDistanceOfKeys('Db', 'C')).toEqual(1);
  });

  it('F to Bb is 5 semitones', () => {
    expect(getDistanceOfKeys('Bb', 'F')).toEqual(5);
  });
})
