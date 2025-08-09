import { flatMap, uniq } from 'lodash';
import { NoteEvent } from '../../../../../services/player.service';
import {
  AnswerConfig,
  AnswerList,
  AnswersLayout,
  AnswersLayoutCell,
  addViewLabelToAnswerList,
  flatAnswerList,
  getAnswerListIterator,
  mapAnswerList,
} from '../../../../exercise-logic';
import {
  Interval,
  RomanNumeralChordSymbol,
  ScaleDegree,
  transposeScaleDegree,
} from '../../../../utility';
import {
  Chord,
  ChordType,
  TriadPosition,
} from '../../../../utility/music/chords';
import { RomanNumeralChord } from '../../../../utility/music/harmony/RomanNumeralChord';
import { romanNumeralToChordInC } from '../../../../utility/music/harmony/romanNumeralToChordInC';
import { chordTypesToAddInversionsFor } from './chord-types-to-add-inversions-for';

export const allRomanNumeralAnswerList: AnswerList<RomanNumeralChordSymbol> =
  (() => {
    function getPlayOnClickPart(chord: Chord): NoteEvent[] {
      return [
        {
          notes: chord.getVoicing({ position: TriadPosition.Fifth }),
          velocity: 0.3,
          duration: '2n',
        },
      ];
    }

    const empty = {
      answer: null,
      space: 1,
    };

    const answerList: {
      rows: (
        | AnswersLayoutCell<RomanNumeralChordSymbol>
        | RomanNumeralChordSymbol
      )[][];
    } = {
      rows: [
        ['#idim', '#iidim', empty, '#ivdim', '#vdim', '#vidim', empty],
        [empty, 'II', 'III', empty, empty, 'VI', 'VII'],
        ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'viidim'],
        ['i', empty, empty, 'iv', 'v', empty, empty],
        [empty, 'bII', 'bIII', empty, 'bV', 'bVI', 'bVII'],
      ],
    };

    const majorChordTypesLayout: AnswersLayout<ChordType> = {
      rows: [
        [ChordType.Major, ChordType.Major6th, ChordType.Major7th], // not dominants
        [
          ChordType.Major9th,
          ChordType.MajorAdd9,
          ChordType.Major69,
          ChordType.Major611,
        ],
        [ChordType.Dominant7th, ChordType.Dominant9th, ChordType.Dominant11th], // dominants
        [
          ChordType.Sharp5,
          ChordType.Dominant7thSharp5th,
          ChordType.Dominant7thSharp9th,
        ], // dominants alterations
        [ChordType.Sus4, ChordType.Sus2], // suspensions
      ],
    };

    const diminisehdChordTypes: ChordType[] = [
      ChordType.Diminished,
      ChordType.HalfDiminished7th,
      ChordType.Diminished7th,
      ChordType.Sharp5,
    ];

    const minorChordTypes: ChordType[][] = [
      [
        ChordType.Minor,
        ChordType.Minor7th,
        ChordType.Minor9th,
        ChordType.Minor11th,
      ],
      [
        ChordType.MinorSharp5,
        ChordType.Minor6th,
        ChordType.MinorAdd9,
        ChordType.MinorMajor7th,
      ],
    ];
    const minorChordTypesLayout: AnswersLayout<ChordType> = {
      rows: [...minorChordTypes, diminisehdChordTypes],
    };

    const diminishedChordTypesLayout: AnswersLayout<ChordType> = {
      rows: [diminisehdChordTypes, ...minorChordTypes],
    };

    const bassToAnswerLayout: Partial<
      Record<ScaleDegree, AnswersLayout<RomanNumeralChordSymbol>[]>
    > = {};
    const bassToInversionsLayout: Partial<
      Record<ScaleDegree, AnswersLayout<RomanNumeralChordSymbol>[]>
    > = {};

    const answerListWithChordTypes: AnswerList<RomanNumeralChordSymbol> =
      mapAnswerList(
        answerList,
        (
          answerConfig: AnswerConfig<RomanNumeralChordSymbol>,
        ): AnswersLayoutCell<RomanNumeralChordSymbol> => {
          if (!answerConfig.answer) {
            return answerConfig;
          }

          const romanNumeralChordSymbol = answerConfig.answer;
          const romanNumeralChord = new RomanNumeralChord(
            romanNumeralChordSymbol,
          );

          let chordTypesLayout: AnswersLayout<ChordType>;

          switch (romanNumeralChord.type) {
            case ChordType.Major:
              chordTypesLayout = majorChordTypesLayout;
              break;
            case ChordType.Minor:
              chordTypesLayout = minorChordTypesLayout;
              break;
            case ChordType.Diminished:
              chordTypesLayout = diminishedChordTypesLayout;
              break;
            default:
              return answerConfig;
          }

          const answerListWithTypes = mapAnswerList<
            string,
            RomanNumeralChordSymbol
          >(
            chordTypesLayout,
            (chordTypeAnswerConfig: AnswerConfig<ChordType>) => {
              if (chordTypeAnswerConfig.answer === null) {
                return chordTypeAnswerConfig as AnswerConfig<never>;
              }
              return new RomanNumeralChord({
                type: chordTypeAnswerConfig.answer,
                scaleDegree: romanNumeralChord.scaleDegree,
              }).romanNumeralChordSymbol;
            },
          );

          (bassToAnswerLayout[romanNumeralChord.bass] ??= []).push(
            answerListWithTypes,
          );

          const inversionsLayout = {
            rows: [],
          };

          (bassToInversionsLayout[romanNumeralChord.bass] ??= []).push(
            inversionsLayout,
          );

          return {
            innerAnswersList: answerListWithTypes,
            innerAnswersList2: inversionsLayout,
          };
        },
      );

    const chordsIterator = getAnswerListIterator(answerListWithChordTypes);
    const bassToInversions: Partial<Record<ScaleDegree, RomanNumeralChord[]>> =
      {};
    for (const answerConfig of chordsIterator) {
      const rootInversionChord = answerConfig.answer!;
      const romanNumeralChord = new RomanNumeralChord(rootInversionChord);

      const chordTypeInversionConfig = chordTypesToAddInversionsFor.find(
        ({ type }) => type === romanNumeralChord.type,
      );
      if (!chordTypeInversionConfig) {
        continue;
      }

      const [, ...scaleDegreesInChord] = romanNumeralChord.scaleDegrees();
      scaleDegreesInChord.forEach((possibleBassNote, index) => {
        if (
          chordTypeInversionConfig.numberOfInversions &&
          index >= chordTypeInversionConfig.numberOfInversions
        ) {
          return;
        }

        const invertedChord = new RomanNumeralChord({
          scaleDegree: romanNumeralChord.scaleDegree,
          type: romanNumeralChord.type,
          bass: possibleBassNote,
        });

        (bassToInversions[possibleBassNote] ??= []).push(invertedChord);
      });
    }

    for (let bassNote in bassToAnswerLayout) {
      const invertedChords = bassToInversions[bassNote as ScaleDegree];
      if (!invertedChords) {
        console.error(`No inverted chords for ${bassNote}`);
        continue;
      }
      let invertedChordsRows = groupBy(invertedChords, (chord) => {
        if (chord.type !== ChordType.Diminished) {
          return chord.scaleDegree;
        } else {
          return transposeScaleDegree(chord.scaleDegree, -Interval.MajorThird);
        }
      });
      // if the rows are too long, break by major/minor (i.e. is roman numeral lowercase)
      invertedChordsRows = flatMap(invertedChordsRows, (potentialRow) => {
        if (potentialRow.length <= 4) {
          return [potentialRow];
        }

        return groupBy(potentialRow, (chord) => chord.isLowercase);
      });
      invertedChordsRows.forEach((row) =>
        row.sort((a, b) => {
          if (a.isDiatonic && !b.isDiatonic) {
            return -1;
          } else if (!a.isDiatonic && !b.isInversion) {
            return 1;
          }

          if (
            a.type === ChordType.Diminished &&
            b.type === ChordType.Dominant7th
          ) {
            return 1;
          } else if (
            b.type === ChordType.Diminished &&
            a.type === ChordType.Dominant7th
          ) {
            return -1;
          }

          return 0;
        }),
      );
      invertedChordsRows.sort((a, b) => {
        const aFirstChord = a[0];
        const bFirstChord = b[0];
        if (aFirstChord.isDiatonic && !bFirstChord.isDiatonic) {
          return -1;
        } else if (!aFirstChord.isDiatonic && bFirstChord.isDiatonic) {
          return 1;
        }

        return aFirstChord.inversionIndex() - bFirstChord.inversionIndex();
      });
      bassToInversionsLayout[bassNote].forEach(({ rows }) =>
        rows.push(
          ...invertedChordsRows.map((row) =>
            row.map((chord) => chord.romanNumeralChordSymbol),
          ),
        ),
      );
    }

    return addViewLabelToAnswerList(
      mapAnswerList(
        answerListWithChordTypes,
        (answerOrCellConfig): AnswerConfig<RomanNumeralChordSymbol> => {
          if (typeof answerOrCellConfig === 'string') {
            return {
              answer: answerOrCellConfig,
              playOnClick: getPlayOnClickPart(
                romanNumeralToChordInC(answerOrCellConfig),
              ),
            };
          } else {
            if (!answerOrCellConfig.playOnClick && answerOrCellConfig.answer) {
              return {
                ...answerOrCellConfig,
                playOnClick: getPlayOnClickPart(
                  romanNumeralToChordInC(answerOrCellConfig.answer),
                ),
              };
            } else {
              return answerOrCellConfig;
            }
          }
        },
      ),
      (answer) => new RomanNumeralChord(answer).toViewString(),
    );
  })();

console.log(uniq(flatAnswerList(allRomanNumeralAnswerList)));

function groupBy<T>(items: T[], fn: (item: T) => unknown): T[][] {
  const map = new Map<unknown, T[]>();
  for (const item of items) {
    const key = fn(item);
    const group = map.get(key);
    if (group) group.push(item);
    else map.set(key, [item]);
  }
  return [...map.values()];
}
