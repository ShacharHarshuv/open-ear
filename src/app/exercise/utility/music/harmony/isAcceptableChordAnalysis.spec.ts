import { isAcceptableChordAnalysis } from 'src/app/exercise/utility/music/harmony/isAcceptableChordAnalysis';

describe('isAcceptableChordAnalysis', () => {
  describe('no options', () => {
    it('should return true for identical chords', () => {
      expect(isAcceptableChordAnalysis('I', 'I')).toBe(true);
    });

    it('should return true for harmonically identical chords', () => {
      expect(isAcceptableChordAnalysis('vi7/1', 'I6')).toBe(true);
    });

    it('should return false for different chords', () => {
      expect(isAcceptableChordAnalysis('I', 'IV')).toBe(false);
    });

    it('should return false if there are similar chords', () => {
      expect(isAcceptableChordAnalysis('V7', 'V')).toBe(false);
    });
  });

  describe('ignoreSharp5 option', () => {
    it('should ignore #5', () => {
      expect(
        isAcceptableChordAnalysis('V#5', 'V', { ignoreSharp5: true }),
      ).toBe(true);
    });

    it('should not ignore other extensions', () => {
      expect(
        isAcceptableChordAnalysis('V7#5', 'V', { ignoreSharp5: false }),
      ).toBe(false);
    });

    it('should not work the other way', () => {
      expect(
        isAcceptableChordAnalysis('V', 'V#5', { ignoreSharp5: true }),
      ).toBe(false);
    });
  });

  describe('ignoreExtensions option', () => {
    it('should ignore 7 if diatonic', () => {
      expect(
        isAcceptableChordAnalysis('V7', 'V', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(true);
    });

    it('should not ignore 7 if not diatonic', () => {
      expect(
        isAcceptableChordAnalysis('IV7', 'IV', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(false);
    });

    it('should ignore higher extensions if diatonic', () => {
      expect(
        isAcceptableChordAnalysis('V9', 'V', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(true);

      expect(
        isAcceptableChordAnalysis('V9', 'V7', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(true);
    });

    it('should require 7 if not diatonic', () => {
      expect(
        isAcceptableChordAnalysis('IV7', 'IV', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(false);

      expect(
        isAcceptableChordAnalysis('IV9', 'IV7', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(true);

      expect(
        isAcceptableChordAnalysis('IV11', 'IV7', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(true);
    });

    it('should ignore all extensions if set to always', () => {
      expect(
        isAcceptableChordAnalysis('V7', 'V', { ignoreExtensions: 'always' }),
      ).toBe(true);
      expect(
        isAcceptableChordAnalysis('IV7', 'IV', { ignoreExtensions: 'always' }),
      ).toBe(true);
      expect(
        isAcceptableChordAnalysis('V9', 'V', { ignoreExtensions: 'always' }),
      ).toBe(true);
      expect(
        isAcceptableChordAnalysis('IV9', 'IV', { ignoreExtensions: 'always' }),
      ).toBe(true);
    });

    it('should always ignore m7', () => {
      expect(
        isAcceptableChordAnalysis('ii7', 'ii', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(true);

      expect(
        isAcceptableChordAnalysis('biii7', 'iii', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(false);
    });

    it('should not ignore mM7', () => {
      expect(
        isAcceptableChordAnalysis('vimaj7', 'vi', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(false);
    });

    it('should simplify mM9 to mM7', () => {
      expect(
        isAcceptableChordAnalysis('viM9', 'vimaj7', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(true);
    });

    it('should simplify III7 to III', () => {
      expect(
        isAcceptableChordAnalysis('III7', 'III', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(true);
    });

    it('should simplify bVImaj7 to bVI', () => {
      expect(
        isAcceptableChordAnalysis('bVImaj7', 'bVI', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(true);
    });

    it('should allow I/3 for vi7/3', () => {
      expect(
        isAcceptableChordAnalysis('vi7/3', 'I/3', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(true);

      expect(
        isAcceptableChordAnalysis('I6/3', 'vi/3', {
          ignoreExtensions: 'when-equivalent',
        }),
      ).toBe(true);
    });
  });

  it('should allow IV/6 for vib6', () => {
    expect(
      isAcceptableChordAnalysis('vib6', 'IV/6', {
        ignoreExtensions: 'when-equivalent',
      }),
    ).toBe(true);
  });

  describe('ignoreSuspensions option', () => {
    it('should ignore sus4 in major', () => {
      expect(
        isAcceptableChordAnalysis('IVsus', 'IV', { ignoreSuspensions: true }),
      ).toBe(true);
    });

    it('should allow minor', () => {
      expect(
        isAcceptableChordAnalysis('IVsus', 'iv', { ignoreSuspensions: true }),
      ).toBe(true);
    });

    it('should ignore sus2 in major', () => {
      expect(
        isAcceptableChordAnalysis('IVsus2', 'IV', { ignoreSuspensions: true }),
      ).toBe(true);
    });

    it('should allow minor', () => {
      expect(
        isAcceptableChordAnalysis('IVsus2', 'iv', { ignoreSuspensions: true }),
      ).toBe(true);
    });
  });
});
