import { InjectionToken } from '@angular/core';
import { OneOrMany } from '../shared/ts-utility';

export const RELEASE_NOTES_TOKEN: InjectionToken<ReleaseNotes> = new InjectionToken('Release Notes');

export type ReleaseNotes = {
  version: string,
  notes: OneOrMany<string>
}[];

export const releaseNotes: ReleaseNotes = [
  {
    version: '1.1.3',
    notes: 'Cadence is always played in 120BPM regardless of BPM settings',
  },
  {
    version: '1.1.3',
    notes: 'Support multiple notes for Note in Key exercise (can be set up via "Number of notes" in the exercise settings)',
  },
  {
    version: '1.1.3',
    notes: 'Add the option to disable resolution in tonal exercise (Notes and Chords in Key)',
  },
  {
    version: '1.1.4',
    notes: 'Add the option move immediately to next question after answering',
  },
  {
    version: '1.1.5',
    notes: 'Add "Common Chord Progressions" Exercise. Try this to identify on the most popular and used progression.'
  },
  {
    version: '1.1.6',
    notes: 'Fix bug where right answers were not highlighted correctly'
  },
  {
    version: '1.2.1',
    notes: 'Support the minor mode for note in key exercise. Note you have to manually select relevant notes and cadence type (for now)'
  },
  {
    version: '1.2.2',
    notes: 'New "Notes with Chords" exercise. Practice it to memorize the sound of the same scale degrees above different chords.'
  },
  {
    version: '1.2.3',
    notes: 'Click other answers to listen to what they sound like after correct answer received',
  },
  {
    version: '1.2.4',
    notes: 'Settings for included answers have a more friendly layout that matches the answers in practice view',
  },
  {
    version: '1.2.5',
    notes: 'Support all modes and non-diatonic chords for Chord Functions Exercise. Note you have to manually select relevant chords and cadence type for the scale you want to practice in (for now)',
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
    notes: `"Reveal answer after first mistake" option - when checked, correct answer will be revealed after first mistake, so you don't have a "second chance" to find the right answer.`
  },
  {
    version: '1.2.9',
    notes: 'Improve performance for "Chord progressions in real songs" (Android only)',
  },
  {
    version: '1.2.10',
    notes: 'Enable a selection of range for "Scale Degree" exercise.'
  },
  {
    version: '1.2.11',
    notes: 'Add the options to reset statistics',
  },
  {
    version: '1.2.12',
    notes: 'Use numeric display instead of Moveable-Do for scale degrees exercise'
  },
  {
    version: '1.2.14',
    notes: 'Add more chord degrees options'
  },
  {
    version: '1.3.1',
    notes: 'Bass voice mode for Notes with Chord: Use it to learn how different bass notes sounds like under different chords. (essentially creating inversions or interesting suspensions)'
  },
  {
    version: '1.3.1',
    notes: 'Enable selection of chords in "Chord Progressions in Real Songs" exercise. (Android only)'
  },
  {
    version: '1.4.1',
    notes: '"Analyze by relative major tonic" option in Common Chord Progressions exercise. Use this to analyze roman numerals in relative major no matter what\'s the progression "real" mode.'
  },
  {
    version: '1.4.5',
    notes: '"Answer question automatically" - Use this together with "resolution" and "move automatically to next question" to create a "listening mode" where questions and resolutions will be played consecutively and help train your musical memory.'
  },
  {
    version: '1.5.1',
    notes: 'Adding more chords to Chord Types exercise (Currently supports 18 chord types)'
  }
]
