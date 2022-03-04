# OpenEar
![featured_graphics_narrow](https://user-images.githubusercontent.com/4821858/142941962-efc78796-cc85-4224-8baa-a3faaee9f6f4.png)


OpenEar is an open source ear training app for musicians. It's goal is to provide a flexible variety of exercises so musicians will be able to master recognizing any musical pattern that might help them become better musicians. 

Currently includes the following built in exercises:

1. Identify notes & melodies in a tonal context 
2. Identify chord & chord progressions in a tonal context
3. Identify chord types (minor / major)
4. Identify a triad chord inversion in close position
5. Identify intervals (without context)

[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"
     alt="Get it on F-Droid"
     height="80">](https://f-droid.org/packages/com.openear.www/)
[<img src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png"
     alt="Get it on Google Play"
     height="80">](https://play.google.com/store/apps/details?id=com.openear.www)

![screenshots](https://user-images.githubusercontent.com/4821858/142942603-4fb8e1cd-49b7-4029-b8f0-1f60a93e0cab.png)

## Contribution

OpenEar app is built in Angular using the Ionic library. It uses [Tone.js](https://tonejs.github.io/) to generate sounds.
The easiest way to contribute to OpenEar is creating some new exercises on the existing infra. 
To contribute follow the following steps.

* Fork the repository
* Open the repository root
* Download and install node at https://nodejs.org/en/download/ (If not already installed)
* Install ionic globally by running `npm i @ionic/cli -g`
* Install yarn globally by running `npm install --global yarn` (If not already installed)
* At the repository root directory run `yarn`
* Run `yarn start`
* App should be served in the browser!

To implement new exercises, you need to write a class that implements `Exercise.IExercise` interface. See examples in src/app/exercise/exercises.
After implementing this class you will need to add it to `ExerciseService#_exerciseList`.

If you would like to contribute in adding some features to the core infra of the app, you can do so as well. Here is a quick description of the infra:
- PlayerService is a wrapper on Tone.js that enables playing parts and return a promise that resolves when the part completed playing.
- ExerciseStateService manages the state of the exercise, including user actions (like answering, requesting repeat etc.). This does not hold any UI element. 
- ExercisePage is the UI part of ExerciseStateService, and it manages rendering the UI, getting user input and displaying any indication. 
- Under src/app/exercise you will also find a "utility" folder that has a tone of musical utilities like generating scales, chord progression etc. You can also convert notes to numbers to make calculation to them etc. 

### Version Management

The version name is in the `package.json`, and currently needs to be changed manually using the following convention:
* Each version has a major, minor and patch numbers, like so: `{major}.{minor}.{patch}`.
* When making a new feature or fixing a bug (anything that changes app behavior) the patch number should be incremented. Building a tag for the version is optional.
* When releasing a new version, the minor should be incremented, and a tag for release should be created (i.e. `v1.2.3`)
* The major number is reserved for big changes.
* When building the app, the version needs to be set manually in the apk. (In the future we hope to automate that process).


## License

Copyright 2021 Shachar Har-Shuv

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Credits

Piano samples used by Jan Frost from [@audio-samples/piano-mp3-*](https://github.com/darosh/samples-piano-mp3]).
