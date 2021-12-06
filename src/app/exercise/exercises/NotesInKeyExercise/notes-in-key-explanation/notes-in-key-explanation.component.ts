import {Component} from '@angular/core';
import {NoteEvent} from "../../../../services/player.service";
import {IV_V_I_CADENCE_IN_C} from "../../../utility/music/chords";

@Component({
  selector: 'app-notes-in-key-explanation',
  templateUrl: './notes-in-key-explanation.component.html',
})
export class NotesInKeyExplanationComponent {
  resolutionOfReInC: NoteEvent[] = [
    ...IV_V_I_CADENCE_IN_C,
    {
      notes: 'D3',
      duration: '2n.',
    },
    {
      notes: 'C3',
      duration: '2n',
    }
  ];
}
