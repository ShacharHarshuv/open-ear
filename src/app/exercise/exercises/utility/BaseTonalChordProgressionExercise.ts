import { BaseTonalExercise, BaseTonalExerciseSettings } from './BaseTonalExercise';
import { Exercise } from '../../Exercise';
import { randomFromList, StaticOrGetter, toGetter, } from '../../../shared/ts-utility';
import * as _ from 'lodash';
import { Chord, ChordSymbol, voiceChordProgressionWithVoiceLeading, } from '../../utility/music/chords';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteEvent } from '../../../services/player.service';
import { getInterval, NotesRange, } from '../../utility';
import { transpose } from '../../utility/music/transpose';
import { Interval } from '../../utility/music/intervals/Interval';

export type BaseTonalChordProgressionExerciseSettings<GAnswer extends string> = BaseTonalExerciseSettings<GAnswer> & {
  voiceLeading: 'RANDOM' | 'CORRECT';
  includedPositions: (0 | 1 | 2)[];
  includeBass: boolean;
}

export interface ChordProgressionQuestion<GAnswer extends string> {
  segments: {
    chord: Chord;
    answer: GAnswer;
  }[],
  afterCorrectAnswer?: StaticOrGetter<{
    partToPlay: NoteEvent[],
    answerToHighlight?: GAnswer,
  }[], [{
    firstChordInversion: 0 | 1 | 2,
    questionSegments: Exercise.NotesQuestion<GAnswer>['segments'],
  }]>;
}

export abstract class BaseTonalChordProgressionExercise<GAnswer extends string, GSettings extends BaseTonalChordProgressionExerciseSettings<GAnswer>> extends BaseTonalExercise<GAnswer, GSettings> {
  protected override _settings: GSettings = {
    ...this._settings,
    voiceLeading: 'CORRECT',
    includedPositions: [0, 1, 2],
    includeBass: true,
  };
  private readonly _range = new NotesRange('G3', 'E5');

  getQuestionInC(): Exclude<Exercise.Question<GAnswer>, "cadence"> {
    const chordProgression: ChordProgressionQuestion<GAnswer> = this._getChordProgressionInC();

    const firstChordInversion: 0 | 1 | 2 = randomFromList(this._settings.includedPositions);

    const voiceChordProgression = (chordOrChordSymbolList: (ChordSymbol | Chord)[]): Note[][] => {
      if (this._settings.voiceLeading === 'CORRECT') {
        return voiceChordProgressionWithVoiceLeading(chordOrChordSymbolList, firstChordInversion, {
          withBass: this._settings.includeBass,
        });
      }

      const getAllVoicingsInRange = (chord: Chord, params: Parameters<Chord['getVoicing']>[0]): Note[][] => {
        const voicing: Note[] = chord.getVoicing(params);
        const bassNotes: Note[] = [];
        if (params.withBass) {
          bassNotes.push(voicing.shift()!);
          bassNotes.push(voicing.shift()!);
        }

        let lowestVoicing = voicing;

        while (this._range.isInRange(transpose(lowestVoicing, -Interval.Octave))) {
          lowestVoicing = transpose(lowestVoicing, -Interval.Octave);
        }

        const possibleVoicingList = [lowestVoicing];

        while (this._range.isInRange(transpose(_.last(possibleVoicingList)!, +Interval.Octave))) {
          possibleVoicingList.push(transpose(_.last(possibleVoicingList)!, +Interval.Octave));
        }

        return possibleVoicingList.map(possibleVoicing => [
          ...bassNotes,
          ...possibleVoicing,
        ]);
      }

      const voicingList: Note[][] = [randomFromList(getAllVoicingsInRange(chordProgression.segments[0].chord, {
        topVoicesInversion: firstChordInversion,
        withBass: this._settings.includeBass,
      }))];

      for (let i = 1; voicingList.length < chordProgression.segments.length; i++) {
        const lastVoicing: Note[] = voicingList[i - 1];
        const possibleNextVoicingList: (Note[])[] = getAllVoicingsInRange(chordProgression.segments[i].chord, {
          topVoicesInversion: randomFromList(this._settings.includedPositions),
          withBass: this._settings.includeBass,
        });

        const validNextVoicingList: (Note[])[] = possibleNextVoicingList.filter(possibleNextVoicing => {
          const lastVoicingHighestNote: Note = _.last(lastVoicing)!;
          const nextVoicingHighestNote: Note = _.last(possibleNextVoicing)!;
          return getInterval(lastVoicingHighestNote, nextVoicingHighestNote) <= Interval.PerfectFifth;
        })

        voicingList.push(randomFromList(_.isEmpty(validNextVoicingList) ? possibleNextVoicingList: validNextVoicingList));
      }

      return voicingList;
    }

    const question: Exclude<Exercise.Question<GAnswer>, "cadence"> = {
      segments: voiceChordProgression(_.map(chordProgression.segments, 'chord'))
        .map((voicing: Note[], index: number): Exercise.NotesQuestion<GAnswer>['segments'][0] => {
          return {
            rightAnswer: chordProgression.segments[index].answer,
            partToPlay: [{
              notes: voicing,
              velocity: 0.3,
              duration: '2n',
            }],
          }
        }),
    }

    if (chordProgression.afterCorrectAnswer) {
      question.afterCorrectAnswer = toGetter(chordProgression.afterCorrectAnswer)({
        firstChordInversion: firstChordInversion,
        questionSegments: question.segments,
      });
    }

    return question;
  }

  protected abstract _getChordProgressionInC(): ChordProgressionQuestion<GAnswer>;

  protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<GSettings>[] {
    return [
      ...super._getSettingsDescriptor(),
      {
        key: 'voiceLeading',
        descriptor: {
          controlType: 'SELECT',
          label: 'Voice Leading',
          options: [
            {
              label: 'Random',
              value: 'RANDOM',
            },
            {
              label: 'Smooth',
              value: 'CORRECT',
            }
          ],
        },
      },
      {
        key: 'includeBass',
        descriptor: {
          controlType: 'CHECKBOX',
          label: 'Include Bass',
        }
      },
      {
        key: 'includedPositions' as const,
        descriptor: {
          controlType: 'LIST_SELECT',
          label: 'Included Positions (top voices)',
          allOptions: [
            {
              value: 0,
              label: 'Root Position',
            },
            {
              value: 1,
              label: '1st Inversion'
            },
            {
              value: 2,
              label: '2nd Inversion',
            }
          ],
        },
      },
    ]
  }
}
