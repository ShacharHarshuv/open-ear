import * as _ from 'lodash';

export function randomFromList<G>(list: ReadonlyArray<G>): G {
  return list[_.random(0, list.length - 1)];
}
