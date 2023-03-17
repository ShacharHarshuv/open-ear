import { Key } from "./Key";
import { toNoteNumber } from "../notes/toNoteName";
import { Note } from "tone/Tone/core/type/NoteUnits";
import { Interval } from "../intervals/Interval";

/**
 * Returns negative number if smaller
 * */
export function getDistanceOfKeys(to: Key, from: Key): number {
  let distance =
    toNoteNumber((to + '1') as Note) -
    toNoteNumber((from + '1') as Note); /* % Interval.Octave*/
  if (distance > 6) {
    distance = distance - Interval.Octave;
  } else if (distance < -6) {
    distance = distance + Interval.Octave;
  }
  return distance;
}
