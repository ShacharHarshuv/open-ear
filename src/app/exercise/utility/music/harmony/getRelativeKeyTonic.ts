import { NoteType } from "../notes/NoteType";
import { Mode } from "./Mode";
import {
  toNoteTypeName,
  toNoteTypeNumber
} from "../notes/toNoteTypeNumber";
import { mod } from "../../../../shared/ts-utility/mod";
import { Interval } from "../intervals/Interval";

export function getRelativeKeyTonic(tonic: NoteType, mode: Mode): NoteType {
  const differenceToRelativeTonic = mode === Mode.Major ? -3 : 3;
  return toNoteTypeName(
    mod(toNoteTypeNumber(tonic) + differenceToRelativeTonic, Interval.Octave)
  );
}
