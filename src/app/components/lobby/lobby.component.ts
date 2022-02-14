import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';
import { Order } from 'src/app/interfaces/order';
import { BookService } from 'src/app/services/book.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  public books: Book[];
  public order: Order;

  constructor(
    private bookService: BookService,
    private orderService: OrderService
  ) {
    this.order = {
      orderTotal: 0,
      products: [],
    };
  }

  ngOnInit(): void {
    this.getAllBooks();
    if (this.orderService.getOrder()){
      this.order = this.orderService.getOrder()
    }
  }

  public getAllBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onAddBook(addBook: NgForm): void {
    addBook.value.priceTotal = addBook.value.price * addBook.value.amount;
    this.order.orderTotal = this.order.orderTotal + addBook.value.priceTotal;
    this.order.products.push(addBook.value);
    this.orderService.setOrder(this.order);
    alert('Producto añadido al carrito');
  }
}
