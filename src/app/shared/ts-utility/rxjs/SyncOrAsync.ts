import { Observable } from 'rxjs';

export type SyncOrAsync<G> = G | Observable<G> | Promise<G>;
