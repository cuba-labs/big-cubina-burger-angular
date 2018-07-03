import { Injectable } from '@angular/core';
import { initializeApp, CubaApp } from '@cuba-platform/rest';

import { StorageService } from './storage.service';

@Injectable()
export class CubaIntegrationService {
  static readonly FILES_PATH = 'v2/files/';
  private cubaApp: CubaApp;

  constructor(private storageService: StorageService) {
  }

  getCubaApp(): CubaApp {
    if (this.cubaApp == null) {
      this.cubaApp = initializeApp({
        name: 'big-cubina-burger',
        apiUrl: 'http://localhost:8080/app/rest/',
        storage: this.storageService.getStorage()
      });
    }

    return this.cubaApp;
  }

  getFilesAbsoluteUrl(): string {
    return this.cubaApp.apiUrl + CubaIntegrationService.FILES_PATH;
  }
}
