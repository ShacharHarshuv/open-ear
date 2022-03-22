export interface IPlayer<GPartDescriptor> {
  init?(): Promise<void>

  isValidPart(part: any): part is GPartDescriptor;

  playPart(part: GPartDescriptor, onPartFinished: () => void): Promise<void>;

  stop(): Promise<void>;
}
