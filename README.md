# open-ear

Open source app for earing exercise for musicians!

Currently includes the following built in exercises:

1. Identify interval
2. Identify note in a tonal context
3. Identify chord & chord progressions in a tonal context

## Contribution

1. Fork the repository
2. open the respository root
3. Run `yarn` or `npm i` (you may need to install node if you don't have it installed already)
4. ran `yarn start`
5. App should be served in the browser!

To implement new exercises, you need to write a class that implements `Exercise.IExercise` interface. See examples in src/app/exercise/exercises.
After implementing this class you will need to add it to `ExerciseService#_exerciseList`.
