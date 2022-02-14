import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/interfaces/book';
import { Order } from 'src/app/interfaces/order';
import { BookService } from 'src/app/services/book.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.scss'],
})
export class ShopcartComponent implements OnInit {
  public order: Order;
  public redirectTo: string;

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.order = this.orderService.getOrder();
    if (!this.order) {
      this.order = {
        orderTotal: 0,
        products: [],
      };
    }
  }

  ngOnChanges(): void {
    console.log('Entre');
  }

  public clearCart(): void {
    if (confirm('¿Desea limpiar el carro de compra?')) {
      this.orderService.clearOrder();
      this.order = {
        orderTotal: 0,
        products: [],
      };
    }
  }

  public cancelPurchase(): void {
    if (confirm('¿Desea cancelar la compra?')) {
      this.orderService.clearOrder();
      alert('Su compra se ha cancelado');
      this.orderService.clearOrder();
      this.order = {
        orderTotal: 0,
        products: [],
      };
    }
  }

  public changeAmount(value, index): void {
    this.order.products[index].priceTotal =
      value * this.order.products[index].price;
    this.order.products[index].amount = value;
    let newOrderTotal = 0;
    for (const product of this.order.products) {
      newOrderTotal = newOrderTotal + product.priceTotal;
    }
    this.order.orderTotal = newOrderTotal;
    this.orderService.setOrder(this.order);
    this.order = this.orderService.getOrder();
  }

  public deleteProduct(index): void {
    if (confirm('¿Desea eliminar el producto?')) {
      this.order.products.splice(index, 1);
      const newOrderTotal = this.orderService.getOrderTotal(this.order);
      this.order.orderTotal = newOrderTotal;
      this.orderService.setOrder(this.order);
      this.order = this.orderService.getOrder();
    }
  }

  public confirmPurchase(): void {
    if (confirm('¿Desea confirmar la compra?')) {
      this.redirectTo = '../lobby';
      alert(
        'Hemos recibido su solicitud y será procesada por nuestros agentes. Gracias por su compra.'
      );
      for (const product of this.order.products) {
        this.bookService.getOneBookById(Number(product.id)).subscribe({
          next: (response: Book) => {
            const tempBook: Book = {
              id: Number(product.id),
              title: product.title,
              price: product.price,
              stock: response.stock - product.amount,
              imageUrl: product.imageUrl,
            };

            this.bookService.updateBook(tempBook).subscribe({
              next: () => {},
              error: (error: HttpErrorResponse) => {
                alert(error.message);
              },
            });
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        });
      }
      this.orderService.clearOrder();
    }
  }
}
