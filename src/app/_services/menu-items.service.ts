import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { MenuItem } from '../_models/menu-item';
import { CubaApp } from '@cuba-platform/rest';
import { CubaIntegrationService } from './cuba-integration.service';

@Injectable()
export class MenuItemsService {
  private static readonly ENTITY_NAME = 'burger$MenuItem';
  private static readonly ENTITY_VIEW = 'menuItem-view';

  private cubaApp: CubaApp;

  constructor(private alertService: AlertService,
              private cubaIntegrationService: CubaIntegrationService) {
    this.cubaApp = cubaIntegrationService.getCubaApp();
  }

  loadMenuItems(): Promise<MenuItem[]> {
    return this.cubaApp.loadEntities(MenuItemsService.ENTITY_NAME, { view: MenuItemsService.ENTITY_VIEW })
      .catch(reason => {
        this.handleError(reason);
      });
  }

  loadMenuItem(id: string): Promise<MenuItem> {
    return this.cubaApp.loadEntity(MenuItemsService.ENTITY_NAME, id, { view: MenuItemsService.ENTITY_VIEW })
      .catch(reason => {
        this.handleError(reason);
      });
  }

  commitMenuItem(item: MenuItem): Promise<MenuItem> {
    return this.cubaApp.commitEntity(MenuItemsService.ENTITY_NAME, item)
      .catch(reason => {
        this.handleError(reason);
      });
  }

  deleteMenuItem(itemToRemove: MenuItem): Promise<void> {
    return this.cubaApp.deleteEntity(MenuItemsService.ENTITY_NAME, itemToRemove.id)
      .catch(reason => {
        this.handleError(reason);
      });
  }

  getImageUrl(menuItem: MenuItem): string {
    return menuItem.image != null
      ? this.cubaIntegrationService.getFilesAbsoluteUrl() + menuItem.image.id
      : '/assets/images/placeholder-image.png';
  }

  uploadFile(file: File): Promise<any> {
    return this.cubaApp.fetch('POST', CubaIntegrationService.FILES_PATH + '/?name=' + file.name, file)
      .catch(reason => {
        this.handleError(reason);
      });
  }

  private handleError(error: any): void {
    error.response.json()
      .then(data => {
        this.alertService.error(data.error);
      });
  }
}
