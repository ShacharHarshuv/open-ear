import * as _ from 'lodash';
import { DeepReadonly } from '../../utility';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
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
    // Note, when soloing songs that are not included in the difficult (I IV V vi) settings, this exception will fire and prevent testing of the progression
    // In that case, just comment out the exception for testing purposes
    throw new Error(
      `No chord progression matching selected chords! (${settings.includedChords.join(', ')}). Please select more chords. (I IV V vi will work)\n` +
        `If you're using it for debugging with the "solo" option, this fails because settings are not loaded immediately. Trying soloing another song with simple chords to go around the error`,
    );
  }

  return validChordProgressionsDescriptorList;
}
