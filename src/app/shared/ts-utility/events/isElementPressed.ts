import { elementStateFromEvents } from './elementStateFromEvent';

export const getElementIsPressedStream = elementStateFromEvents('pointerdown', 'pointerup');
