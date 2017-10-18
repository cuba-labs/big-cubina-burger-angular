import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { MenuItemsService } from '../_services/menu-items.service';
import { MenuItem } from '../_models/menu-item';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-menu-item-edit',
  templateUrl: './menu-item-edit.component.html',
  styleUrls: [ './menu-item-edit.component.css' ]
})
export class MenuItemEditComponent implements OnInit {
  menuItem: MenuItem;
  newImageFile: File;
  newImageUrl: string;

  constructor(private menuItemsService: MenuItemsService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return (params.has('id'))
          ? this.menuItemsService.loadMenuItem(params.get('id'))
          : Promise.resolve(new MenuItem());
      })
      .subscribe(menuItem => this.menuItem = menuItem);
  }

  back(): void {
    this.location.back();
  }

  commit(): void {
    if (this.newImageFile != null) {
      this.menuItemsService.uploadFile(this.newImageFile).then(value => {
        this.menuItem.image = JSON.parse(value);
        this.commitMenuItem();
      });
    } else {
      this.commitMenuItem();
    }
  }


  private commitMenuItem(): void {
    this.menuItemsService.commitMenuItem(this.menuItem)
      .then(() => this.back());
  }

  getImageUrl(): string {
    return this.newImageUrl != null
      ? this.newImageUrl
      : this.menuItemsService.getImageUrl(this.menuItem);
  }

  onFileChanged(event: any): void {
    if (event.target.files && event.target.files[ 0 ]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.newImageUrl = e.target.result;
      };

      this.newImageFile = event.target.files[ 0 ];
      reader.readAsDataURL(this.newImageFile);
    }
  }
}
