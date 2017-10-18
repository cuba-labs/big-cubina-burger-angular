import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuItemsBrowseComponent } from './menu-items-browse/menu-items-browse.component';
import { MenuItemEditComponent } from './menu-item-edit/menu-item-edit.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';

import { AlertService } from './_services/alert.service';
import { MenuItemsService } from './_services/menu-items.service';
import { AuthenticationService } from './_services/authentication.service';
import { CubaIntegrationService } from './_services/cuba-integration.service';
import { UserService } from './_services/user.service';
import { OrderService } from './_services/order.service';
import { AuthGuard } from './routing/auth.guard';
import { StorageService } from './_services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuItemsBrowseComponent,
    MenuItemEditComponent,
    AlertComponent,
    LoginComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ AuthGuard,
    AlertService,
    AuthenticationService,
    CubaIntegrationService,
    MenuItemsService,
    UserService,
    StorageService,
    OrderService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
