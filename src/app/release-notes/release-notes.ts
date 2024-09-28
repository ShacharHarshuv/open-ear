import { InjectionToken } from '@angular/core';
import { OneOrMany } from '../shared/ts-utility';

export const RELEASE_NOTES_TOKEN: InjectionToken<ReleaseNotes> =
  new InjectionToken('Release Notes');

export type ReleaseNotes = {
  version: string;
  notes: OneOrMany<string>;
}[];

export const releaseNotes: ReleaseNotes = [
  {
    version: '1.1.3',
    notes: 'Cadence is always played in 120BPM regardless of BPM settings',
  },
  {
    version: '1.1.3',
    notes:
      'Support multiple notes for Note in Key exercise (can be set up via "Number of notes" in the exercise settings)',
  },
  {
    version: '1.1.3',
    notes:
      'Add the option to disable resolution in tonal exercise (Notes and Chords in Key)',
  },
  {
    version: '1.1.4',
    notes: 'Add the option move immediately to next question after answering',
  },
  {
    version: '1.1.5',
    notes:
      'Add "Common Chord Progressions" Exercise. Try this to identify on the most popular and used progression.',
  },
  {
    version: '1.1.6',
    notes: 'Fix bug where right answers were not highlighted correctly',
  },
  {
    version: '1.2.1',
    notes:
      'Support the minor mode for note in key exercise. Note you have to manually select relevant notes and cadence type (for now)',
  },
  {
    version: '1.2.2',
    notes:
      'New "Notes with Chords" exercise. Practice it to memorize the sound of the same scale degrees above different chords.',
  },
  {
    version: '1.2.3',
    notes:
      'Click other answers to listen to what they sound like after correct answer received',
  },
  {
    version: '1.2.4',
    notes:
      'Settings for included answers have a more friendly layout that matches the answers in practice view',
  },
  {
    version: '1.2.5',
    notes:
      'Support all modes and non-diatonic chords for Chord Functions Exercise. Note you have to manually select relevant chords and cadence type for the scale you want to practice in (for now)',
  },
  {
    version: '1.2.6',
    notes: `<b>OpenEar now accepts donations!</b> <a href="https://www.paypal.com/donate/?hosted_button_id=2WH25GBMCJTJS">Click here</a> to donate. Any sum is appreciated!`,
  },
  {
    version: '1.2.7',
    notes: `With "Chord Progression in Real Songs" Exercise, you can listen to real songs streaming from YouTube and try to identify their chord progressions.`,
  },
  {
    version: '1.2.7',
    notes: `"Reveal answer after first mistake" option - when checked, correct answer will be revealed after first mistake, so you don't have a "second chance" to find the right answer.`,
  },
  {
    version: '1.2.9',
    notes:
      'Improve performance for "Chord progressions in real songs" (Android only)',
  },
  {
    version: '1.2.10',
    notes: 'Enable a selection of range for "Scale Degree" exercise.',
  },
  {
    version: '1.2.11',
    notes: 'Add the options to reset statistics',
  },
  {
    version: '1.2.12',
    notes:
      'Use numeric display instead of Moveable-Do for scale degrees exercise',
  },
  {
    version: '1.2.14',
    notes: 'Add more chord degrees options',
  },
  {
    version: '1.3.1',
    notes:
      'Bass voice mode for Notes with Chord: Use it to learn how different bass notes sounds like under different chords. (essentially creating inversions or interesting suspensions)',
  },
  {
    version: '1.3.1',
    notes:
      'Enable selection of chords in "Chord Progressions in Real Songs" exercise. (Android only)',
  },
  {
    version: '1.4.1',
    notes:
      '"Analyze by relative major tonic" option in Common Chord Progressions exercise. Use this to analyze roman numerals in relative major no matter what\'s the progression "real" mode.',
  },
  {
    version: '1.4.5',
    notes:
      '"Answer question automatically" - Use this together with "resolution" and "move automatically to next question" to create a "listening mode" where questions and resolutions will be played consecutively and help train your musical memory.',
  },
  {
    version: '1.5.1',
    notes:
      'Adding more chords to Chord Types exercise (Currently supports 18 chord types)',
  },
  {
    version: '1.5.6',
    notes:
      'Enabled randomizing the key every X questions. Relevant for all tonal-based questions.',
  },
  {
    version: '1.5.7',
    notes:
      'Enable a selection of arpeggio direction for "Triad Inversion" exercise',
  },
  {
    version: '1.5.8',
    notes: 'Support multiple simultaneous voices for "Scale Degrees" exercise',
  },
  {
    version: '1.5.10',
    notes: 'Relative minor cadence',
  },
  {
    version: '1.5.11',
    notes: 'Support tonic drone for tonal exercises',
  },
  {
    version: '1.5.12',
    notes:
      'Support for harmonic intervals in interval excercise. Can switch betwen melodic or harmonic in the configuration of the interval excercise.',
  },
  {
    version: '1.5.14',
    notes: 'Support more instrument sounds in all exercises',
  },
  {
    version: '1.6.0',
    notes:
      'Multiple chord types in Chord Functions exercise. Long press on a chord in the settings to see more options.',
  },
  {
    version: '1.6.0',
    notes:
      'Support for analyzing chord progressions in real songs in the relative major mode, turned out by default. (Android only at the moment)',
  },
  {
    version: '1.6.1',
    notes: 'Practice "Notes With Chords" with 7th chords',
  },
  {
    version: '1.8.0',
    notes:
      'Support Chord Inversions (aka Slash Chords) in Chord Functions. Note the special notation used in this app: "I/3" in C major is C/E (equivalent to I6 in classical analysis) while I6 in C major is C6 (equivalent to I65 in classical analysis). See exercise explanation for more details. To use it - long press a chord option in the setting, and then long press one of the extension options to see inversions options.',
  },
  {
    version: '1.8.1',
    notes:
      'In Chords in Real Songs, Mixolydian progressions will now be analyzed in the mixolydian tonic by default. This can be customized so every mode is analyzed in the relative major.',
  },
  {
    version: '1.8.4',
    notes:
      'Chord functions progressions will attempt to put chords in sensible musical context, when using un-diatonic notes or inversions.',
  },
  {
    version: '1.9.0',
    notes:
      'Option for "Simplify Extensions" in Chords in Real Songs (Android only) is now available (and turned on by default)',
  },
];
