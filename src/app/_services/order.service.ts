import { Injectable } from '@angular/core';
import { CubaApp } from 'cuba-rest-js/dist-node/cuba';
import { AlertService } from './alert.service';
import { CubaIntegrationService } from './cuba-integration.service';
import { UserService } from './user.service';
import { Order } from '../_models/order';
import { OrderItem } from '../_models/order-item';

@Injectable()
export class OrderService {
  private static readonly ORDER_ENTITY_NAME = 'burger$Order';
  private static readonly SERVICE_NAME = 'burger_OrderService';

  private cubaApp: CubaApp;

  constructor(private alertService: AlertService,
              private cubaIntegrationService: CubaIntegrationService,
              private userService: UserService) {
    this.cubaApp = cubaIntegrationService.getCubaApp();
  }

  getOrders(): Promise<Order[]> {
    const user = this.userService.getCurrentUser();
    return user != null
      ? this.cubaApp.query(OrderService.ORDER_ENTITY_NAME, 'user-orders-query', { userLogin: user.login })
        .catch(reason => {
          this.handleError(reason);
        })
      : Promise.resolve([]);
  }

  placeOrder(orderItems: OrderItem[]): Promise<Order> {
    return this.cubaApp.invokeService(OrderService.SERVICE_NAME, 'placeOrder', { items: orderItems })
      .catch(reason => {
        this.handleError(reason);
      });
  }

  cancelOrder(order: Order): Promise<any> {
    return this.cubaApp.invokeService(OrderService.SERVICE_NAME, 'cancelOrder', { orderId: order.id })
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
