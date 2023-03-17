import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storagePromise: Promise<Storage> = this._storage.create();

  constructor(private _storage: Storage) {}

  async get(key: string): Promise<any> {
    return (await this.storagePromise).get(key);
  }

  async set(key: string, value: any): Promise<any> {
    return (await this.storagePromise).set(key, value);
  }
}
