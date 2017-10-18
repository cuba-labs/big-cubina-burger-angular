import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../_models/menu-item';
import { MenuItemsService } from '../_services/menu-items.service';
import { Router } from '@angular/router';
import { UserInfo } from 'cuba-rest-js/dist-node/model';
import { UserService } from '../_services/user.service';
import { OrderItem } from '../_models/order-item';
import { OrderService } from '../_services/order.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-menu-items-browse',
  templateUrl: './menu-items-browse.component.html',
  styleUrls: [ './menu-items-browse.component.css' ]
})
export class MenuItemsBrowseComponent implements OnInit {
  menuItems: MenuItem[];
  userInfo: UserInfo;
  orderItems: OrderItem[];

  constructor(private menuItemsService: MenuItemsService,
              private router: Router,
              private storageService: StorageService,
              private userService: UserService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.userInfo = this.userService.getCurrentUser();
    this.userService.onUserInfoChanged().subscribe(() => {
      this.userInfo = this.userService.getCurrentUser();
      this.loadCartItemsFromStorage();
    });

    this.loadCartItemsFromStorage();

    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuItemsService.loadMenuItems()
      .then(value => {
        this.menuItems = value;
      });
  }

  create(): void {
    this.router.navigate([ '/edit' ]);
  }

  edit(item: MenuItem): void {
    this.router.navigate([ '/edit', item.id ]);
  }

  remove(event: Event, itemToRemove: MenuItem): void {
    this.menuItemsService.deleteMenuItem(itemToRemove)
      .then(() => {
        this.menuItems = this.menuItems.filter(item => item !== itemToRemove);
        this.orderItems = this.orderItems.filter(item => item.menuItem !== itemToRemove);
        this.updateCartItemsInStorage();
      });
    event.stopPropagation();
  }

  addToCart(menuItem: MenuItem): void {
    let orderItem: OrderItem;
    orderItem = this.orderItems.find(value => value.menuItem === menuItem);
    if (orderItem != null) {
      orderItem.quantity++;
    } else {
      orderItem = new OrderItem();
      orderItem.menuItem = menuItem;
      orderItem.quantity = 1;
      this.orderItems.push(orderItem);
    }
    this.updateCartItemsInStorage();
  }

  removeFromCart(event: Event, itemToRemove: OrderItem): void {
    this.orderItems = this.orderItems.filter(item => item !== itemToRemove);
    this.updateCartItemsInStorage();
    event.stopPropagation();
  }

  placeOrder(): void {
    this.orderService.placeOrder(this.orderItems)
      .then(() => {
        this.orderItems = [];
        this.updateCartItemsInStorage();
      });
  }

  getCartTotal(): number {
    return this.orderItems.length > 0
      ? this.orderItems.map(value => value.quantity * value.menuItem.price)
        .reduce((previousValue, currentValue) => previousValue + currentValue)
      : 0;
  }

  getImageUrl(menuItem: MenuItem): string {
    return this.menuItemsService.getImageUrl(menuItem);
  }

  private updateCartItemsInStorage(): void {
    if (this.userInfo != null) {
      this.storageService.setUserCartItems(this.userInfo, this.orderItems);
    }
  }

  private loadCartItemsFromStorage() {
    this.orderItems = this.userInfo != null
      ? this.storageService.getUserCartItems(this.userInfo)
      : [];
  }
}
