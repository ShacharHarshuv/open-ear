import {
  Mode,
  RomanNumeralChordSymbol,
} from '../../utility';

export interface ProgressionDescriptor {
  romanNumerals: RomanNumeralChordSymbol[],
  name?: string,
  mode?: Mode,
}

export const commonProgressionDescriptorList: ProgressionDescriptor[] = [
  // Diatonic Major progressions
  {
    romanNumerals: ['I', 'V', 'I'],
    name: 'Perfect Cadence (Major)'
  },
  {
    romanNumerals: ['I', 'IV', 'I'],
    name: 'Plagal Cadence',
  },
  {
    romanNumerals: ['I', 'IV', 'V', 'I'],
    name: 'Classical Cadence',
  },
  {
    romanNumerals: ['I', 'IV', 'V', 'IV'],
  },
  {
    romanNumerals: ['I', 'V', 'IV', 'V'],
  },
  {
    romanNumerals: ['I', 'V', 'IV', 'I'],
    name: 'Blues Cadence',
  },
  {
    romanNumerals: ['I', 'V', 'vi', 'IV'],
    name: 'Axis (optimistic)',
  },
  {
    romanNumerals: ['IV', 'I', 'V', 'vi'],
    name: 'Axis'
  },
  {
    romanNumerals: ['I', 'IV', 'vi', 'V',]
  },
  {
    romanNumerals: ['I', 'vi', 'IV', 'V'],
    name: 'Doo-Wop / 50s',
  },
  {
    romanNumerals: ['IV', 'V', 'I', 'vi'],
    name: 'Doo-Wop (IV-rotation)'
  },
  {
    romanNumerals: ['I', 'vi', 'ii', 'V'],
    name: 'Circle'
  },
  {
    romanNumerals: ['I', 'vi', 'iii', 'IV'],
  },
  {
    romanNumerals: ['I', 'V', 'ii', 'IV']
  },
  {
    romanNumerals: ['IV', 'V', 'iii', 'vi'],
    name: 'The Royal Road',
  },
  // Diatonic Minor (Harmonic / Natural) progressions
  {
    romanNumerals: ['i', 'V', 'i'],
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'iv', 'i'],
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'iv', 'V', 'i'],
    name: 'Minor Classical Cadence',
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'V', 'iv', 'i'],
    name: 'Minor Blues Cadence',
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'V', 'iv', 'V', 'i'],
    name: 'Minor Blues Cadence',
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'bVII', 'bVI', 'i'],
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'bVII', 'bVI', 'bVII'],
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'bVI', 'bIII', 'bVII'],
    mode: Mode.Minor,
    name: 'Axis (Pessimistic)'
  },
  {
    romanNumerals: ['i', 'bVII', 'bVI', 'V'],
    name: 'Andalusian Cadence',
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'bIII', 'iv', 'bVII'],
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'bIII', 'bVI', 'V'],
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['iidim', 'V', 'i'],
    name: 'Minor 2-5-1',
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'iidim', 'V', 'i'],
    name: 'Minor 2-5-1',
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'iv', 'bVI', 'V', 'i'],
    mode: Mode.Minor,
  },
  {
    romanNumerals: ['i', 'bVII', 'v', 'bVI'],
    mode: Mode.Minor,
    name: '"Can\'t Stop"'
  },
  // Diatonic Dorian progressions
  {
    romanNumerals: ['i', 'IV', 'i', 'IV'],
    mode: Mode.Dorian,
    name: 'Dorian Vamp'
  },
  {
    romanNumerals: ['i', 'bIII', 'bVII', 'IV'],
    mode: Mode.Dorian,
    name: 'Plagal Cascade',
  },
  // Diatonic Mixolydian
  {
    romanNumerals: ['I', 'bVII', 'IV', 'I'],
    name: 'Mixolydian Vamp',
    mode: Mode.Mixolydian,
  },
  {
    romanNumerals: ['I', 'v', 'v', 'ii'],
    name: 'Clocks'
  },
  // Non-diatonic progressions
  // Modal interchange
  {
    romanNumerals: ['I', 'IV', 'iv', 'I'],
    name: 'Minor Plagal Cadence',
  },
  {
    romanNumerals: ['bVI', 'bVII', 'I'],
    name: 'Mario Cadence'
  },
  {
    romanNumerals: ['I', 'bVI', 'V', 'I'],
    name: 'Secondary triton sub'
  },
  // secondary dominants
  {
    romanNumerals: ['I', 'III', 'vi', 'IV'],
  },
  {
    romanNumerals: ['I', 'VI', 'ii', 'V'],
  },
  {
    romanNumerals: ['I', 'IV', '#ivdim', 'V']
  },
  {
    romanNumerals: ['I', 'V', 'III', 'vi']
  },

]
