import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteEvent } from '../../../../services/player.service';
import {
  randomFromList,
  StaticOrGetter,
  toGetter,
} from '../../../../shared/ts-utility';
import Exercise, { NotesQuestion } from '../../../exercise-logic';
import { getInterval, NotesRange } from '../../../utility';
import {
  Chord,
  ChordSymbol,
  voiceChordProgressionWithVoiceLeading,
} from '../../../utility/music/chords';
import { Interval } from '../../../utility/music/intervals/Interval';
import { transpose } from '../../../utility/music/transpose';

export type VoicingSettings = {
  voiceLeading: 'RANDOM' | 'CORRECT';
  includedPositions: (0 | 1 | 2)[];
  includeBass: boolean;
};

export interface ChordProgressionQuestion<GAnswer extends string>
  extends Omit<Exercise.NotesQuestion, 'segments' | 'afterCorrectAnswer'> {
  segments: {
    chord: Chord;
    answer: GAnswer;
  }[];
  afterCorrectAnswer?: StaticOrGetter<
    {
      partToPlay: NoteEvent[];
      answerToHighlight?: GAnswer;
    }[],
    [
      {
        firstChordInversion: 0 | 1 | 2;
        questionSegments: Exercise.NotesQuestion<GAnswer>['segments'];
      },
    ]
  >;
}

export function chordVoicingSettingsDescriptor(): Exercise.SettingsControlDescriptor<VoicingSettings>[] {
  return [
    {
      key: 'voiceLeading',
      info:
        'Smooth: voices in the chords will move as little as possible (as usually happens in real music) <br>' +
        'Random: each chord will have a random position regardless of the previous chord. Choose this if you want to limit the included positions',
      descriptor: {
        controlType: 'select',
        label: 'Voice Leading',
        options: [
          {
            label: 'Random',
            value: 'RANDOM',
          },
          {
            label: 'Smooth',
            value: 'CORRECT',
          },
        ],
      },
    },
    {
      key: 'includeBass',
      info: 'When turned off, the bass note will not be played',
      descriptor: {
        controlType: 'checkbox',
        label: 'Include Bass',
      },
    },
    {
      key: 'includedPositions' as const,
      info: 'Limit the included top voices positions.',
      show: (settings: VoicingSettings) => settings.voiceLeading === 'RANDOM',
      descriptor: {
        controlType: 'list-select',
        label: 'Included Positions (top voices)',
        allOptions: [
          {
            value: 0,
            label: 'Root Position',
          },
          {
            value: 1,
            label: '1st Inversion',
          },
          {
            value: 2,
            label: '2nd Inversion',
          },
        ],
      },
    },
  ];
}

export const voicingDefaultSettings: VoicingSettings = {
  voiceLeading: 'CORRECT',
  includedPositions: [0, 1, 2],
  includeBass: true,
};

export function useChordProgression() {
  const range = new NotesRange('G3', 'E5');

  return {
    voicingSettingsDescriptor: chordVoicingSettingsDescriptor(),
    defaults: voicingDefaultSettings,
    getQuestionInC<GAnswer extends string>(params: {
      settings: VoicingSettings;
      getChordProgressionInC: () => ChordProgressionQuestion<GAnswer>;
    }): NotesQuestion<GAnswer> {
      const chordProgression = params.getChordProgressionInC();

      const firstChordInversion: 0 | 1 | 2 = randomFromList(
        params.settings.includedPositions,
      );

      const voiceChordProgression = (
        chordOrChordSymbolList: (ChordSymbol | Chord)[],
      ): Note[][] => {
        if (params.settings.voiceLeading === 'CORRECT') {
          return voiceChordProgressionWithVoiceLeading(
            chordOrChordSymbolList,
            firstChordInversion,
            {
              withBass: params.settings.includeBass,
            },
          );
        }

        const getAllVoicingsInRange = (
          chord: Chord,
          params: Parameters<Chord['getVoicing']>[0],
        ): Note[][] => {
          const voicing: Note[] = chord.getVoicing(params);
          const bassNotes: Note[] = [];
          if (params.withBass) {
            bassNotes.push(voicing.shift()!);
            bassNotes.push(voicing.shift()!);
          }

          let lowestVoicing = voicing;

          while (range.isInRange(transpose(lowestVoicing, -Interval.Octave))) {
            lowestVoicing = transpose(lowestVoicing, -Interval.Octave);
          }

          const possibleVoicingList = [lowestVoicing];

          while (
            range.isInRange(
              transpose(_.last(possibleVoicingList)!, +Interval.Octave),
            )
          ) {
            possibleVoicingList.push(
              transpose(_.last(possibleVoicingList)!, +Interval.Octave),
            );
          }

          return possibleVoicingList.map((possibleVoicing) => [
            ...bassNotes,
            ...possibleVoicing,
          ]);
        };

        const voicingList: Note[][] = [
          randomFromList(
            getAllVoicingsInRange(chordProgression.segments[0].chord, {
              position: firstChordInversion,
              withBass: params.settings.includeBass,
            }),
          ),
        ];

        for (
          let i = 1;
          voicingList.length < chordProgression.segments.length;
          i++
        ) {
          const lastVoicing: Note[] = voicingList[i - 1];
          const possibleNextVoicingList: Note[][] = getAllVoicingsInRange(
            chordProgression.segments[i].chord,
            {
              position: randomFromList(params.settings.includedPositions),
              withBass: params.settings.includeBass,
            },
          );

          const validNextVoicingList: Note[][] = possibleNextVoicingList.filter(
            (possibleNextVoicing) => {
              const lastVoicingHighestNote: Note = _.last(lastVoicing)!;
              const nextVoicingHighestNote: Note = _.last(possibleNextVoicing)!;
              return (
                getInterval(lastVoicingHighestNote, nextVoicingHighestNote) <=
                Interval.PerfectFifth
              );
            },
          );

          voicingList.push(
            randomFromList(
              _.isEmpty(validNextVoicingList)
                ? possibleNextVoicingList
                : validNextVoicingList,
            ),
          );
        }

        return voicingList;
      };

      const question: Exclude<Exercise.Question<GAnswer>, 'cadence'> = {
        segments: voiceChordProgression(
          _.map(chordProgression.segments, 'chord'),
        ).map(
          (
            voicing: Note[],
            index: number,
          ): Exercise.NotesQuestion<GAnswer>['segments'][0] => {
            return {
              rightAnswer: chordProgression.segments[index].answer,
              partToPlay: [
                {
                  notes: voicing,
                  velocity: 0.3,
                  duration: '2n',
                },
              ],
            };
          },
        ),
      };

      if (chordProgression.afterCorrectAnswer) {
        question.afterCorrectAnswer = toGetter(
          chordProgression.afterCorrectAnswer,
        )({
          firstChordInversion: firstChordInversion,
          questionSegments: question.segments,
        });
      }

      return question;
    },
  };
}
