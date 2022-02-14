import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public order: Order;

  constructor() {}

  public setOrder(order: Order): void {
    localStorage.clear();
    localStorage.setItem('order', JSON.stringify(order));
  }

  public getOrder(): Order {
    return JSON.parse(localStorage.getItem('order'));
  }

  public clearOrder(): void {
    localStorage.removeItem('order');
  }

  public getOrderTotal(order): number {
    let newOrderTotal = 0;
    for (const product of order.products) {
      newOrderTotal = newOrderTotal + product.priceTotal;
    }
    return newOrderTotal;
  }
}
