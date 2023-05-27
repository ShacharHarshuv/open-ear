import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { PublicMembers } from '../shared/ts-utility/PublicMembers';

@Injectable()
export class StorageServiceMock implements PublicMembers<StorageService> {
  async get(key: string): Promise<any> {}

  async set(key: string, value: any): Promise<any> {}
}
