import * as _ from 'lodash';
import { DeepReadonly, Mode, isValueTruthy } from '../../utility';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
import { toRelativeModeTonic } from '../../utility/music/harmony/toRelativeModeTonic';
import { ChordsInRealSongsSettings } from './chordsInRealSongsExercise';
import { YouTubeSongQuestion, songChordQuestions } from './songQuestions';

export function getIncludedSegments(
  settings: Pick<
    ChordsInRealSongsSettings,
    'modalAnalysis' | 'includedChords' | 'learnProgressions'
  >,
) {
  const isAllChordsIncluded = (
    chords: DeepReadonly<YouTubeSongQuestion>['chords'],
  ) => {
    // for learnProgressions mode, we "include all segments" by default.
    // Level management is done based on order and performance instead
    return (
      settings.learnProgressions ||
      _.every(chords, (chord) => {
        return settings.includedChords.includes(chord.chord);
      })
    );
  };

  const validChordProgressionsDescriptorList = songChordQuestions
    .map((chordProgression) => {
      if (
        settings.modalAnalysis === 'tonic-1' ||
        chordProgression.mode === Mode.Major
      ) {
        return chordProgression;
      }

      if (
        settings.modalAnalysis === '1-major-6-minor' &&
        [Mode.Mixolydian, Mode.Lydian].includes(chordProgression.mode)
      ) {
        return chordProgression;
      }

      return {
        ...chordProgression,
        chords: _.map(chordProgression.chords, (chord) => ({
          ...chord,
          chord: RomanNumeralChord.toRelativeMode(
            chord.chord,
            chordProgression.mode,
            Mode.Major,
          ),
        })),
        mode: Mode.Major,
        key: toRelativeModeTonic(
          chordProgression.key,
          chordProgression.mode,
          Mode.Major,
        ),
      };
    })
    .map((chordProgression): DeepReadonly<YouTubeSongQuestion> | null => {
      if (isAllChordsIncluded(chordProgression.chords)) {
        return chordProgression;
      } else if (chordProgression.mode !== Mode.Major) {
        // Trying to see if the relative Major progression can be included
        const chordsInRelativeKey = _.map(chordProgression.chords, (chord) => ({
          ...chord,
          chord: RomanNumeralChord.toRelativeMode(
            chord.chord,
            chordProgression.mode,
            Mode.Major,
          ),
        }));

        if (isAllChordsIncluded(chordsInRelativeKey)) {
          return {
            ...chordProgression,
            chords: chordsInRelativeKey,
            mode: Mode.Major,
            key: toRelativeModeTonic(
              chordProgression.key,
              chordProgression.mode,
              Mode.Major,
            ),
          };
        } else {
          // Both MAJOR and MINOR versions can't be included, returning null to signal it's not valid
          return null;
        }
      } else {
        return null;
      }
    })
    .filter(isValueTruthy);

  // todo: handle this better (Seems like it is not actually being caught)
  if (_.isEmpty(validChordProgressionsDescriptorList)) {
    // Note, when soloing songs that are not included in the difficult (I IV V vi) settings, this exception will fire and prevent testing of the progression
    // In that case, just comment out the exception for testing purposes
    throw new Error(
      `No chord progression matching selected chords! (${settings.includedChords.join(', ')}). Please select more chords. (I IV V vi will work)\n` +
        `If you're using it for debugging with the "solo" option, this fails because settings are not loaded immediately. Trying soloing another song with simple chords to go around the error`,
    );
  }

  return validChordProgressionsDescriptorList;
}
