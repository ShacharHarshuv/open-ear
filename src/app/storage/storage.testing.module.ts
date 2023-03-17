import { NgModule } from "@angular/core";
import { StorageMigrationServiceMock } from "./storage-migration.service.mock";

@NgModule({
  providers: [...StorageMigrationServiceMock.providers],
})
export class StorageTestingModule {}
