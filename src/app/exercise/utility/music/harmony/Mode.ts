export enum Mode {
  Ionian = 1,
  Dorian,
  Phrygian,
  Lydian,
  Mixolydian,
  Aeolian,
  Locrian,
}

export function isMajor(mode: Mode) {
  return [Mode.Ionian, Mode.Mixolydian, Mode.Lydian].includes(mode);
}

export const modeName: Record<Mode, string> = {
  [Mode.Ionian]: 'Major',
  [Mode.Dorian]: 'Dorian',
  [Mode.Phrygian]: 'Phrygian',
  [Mode.Lydian]: 'Lydian',
  [Mode.Mixolydian]: 'Mixolydian',
  [Mode.Aeolian]: 'Minor',
  [Mode.Locrian]: 'Locrian',
};
