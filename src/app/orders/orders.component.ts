import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { Order } from '../_models/order';
import { OrderItem } from '../_models/order-item';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: [ './orders.component.css' ]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.loadOrders();
  }

  private loadOrders() {
    this.orderService.getOrders().then(orders => {
      this.orders = orders;
    });
  }

  cancel(order: Order): void {
    this.orderService.cancelOrder(order)
      .then(() => {
        this.loadOrders();
      });
  }

  getOrderTotalPrice(items: OrderItem[]): number {
    return items.map(value => value.quantity * value.menuItem.price)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }
}
