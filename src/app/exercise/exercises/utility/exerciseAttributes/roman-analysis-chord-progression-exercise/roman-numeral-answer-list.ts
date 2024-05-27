import { RomanNumeralChordSymbol } from '../../../../utility';
import {
  Chord,
  TriadPosition,
  ChordType,
} from '../../../../utility/music/chords';
import { NoteEvent } from '../../../../../services/player.service';
import {
  AnswersLayout,
  mapAnswerList,
  AnswerConfig,
  AnswersLayoutCell,
  AnswerList,
  addViewLabelToAnswerList,
} from '../../../../exercise-logic';
import { RomanNumeralChord } from '../../../../utility/music/harmony/RomanNumeralChord';
import { romanNumeralToChordInC } from '../../../../utility/music/harmony/romanNumeralToChordInC';

export const allRomanNumeralAnswerList: AnswerList<RomanNumeralChordSymbol> =
  (() => {
    function getPlayOnClickPart(chord: Chord): NoteEvent[] {
      return [
        {
          notes: chord.getVoicing({position: TriadPosition.Fifth}),
          velocity: 0.3,
          duration: '2n',
        },
      ];
    }

    const empty = {
      answer: null,
      space: 1,
    }

    const answerList: {
      rows: (
        | AnswersLayoutCell<RomanNumeralChordSymbol>
        | RomanNumeralChordSymbol
        )[][];
    } = {
      rows: [
        [
          '#idim',
          '#iidim',
          empty,
          '#ivdim',
          '#vdim',
          '#vidim',
          empty,
        ],
        [
          empty,
          'II',
          'III',
          empty,
          empty,
          'VI',
          'VII',
        ],
        ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'viidim'],
        ['i', empty, empty, 'iv', 'v', empty, empty],
        [
          empty,
          'bII',
          'bIII',
          empty,
          'bV',
          'bVI',
          'bVII',
        ],
      ],
    };

    const majorChordTypesLayout: AnswersLayout<ChordType> = {
      rows: [
        [
          ChordType.Major,
          ChordType.Major6th,
          ChordType.Major7th,
          ChordType.MajorAdd9,
          empty, // ChordType.Major69
        ], // not dominants
        [
          ChordType.Sharp5,
          ChordType.Dominant7th,
          ChordType.Dominant9th,
          ChordType.Dominant11th,
          ChordType.Dominant7thSharp9th,
        ], // dominants
        [ChordType.Sus4, ChordType.Sus2], // suspensions
      ],
    };

    const diminisehdChordTypes: ChordType[] = [
      ChordType.Diminished,
      ChordType.HalfDiminished7th,
      ChordType.Diminished7th,
    ];

    const minorChordTypes: ChordType[] = [ChordType.Minor, ChordType.Minor7th, ChordType.MinorSharp5, ChordType.Minor6th, ChordType.MinorAdd9, ChordType.MinorMajor7th]
    const minorChordTypesLayout: AnswersLayout<ChordType> = {
      rows: [
        minorChordTypes,
        diminisehdChordTypes,
      ],
    };

    const diminishedChordTypesLayout: AnswersLayout<ChordType> = {
      rows: [
        diminisehdChordTypes,
        minorChordTypes,
      ],
    };

    const answerListWithChordTypes: AnswerList<RomanNumeralChordSymbol> = mapAnswerList(
      answerList,
      (answerConfig: AnswerConfig<RomanNumeralChordSymbol>): AnswersLayoutCell<RomanNumeralChordSymbol> => {
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
        >(chordTypesLayout, (chordTypeAnswerConfig: AnswerConfig<ChordType>) => {
          if (chordTypeAnswerConfig.answer === null) {
            return chordTypeAnswerConfig as AnswerConfig<never>;
          }
          return new RomanNumeralChord({
            type: chordTypeAnswerConfig.answer,
            scaleDegree: romanNumeralChord.scaleDegree,
          }).romanNumeralChordSymbol;
        });

        return {
          innerAnswersList: answerListWithTypes,
        };
      },
    );

    // const bassToAnswerLayout: Partial<Record<ScaleDegree, AnswersLayout<RomanNumeralChordSymbol>>> = {};
    //
    // const chordsIterator = Exercise.getAnswerListIterator(answerListWithChordTypes);
    // for (const rootInversionChord of chordsIterator) {
    //   const romanNumeralChord = new RomanNumeralChord(rootInversionChord);
    // }


    return addViewLabelToAnswerList(
      mapAnswerList(
        answerListWithChordTypes,
        (
          answerOrCellConfig,
        ): AnswerConfig<RomanNumeralChordSymbol> => {
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
