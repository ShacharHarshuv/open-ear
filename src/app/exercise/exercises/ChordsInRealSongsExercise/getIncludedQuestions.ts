import * as _ from 'lodash';
import { DeepReadonly } from '../../utility';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
import { ChordsInRealSongsSettings } from './chordsInRealSongsExercise';
import { YouTubeSongQuestion, songChordQuestions } from './songQuestions';

export function noMatchingChordProgressionsError(
  includedChords: readonly string[],
) {
  return new Error(
    `No chord progression matching selected chords! (${includedChords.join(', ')}). Please select more chords. (I IV V vi will work)\n` +
      `If you're using it for debugging with the "solo" option, this fails because settings are not loaded immediately. Trying soloing another song with simple chords to go around the error`,
  );
}

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
      return {
        ...chordProgression,
        chords: _.map(chordProgression.chords, (chord) => ({
          ...chord,
          chord: RomanNumeralChord.convertAnalysis({
            chordSymbol: chord.chord,
            mode: chordProgression.mode,
            currentModalAnalysis: chordProgression.analysis ?? 'tonic-1',
            desiredModalAnalysis: settings.modalAnalysis,
          }),
        })),
      };
    })
    .filter(({ chords }) => isAllChordsIncluded(chords));

  if (_.isEmpty(validChordProgressionsDescriptorList)) {
    // Empty list: do not throw here — exercise.logic() must complete so signal computeds
    // (e.g. answerList) do not re-throw on every change detection. The same error is thrown
    // from getQuestion when the user actually needs a progression (see chordsInRealSongsExercise).
    return [];
  }

  return validChordProgressionsDescriptorList;
}
