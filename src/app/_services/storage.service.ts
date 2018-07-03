import { Injectable } from '@angular/core';
import { UserInfo } from '@cuba-platform/rest';
import { OrderItem } from '../_models/order-item';

@Injectable()
export class StorageService {
  private static readonly CURRENT_USER_KEY = 'currentUser';
  private static readonly CART_ITEMS_KEY = 'cartItems-';

  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  getStorage(): Storage {
    return this.storage;
  }

  getCurrentUser(): UserInfo {
    if (this.storage.getItem(StorageService.CURRENT_USER_KEY) !== null) {
      return JSON.parse(this.storage.getItem(StorageService.CURRENT_USER_KEY));
    }
  }

  setCurrentUser(user: UserInfo) {
    this.storage.setItem(StorageService.CURRENT_USER_KEY, JSON.stringify(user));
  }

  getUserCartItems(userInfo: UserInfo): OrderItem[] {
    return localStorage.getItem(this.getCartItemsKey(userInfo)) !== null
      ? JSON.parse(localStorage.getItem(this.getCartItemsKey(userInfo)))
      : [];
  }

  setUserCartItems(user: UserInfo, items: OrderItem[]): void {
    localStorage.setItem(this.getCartItemsKey(user), JSON.stringify(items));
  }

  private getCartItemsKey(userInfo: UserInfo): string {
    return StorageService.CART_ITEMS_KEY + userInfo.id;
  }
}
