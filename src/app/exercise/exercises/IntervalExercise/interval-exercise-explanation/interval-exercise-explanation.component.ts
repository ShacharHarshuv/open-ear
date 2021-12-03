import {Component} from '@angular/core';
import {IIntervalDescriptor, IntervalExercise} from "../IntervalExercise";
import {NoteEvent} from "../../../../services/player.service";
import {OneOrMany, toNoteNumber} from "../../../utility";
import {NoteNumberOrName} from "../../../utility/music/notes/NoteNumberOrName";

@Component({
  selector: 'app-interval-exercise-explanation',
  templateUrl: './interval-exercise-explanation.component.html',
})
export class IntervalExerciseExplanationComponent {
  readonly intervalDescriptorList: (IIntervalDescriptor & {toPlay: OneOrMany<OneOrMany<NoteNumberOrName> | NoteEvent>})[] = IntervalExercise.intervalDescriptorList.map(interval => ({
    ...interval,
    toPlay: ['C4', toNoteNumber('C4') + interval.semitones],
  }));
}
