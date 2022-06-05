import { MusicSymbol } from './MusicSymbol';

export function toMusicalTextDisplay(text: string): string {
  return text
    // @ts-ignore (For some reason this native methods is not updated in typescript types)
    .replaceAll('#', MusicSymbol.Sharp)
    .replaceAll('b', MusicSymbol.Flat)
    .replaceAll('dim', MusicSymbol.Diminished);
}
