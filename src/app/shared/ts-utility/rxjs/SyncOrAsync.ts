import { Observable } from 'rxjs';

export type Async<G> = Observable<G> | Promise<G>;

export type SyncOrAsync<G> = G | Async<G>;
