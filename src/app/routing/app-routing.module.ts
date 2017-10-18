import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemsBrowseComponent } from '../menu-items-browse/menu-items-browse.component';
import { MenuItemEditComponent } from '../menu-item-edit/menu-item-edit.component';
import { LoginComponent } from '../login/login.component';
import { OrdersComponent } from '../orders/orders.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: MenuItemsBrowseComponent },
  { path: 'edit', component: MenuItemEditComponent, canActivate: [ AuthGuard ] },
  { path: 'edit/:id', component: MenuItemEditComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [ AuthGuard ] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
