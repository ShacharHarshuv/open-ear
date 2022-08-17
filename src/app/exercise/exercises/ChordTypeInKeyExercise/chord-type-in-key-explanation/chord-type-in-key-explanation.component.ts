import { Component } from '@angular/core';
import { Chord } from '../../../utility/music/chords';
import { OneOrMany } from '../../../../shared/ts-utility';
import { NoteNumberOrName } from '../../../utility/music/notes/NoteNumberOrName';
import { NoteEvent } from '../../../../services/player.service';
import { Exercise } from '../../../Exercise';
import { chordTypeConfigMap } from '../../../utility/music/chords/Chord/ChordType';
import { chordTypeAnswerList } from '../chordTypeInKeyExercise';

@Component({
  selector: 'app-chord-type-in-key-explanation',
  templateUrl: './chord-type-in-key-explanation.component.html',
})
export class ChordTypeInKeyExplanationComponent {
  chords: {
    displayName: string;
    notesInC: string[];
    toPlay: OneOrMany<OneOrMany<NoteNumberOrName> | NoteEvent>;
  }[] = Exercise.flatAnswerList(chordTypeAnswerList).map(chordType => {
    const chordInC = new Chord({
      type: chordType,
      root: 'C',
    });
    return {
      displayName: chordTypeConfigMap[chordType].displayName,
      notesInC: chordInC.noteTypes,
      toPlay: {
        notes: chordInC.getVoicing({
          topVoicesInversion: 0,
        }),
        velocity: 0.3,
        duration: '1n',
      },
    }
  });
}
