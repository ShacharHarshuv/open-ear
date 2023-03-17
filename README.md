# OpenEar

![featured_graphics_narrow](https://user-images.githubusercontent.com/4821858/142941962-efc78796-cc85-4224-8baa-a3faaee9f6f4.png)

OpenEar is an open source ear training app for musicians. It's goal is to provide a flexible variety of exercises so musicians will be able to master recognizing any musical pattern that might help them become better musicians.

Currently includes the following built in exercises:

1. Scale degree / melodic recognition for any mode / scale including chromatic notes (fully customizable).
2. Recognizing of chord functions (Roman numeral analysis) for every triad (major, minor, diminished) in every mode / scale. (fully customizable)
3. Common progressions - choose out of a set of super common progressions (like I V iv IV) to learn to identify them.
4. Chord progressions in real songs (currently available for android only) - this will play songs directly from YouTube and ask you to identify to Roman numeral analysis of their chord progression. This is a great way to practice with real music in a fun way. (I've included many very popular songs that uses very popular chord progressions, I hope more can be added in the future)
5. "Notes with Chords" exercise - this is a less familiar exercise in which you ear both a note in the scale an a chord, and you're required to say what scale degree it is and what chord degree it is. It's incredibly powerful in understanding the different colors a single note can have when it's played over different chords, and in my experience help develop not only melodic recognition but also harmonic recognition.
6. Recognition of chord types (major / minor) in a diatonic context. This is really useful if the chord functions exercise is a bit too difficult for you. I hope more chord types and customability can be added to this in the future.
7. Interval recognition - the very popular exercise almost all app has. Although I do not recommend using it as I find it inaffective in confusing, since the intervals are out-of-context.

[<img src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png"
     alt="Get it on Google Play"
     height="80">](https://play.google.com/store/apps/details?id=com.openear.www)
[<img src="https://bdoc.co.il/wp-bdoc-content/uploads/iphone-app-store-badge.png"
     alt="Download on the app store"
     height="80">](https://apps.apple.com/il/app/openear-ear-training/id1616537214?l=iw)
[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"
     alt="Get it on F-Droid"
     height="80">](https://f-droid.org/packages/com.openear.www/)

![screenshots](https://user-images.githubusercontent.com/4821858/142942603-4fb8e1cd-49b7-4029-b8f0-1f60a93e0cab.png)

## Social Links

[<img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"/>](https://discord.gg/FzHGnU4zeE)
[<img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"/>](https://twitter.com/shuv_har)

## Donations

OpenEar has a paypal page you can donate money to: https://www.paypal.com/donate/?hosted_button_id=2WH25GBMCJTJS. All donations will be used for maintainance and development of the app. Any sum is appreciated.

## Contribution

OpenEar app is built in Angular using the Ionic library. It uses [Tone.js](https://tonejs.github.io/) to generate sounds.
The easiest way to contribute to OpenEar is creating some new exercises on the existing infra.
To contribute follow the following steps.

- Fork the repository
- Open the repository root
- Download and install node at https://nodejs.org/en/download/ (If not already installed)
- Install ionic globally by running `npm i @ionic/cli -g`
- Install yarn globally by running `npm install --global yarn` (If not already installed)
- At the repository root directory run `yarn`
- Run `yarn start`
- App should be served in the browser!

To implement new exercises, you need to implement the type `Exercise.IExercise` interface. This is typically done by writing a factory function that uses utility functions like createExercise and composeExercise. See examples of using the factory functions under src/app/exercise/exercises.
After implementing you will need to add it to `ExerciseService#_exerciseList`.

If you would like to contribute in adding some features to the core infra of the app, you can do so as well. Here is a quick description of the infra:

- PlayerService is a wrapper on Tone.js that enables playing parts and return a promise that resolves when the part completed playing.
- ExerciseStateService manages the state of the exercise, including user actions (like answering, requesting repeat etc.). This does not hold any UI element.
- ExercisePage is the UI part of ExerciseStateService, and it manages rendering the UI, getting user input and displaying any indication.
- Under src/app/exercise you will also find a "utility" folder that has a tone of musical utilities like generating scales, chord progression etc. You can also convert notes to numbers to make calculation to them etc.

### Version Management

The version name is in the `package.json`, and currently needs to be changed manually using the following convention:

- Each version has a major, minor and patch numbers, like so: `{major}.{minor}.{patch}`.
- When making a new feature or fixing a bug (anything that changes app behavior) the patch number should be incremented. Building a tag for the version is optional.
- When releasing a new version, the minor should be incremented, and a tag for release should be created (i.e. `v1.2.3`)
- The major number is reserved for big changes.
- When building the app, the version needs to be set manually in the apk. (In the future we hope to automate that process).

## License

Copyright 2021 Shachar Har-Shuv

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Credits

Piano samples used by Jan Frost from [@audio-samples/piano-mp3-\*](https://github.com/darosh/samples-piano-mp3).
