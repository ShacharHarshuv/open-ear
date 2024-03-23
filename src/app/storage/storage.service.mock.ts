import { Injectable } from '@angular/core';
import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { StorageService } from './storage.service';

@Injectable()
export class StorageServiceMock implements PublicMembers<StorageService> {
  async get(key: string): Promise<any> {}

  async set(key: string, value: any): Promise<any> {}
}
