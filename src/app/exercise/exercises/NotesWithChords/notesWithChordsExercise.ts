import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { AnswerList, Exercise, NotesQuestion, SettingsControlDescriptor } from '../../exercise-logic';
import { randomFromList } from '../../utility';
import { NotesRange } from '../../utility/music/NotesRange';
import {
  Chord,
  Direction,
  IV_V_I_CADENCE_IN_C,
} from '../../utility/music/chords';
import { RomanNumeralChordSymbol } from '../../utility/music/harmony/RomanNumeralChordSymbol';
import { romanNumeralToChordInC } from '../../utility/music/harmony/romanNumeralToChordInC';
import { Interval } from '../../utility/music/intervals/Interval';
import { toNoteNumber } from '../../utility/music/notes/toNoteName';
import { SolfegeNote } from '../../utility/music/scale-degrees/SolfegeNote';
import { scaleDegreeToNoteType } from '../../utility/music/scale-degrees/scaleDegreeToNoteType';
import { solfegeNoteToScaleDegree } from '../../utility/music/scale-degrees/scaleDegreeToSolfegeNote';
import { transpose } from '../../utility/music/transpose';
import {
  TonalExerciseSettings,
  TonalExerciseUtils,
  useTonalExercise,
} from '../utility/exerciseAttributes/tonalExercise';
import {
  IncludedAnswersSettings,
  useIncludedAnswers,
} from '../utility/settings/IncludedAnswersSettings';
import { NotesWithChordsExplanationComponent } from './notes-with-chords-explanation/notes-with-chords-explanation.component';

type ChordDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type NoteWithChord = `${SolfegeNote}${ChordDegree}`;

type HarmonyMode = 'triad' | 'seventh';

export const noteWithChordDescriptorMap = ((): Partial<
  Record<
    NoteWithChord,
    {
      chord: Record<HarmonyMode, RomanNumeralChordSymbol>;
      solfegeNote: SolfegeNote;
    }
  >
> => {
  const I: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'I',
    seventh: 'Imaj7',
  };
  const ii: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'ii',
    seventh: 'ii7',
  };
  const iii: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'iii',
    seventh: 'iii7',
  };
  const IV: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'IV',
    seventh: 'IVmaj7',
  };
  const V: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'V',
    seventh: 'V7',
  };
  const vi: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'vi',
    seventh: 'vi7',
  };
  const viidim: Record<HarmonyMode, RomanNumeralChordSymbol> = {
    triad: 'viidim',
    seventh: 'viidim7',
  };

  return {
    Do1: {
      chord: I,
      solfegeNote: 'Do',
    },
    Do2: {
      chord: ii,
      solfegeNote: 'Do',
    },
    Do3: {
      chord: iii,
      solfegeNote: 'Do',
    },
    Do4: {
      chord: IV,
      solfegeNote: 'Do',
    },
    Do5: {
      chord: V,
      solfegeNote: 'Do',
    },
    Do6: {
      chord: vi,
      solfegeNote: 'Do',
    },
    Do7: {
      chord: viidim,
      solfegeNote: 'Do',
    },
    Re1: {
      chord: I,
      solfegeNote: 'Re',
    },
    Re2: {
      chord: ii,
      solfegeNote: 'Re',
    },
    Re3: {
      chord: iii,
      solfegeNote: 'Re',
    },
    Re4: {
      chord: IV,
      solfegeNote: 'Re',
    },
    Re5: {
      chord: V,
      solfegeNote: 'Re',
    },
    Re6: {
      chord: vi,
      solfegeNote: 'Re',
    },
    Re7: {
      chord: viidim,
      solfegeNote: 'Re',
    },
    Mi1: {
      chord: I,
      solfegeNote: 'Mi',
    },
    Mi2: {
      chord: ii,
      solfegeNote: 'Mi',
    },
    Mi3: {
      chord: iii,
      solfegeNote: 'Mi',
    }, 
    Mi4: {
      chord: IV,
      solfegeNote: 'Mi',
    },
    Mi5: {
      chord: V,
      solfegeNote: 'Mi',
    },
    Mi6: {
      chord: vi,
      solfegeNote: 'Mi',
    },
    Mi7: {
      chord: viidim,
      solfegeNote: 'Mi',
    },
    Fa1: {
      chord: I,
      solfegeNote: 'Fa',
    },
    Fa2: {
      chord: ii,
      solfegeNote: 'Fa',
    },
    Fa3: {
      chord: iii,
      solfegeNote: 'Fa',
    },
    Fa4: {
      chord: IV,
      solfegeNote: 'Fa',
    },
    Fa5: {
      chord: V,
      solfegeNote: 'Fa',
    },
    Fa6: {
      chord: vi,
      solfegeNote: 'Fa',
    },
    Fa7: {
      chord: viidim,
      solfegeNote: 'Fa',
    },
    Sol1: {
      chord: I,
      solfegeNote: 'Sol',
    },
    Sol2: {
      chord: ii,
      solfegeNote: 'Sol',
    },
    Sol3: {
      chord: iii,
      solfegeNote: 'Sol',
    },
    Sol4: {
      chord: IV,
      solfegeNote: 'Sol',
    },
    Sol5: {
      chord: V,
      solfegeNote: 'Sol',
    },
    Sol6: {
      chord: vi,
      solfegeNote: 'Sol',
    },
    Sol7: {
      chord: viidim,
      solfegeNote: 'Sol',
    },
    La1: {
      chord: I,
      solfegeNote: 'La',
    },
    La2: {
      chord: ii,
      solfegeNote: 'La',
    },
    La3: {
      chord: iii,
      solfegeNote: 'La',
    },
    La4: {
      chord: IV,
      solfegeNote: 'La',
    },
    La5: {
      chord: V,
      solfegeNote: 'La',
    },
    La6: {
      chord: vi,
      solfegeNote: 'La',
    },
    La7:{
      chord: viidim,
      solfegeNote: 'La',
    },
    Ti1: {
      chord: I,
      solfegeNote: 'Ti',
    },
    Ti2: {
      chord: ii,
      solfegeNote: 'Ti',
    },
    Ti3: {
      chord: iii,
      solfegeNote: 'Ti',
    },
    Ti4: {
      chord: IV,
      solfegeNote: 'Ti',
    },
    Ti5: {
      chord: V,
      solfegeNote: 'Ti',
    },
    Ti6: {
      chord: vi,
      solfegeNote: 'Ti',
    },
    Ti7: {
      chord: viidim,
      solfegeNote: 'Ti',
    },
  };
})();

