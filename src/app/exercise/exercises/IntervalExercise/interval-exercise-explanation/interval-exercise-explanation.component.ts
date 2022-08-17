import { Component } from '@angular/core';
import {
  IntervalDescriptor,
  intervalDescriptorList,
} from "../intervalExercise";
import { NoteEvent } from "../../../../services/player.service";
import {
  OneOrMany,
  toNoteNumber,
} from "../../../utility";
import { NoteNumberOrName } from "../../../utility/music/notes/NoteNumberOrName";

@Component({
  selector: 'app-interval-exercise-explanation',
  templateUrl: './interval-exercise-explanation.component.html',
})
export class IntervalExerciseExplanationComponent {
  readonly intervalDescriptorList: (IntervalDescriptor & { toPlay: OneOrMany<OneOrMany<NoteNumberOrName> | NoteEvent> })[] = intervalDescriptorList.map(interval => ({
    ...interval,
    toPlay: ['C4', toNoteNumber('C4') + interval.semitones],
  }));
}
