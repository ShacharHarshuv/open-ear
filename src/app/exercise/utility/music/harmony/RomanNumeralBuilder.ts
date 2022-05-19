// import { ChordType } from '../chords';
// import { RomanNumeralChord } from './RomanNumeralChord';
//
// export type ScaleDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;
//
// export enum Accidental {
//   Natural = '',
//   Sharp = '#',
//   Flat = 'b',
// }
//
// export class RomanNumeralBuilder {
//   readonly degree: ScaleDegree;
//   readonly accidental: Accidental;
//   readonly type: ChordType;
//
//   constructor(romanNumeralInput: RomanNumeralChord | {
//     degree: ScaleDegree,
//     accidental: Accidental,
//     type: ChordType,
//   }) {
//     if (typeof romanNumeralInput === 'object') {
//       this.degree = romanNumeralInput.degree;
//       this.accidental = romanNumeralInput.accidental;
//       this.type = romanNumeralInput.type;
//       return;
//     }
//
//     this.accidental = romanNumeralInput.includes(Accidental.Sharp) ? Accidental.Sharp :
//       romanNumeralInput.includes(Accidental.Flat) ? Accidental.Flat : Accidental.Natural;
//   }
// }