// Custom settings for chord changes and notes per chord
type ChordAndNotesSettings = {
  numberOfChordChanges: number;
  numberOfNotesPerChord: number;
  chordVolume: number;
  melodyVolume: number;
};

const useChordAndNotesSettings = () => {
  const defaultSettings: ChordAndNotesSettings = {
    numberOfChordChanges: 1,
    numberOfNotesPerChord: 1,
    chordVolume: 0.3,
    melodyVolume: 1.0,
  };

  const chordChangesDescriptor: SettingsControlDescriptor<ChordAndNotesSettings> = {
    key: 'numberOfChordChanges',
    info: 'How many different chords to practice in one session (max 4 for 4/4 feel)',
    descriptor: {
      controlType: 'slider',
      label: 'Number of Chord Changes',
      min: 1,
      max: 4,
      step: 1,
    },
  };

  const notesPerChordDescriptor: SettingsControlDescriptor<ChordAndNotesSettings> = {
    key: 'numberOfNotesPerChord',
    info: 'How many notes to practice over each chord (max 4 for 4/4 feel)',
    descriptor: {
      controlType: 'slider',
      label: 'Notes per Chord',
      min: 1,
      max: 4,
      step: 1,
    },
  };

  const chordVolumeDescriptor: SettingsControlDescriptor<ChordAndNotesSettings> = {
    key: 'chordVolume',
    info: 'Volume of the chord accompaniment (0.1 = very quiet, 1.0 = full volume)',
    descriptor: {
      controlType: 'slider',
      label: 'Chord Volume',
      min: 0.1,
      max: 1.0,
      step: 0.1,
    },
  };

  const melodyVolumeDescriptor: SettingsControlDescriptor<ChordAndNotesSettings> = {
    key: 'melodyVolume',
    info: 'Volume of the melody note to identify (0.1 = very quiet, 1.0 = full volume)',
    descriptor: {
      controlType: 'slider',
      label: 'Melody Volume',
      min: 0.1,
      max: 1.0,
      step: 0.1,
    },
  };

  return {
    settingsDescriptors: [chordChangesDescriptor, notesPerChordDescriptor, chordVolumeDescriptor, melodyVolumeDescriptor],
    defaults: defaultSettings,
  };
};

