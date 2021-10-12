import { BaseTonalExercise } from './BaseTonalExercise';
import { BaseCommonSettingsExerciseSettings } from './BaseCommonSettingsExercise';
import { Exercise, } from '../../Exercise';
import {
  randomFromList,
  StaticOrGetter,
  toGetter
} from '../../../shared/ts-utility';
import * as _ from 'lodash';
import {
  voiceChordProgressionWithVoiceLeading,
  Chord,
  ChordSymbol
} from '../../utility/music/chords';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteEvent } from '../../../services/player.service';
import SettingValueType = Exercise.SettingValueType;

export type BaseTonalChordProgressionExerciseSettings<GAnswer extends string> = BaseCommonSettingsExerciseSettings<GAnswer> & {
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
  }]>;
}

export abstract class BaseTonalChordProgressionExercise<GAnswer extends string, GSettings extends BaseTonalChordProgressionExerciseSettings<GAnswer> & { [key: string]: SettingValueType }> extends BaseTonalExercise<GAnswer, GSettings> {
  protected _settings: GSettings = {
    ...this._settings,
    voiceLeading: 'CORRECT',
    includedPositions: [0, 1, 2],
    includeBass: true,
  };

  getQuestionInC(): Exclude<Exercise.Question<GAnswer>, "cadence"> {
    const chordProgression: ChordProgressionQuestion<GAnswer> = this._getChordProgressionInC();

    const firstChordInversion: 0 | 1 | 2 = randomFromList(this._settings.includedPositions);

    const voiceChordProgression = (chordOrChordSymbolList: (ChordSymbol | Chord)[]): Note[][] => {
      if (this._settings.voiceLeading === 'CORRECT') {
        return voiceChordProgressionWithVoiceLeading(chordOrChordSymbolList, firstChordInversion, {
          withBass: this._settings.includeBass,
        });
      }

      const voicings: Note[][] = [chordProgression.segments[0].chord.getVoicing({
        topVoicesInversion: firstChordInversion,
        withBass: this._settings.includeBass,
      })];

      for (let i = 1; voicings.length < chordProgression.segments.length; i++) {
        voicings.push(chordProgression.segments[i].chord.getVoicing({
          topVoicesInversion: randomFromList(this._settings.includedPositions),
          withBass: this._settings.includeBass,
        }));
      }

      return voicings;
    }

    const question: Exclude<Exercise.Question<GAnswer>, "cadence"> = {
      segments: voiceChordProgression(_.map(chordProgression.segments, 'chord'))
        .map((voicing: Note[], index: number): Exercise.Question<GAnswer>['segments'][0] => {
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
        firstChordInversion,
      });
    }

    return question;
  }

  protected abstract _getChordProgressionInC(): ChordProgressionQuestion<GAnswer>;

  protected _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<GSettings>[] {
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