const chordAndNotesSettings = useChordAndNotesSettings();

type NoteWithChordsSettings = TonalExerciseSettings &
  IncludedAnswersSettings<NoteWithChord> &
  ChordAndNotesSettings & {
    voiceMode: 'soprano' | 'bass';
    harmonyMode: HarmonyMode;
  };

export const allNotesWithChordsAnswersList = ((): AnswerList<NoteWithChord> => {
  const solfegeSyllables = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'] as const;
  const chordDegrees = [1, 2, 3, 4, 5, 6, 7] as const;
  return {
    rows: chordDegrees.map((chordDegree) =>
      solfegeSyllables.map(
        (solfegeNote): NoteWithChord => `${solfegeNote}${chordDegree}`,
      ),
    ),
  };
})();

const includedAnswers = useIncludedAnswers({
  name: 'Scale Degrees',
  fullAnswerList: allNotesWithChordsAnswersList,
});

const tonalExercise = useTonalExercise({
  keySelection: true,
  droneSelection: true,
});

export const notesWithChordsExercise: Exercise<
  NoteWithChord,
  NoteWithChordsSettings
> = {
  id: 'notesWithChords',
  name: 'Scale Degrees With Chords',
  summary:
    '(previously "Notes With Chords")\n Identify scale degrees in the context of different diatonic chords',
  explanation: NotesWithChordsExplanationComponent,
  logic: (settings) => {
    const voiceModeToRange: Record<
      NoteWithChordsSettings['voiceMode'],
      NotesRange
    > = {
      soprano: new NotesRange('C4', 'G5'),
      bass: new NotesRange('G2', 'B3'),
    };

    return {
      getQuestion() {
        function getQuestionInC(tonalExerciseUtils: TonalExerciseUtils) {
          // Generate chord progression with multiple notes per chord
          const segments: NotesQuestion<NoteWithChord>['segments'] = [];
          
          // First, extract available chord numbers from includedAnswers
          const availableChordNumbers = new Set<number>();
          settings.includedAnswers.forEach(answer => {
            const match = answer.match(/(\d+)$/);
            if (match) {
              availableChordNumbers.add(parseInt(match[1]));
            }
          });
          
          console.log('🎵 Available chord numbers:', Array.from(availableChordNumbers));
          console.log('🎵 Current Exercise Settings:');
          console.log(`   🎼 Key: ${settings.key || 'Not set'}`);
          console.log(`   🎼 Voice Mode: ${settings.voiceMode}`);
          console.log(`   🎼 Harmony Mode: ${settings.harmonyMode}`);
          console.log('   ──────────────────────────────');
          
          // Generate chord progression by selecting from available chord numbers
          const selectedChordNumbers: number[] = [];
          for (let chordIndex = 0; chordIndex < settings.numberOfChordChanges; chordIndex++) {
            const randomChordNumber = randomFromList(Array.from(availableChordNumbers));
            selectedChordNumbers.push(randomChordNumber);
            console.log(`🎼 Chord ${chordIndex + 1}: Selected chord number ${randomChordNumber}`);
          }
          
          console.log('🎸 Final chord progression:', selectedChordNumbers);
          
          // Then, for each chord, generate multiple notes
          for (let chordIndex = 0; chordIndex < settings.numberOfChordChanges; chordIndex++) {
            const selectedChordNumber = selectedChordNumbers[chordIndex];
            console.log(`🎵 Processing chord number ${selectedChordNumber}`);
            
            // Find all available answers for this chord number
            const availableAnswersForThisChord = settings.includedAnswers.filter(answer => {
              const match = answer.match(/(\d+)$/);
              return match && parseInt(match[1]) === selectedChordNumber;
            });
            
            console.log(`📋 Available answers for chord ${selectedChordNumber}:`, availableAnswersForThisChord);
            
            // Get the descriptor for this chord number (we'll use the first available answer)
            const firstAnswerForChord = availableAnswersForThisChord[0];
            if (!firstAnswerForChord) {
              throw new Error(`No answers found for chord number ${selectedChordNumber}`);
            }
            
            const descriptor = noteWithChordDescriptorMap[firstAnswerForChord];
            if (!descriptor) {
              throw new Error(`Missing descriptor for ${firstAnswerForChord}`);
            }
            
            // Test logging: Show the transformation process
            console.log(`🔍 Chord Translation Debug for "${firstAnswerForChord}":`);
            console.log(`   📋 Descriptor:`, descriptor);
            console.log(`   🎼 Roman Numeral: ${descriptor.chord[settings.harmonyMode]}`);
            console.log(`   🎼 Harmony Mode: ${settings.harmonyMode}`);
            
            // Debug: Let's see what romanNumeralToChordInC actually returns
            console.log(`   🔍 Calling romanNumeralToChordInC("${descriptor.chord[settings.harmonyMode]}")`);
            
            const chord = romanNumeralToChordInC(
              descriptor.chord[settings.harmonyMode],
            )!;
            
            console.log(`   🎼 Generated Chord:`, chord);
            console.log(`   🎼 Chord Root: ${chord.root}`);
            console.log(`   🎼 Chord Type: ${chord.type}`);
            console.log(`   🎼 Chord Symbol: ${chord.symbol}`);
            
            // Debug: Let's also check what a basic chord voicing looks like before any manipulation
            const basicVoicing = chord.getVoicing({
              position: 0,
              octave: 4,
              withBass: false,
            });
            console.log(`   🎼 Basic Chord Voicing (position 0, octave 4):`, basicVoicing.map(n => n.toString()));
            
            console.log('   ──────────────────────────────');
            
            for (let noteIndex = 0; noteIndex < settings.numberOfNotesPerChord; noteIndex++) {
              // For variety, use different scale degrees over the same chord
              // But only use scale degrees that the user has selected to practice for THIS chord
              const availableScaleDegrees = availableAnswersForThisChord.map(answer => {
                // Extract the scale degree (first part before the number)
                const match = answer.match(/^([A-Za-z]+)/);
                return match ? match[1] : 'Do';
              }).filter(scaleDegree => 
                ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'].includes(scaleDegree)
              ) as SolfegeNote[];
              
              if (availableScaleDegrees.length === 0) {
                // Fallback if no valid scale degrees found
                availableScaleDegrees.push('Do');
              }
              
              console.log(`🎵 Available scale degrees for chord ${selectedChordNumber}:`, availableScaleDegrees);
              const randomScaleDegree = randomFromList(availableScaleDegrees);
              console.log(`🎼 Note ${noteIndex + 1} over chord ${selectedChordNumber}: Selected scale degree "${randomScaleDegree}"`);
              
              // Test logging: Show scale degree transformation
              console.log(`🔍 Scale Degree Translation for "${randomScaleDegree}":`);
              console.log(`   🎵 Solfege: ${randomScaleDegree}`);
              console.log(`   🎵 Scale Degree: ${solfegeNoteToScaleDegree[randomScaleDegree]}`);
              console.log(`   🎵 Note Type (in C): ${scaleDegreeToNoteType(
                solfegeNoteToScaleDegree[randomScaleDegree]!,
                'C',
              )}`);
              console.log(`   🎵 Note Type (in B): ${scaleDegreeToNoteType(
                solfegeNoteToScaleDegree[randomScaleDegree]!,
                'B',
              )}`);
              console.log('   ──────────────────────────────');
              
              const noteType = scaleDegreeToNoteType(
                solfegeNoteToScaleDegree[randomScaleDegree]!,
                'C',
              );
              
              let chordVoicing = chord.getVoicing({
                position: randomFromList([0, 1, 2]),
                octave: 4,
                withBass: false,
              });
              
              const possibleNotesToSelect: Note[] = tonalExerciseUtils
                .getRangeForKeyOfC(voiceModeToRange[settings.voiceMode])
                .getAllNotes([noteType]);
              let note: Note = randomFromList(possibleNotesToSelect);
              
              if (settings.voiceMode === 'soprano') {
                while (toNoteNumber(note) < toNoteNumber(_.last(chordVoicing)!)) {
                  chordVoicing = Chord.invertVoicing(chordVoicing, Direction.Down);
                }
              } else {
                while (toNoteNumber(note) > toNoteNumber(_.first(chordVoicing)!)) {
                  chordVoicing = Chord.invertVoicing(chordVoicing, Direction.Up);
                }
              }
              
              if (settings.voiceMode === 'soprano') {
                let bass = chord.getBass();
                if (
                  toNoteNumber(_.last(bass)!) > toNoteNumber(_.first(chordVoicing)!)
                ) {
                  bass = transpose(bass, -Interval.Octave);
                }
                chordVoicing.unshift(...bass);
              }
              
              // Create the answer based on the actual scale degree being played over the chord
              const actualAnswer: NoteWithChord = `${randomScaleDegree}${selectedChordNumber}` as NoteWithChord;
              console.log(`✅ Generated answer: "${actualAnswer}" (${randomScaleDegree} over chord ${selectedChordNumber})`);
              
              // Log the audio details for debugging
              console.log(`🎵 Audio Generation for "${actualAnswer}":`);
              console.log(`   🎼 Final Chord Notes:`, chordVoicing.map(n => n.toString()));
              console.log(`   🎼 Chord Volume: ${settings.chordVolume}`);
              console.log(`   🎵 Final Melody Note: ${note.toString()}`);
              console.log(`   🎵 Melody Volume: ${settings.melodyVolume}`);
              console.log(`   ⏱️ Duration: 2n (half note)`);
              console.log(`   🎯 Answer: ${actualAnswer}`);
              console.log(`   🎼 Roman Numeral: ${descriptor.chord[settings.harmonyMode]}`);
              console.log(`   🎼 Chord Type: ${chord.type}`);
              console.log(`   🎼 Chord Root: ${chord.root}`);
              console.log('   ──────────────────────────────');
              
              segments.push({
                rightAnswer: actualAnswer,
                partToPlay: [
                  {
                    notes: chordVoicing,
                    velocity: settings.chordVolume,
                    time: 0,
                    duration: '2n',
                  },
                  {
                    notes: [note],
                    velocity: settings.melodyVolume,
                    time: 0,
                    duration: '2n',
                  },
                ],
              });
            }
          }

          // Log final summary of all segments
          console.log('🎵 Final Exercise Summary:');
          console.log(`   📊 Total Segments: ${segments.length}`);
          console.log(`   🎼 Chord Changes: ${settings.numberOfChordChanges}`);
          console.log(`   🎵 Notes per Chord: ${settings.numberOfNotesPerChord}`);
          console.log(`   🔊 Chord Volume: ${settings.chordVolume}`);
          console.log(`   🔊 Melody Volume: ${settings.melodyVolume}`);
          console.log(`   🎼 Exercise Key: ${settings.key || 'Not set'}`);
          console.log(`   🎼 Function Name: getQuestionInC (but may use actual key)`);
          console.log('   ──────────────────────────────');
          
          return {
            segments: segments,
          };
        }

        return tonalExercise.getQuestion(
          settings,
          getQuestionInC,
          IV_V_I_CADENCE_IN_C,
        );
      },
      answerList: tonalExercise.answerList(
        includedAnswers.answerList(settings),
      ),
    };
  },
  settingsConfig: {
    controls: [
      ...tonalExercise.settingsDescriptors,
      includedAnswers.settingDescriptor,
      ...chordAndNotesSettings.settingsDescriptors,
      {
        key: 'voiceMode',
        info:
          'With soprano mode, the note in question will be played on top. \n' +
          'With bass mode, the note in question will be played at the bottom (affectively changing the chord inversion)',
        descriptor: {
          label: 'Voice Mode',
          controlType: 'select',
          options: [
            {
              label: 'Soprano',
              value: 'soprano',
            },
            {
              label: 'Bass',
              value: 'bass',
            },
          ],
        },
      },
      {
        key: 'harmonyMode',
        info:
          'With triad mode, the chords will be triads. \n' +
          'With seventh mode, the chords will be seventh chords',
        descriptor: {
          label: 'Harmony Mode',
          controlType: 'select',
          options: [
            {
              label: 'Triad',
              value: 'triad',
            },
            {
              label: 'Seventh',
              value: 'seventh',
            },
          ],
        },
      },
    ],
    defaults: {
      ...tonalExercise.defaults,
      ...includedAnswers.defaults,
      ...chordAndNotesSettings.defaults,
      includedAnswers: ['Do1', 'Do3', 'Do5'],
      voiceMode: 'soprano',
      harmonyMode: 'triad',
      numberOfChordChanges: 1,
      numberOfNotesPerChord: 1,
      chordVolume: 0.3,
      melodyVolume: 1.0,
    },
  },
};
