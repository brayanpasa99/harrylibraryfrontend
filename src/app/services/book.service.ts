import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.apiServerUrl}/book/all`);
  }

  public addBook(book: Book): Observable<Book>{
    return this.http.post<Book>(`${this.apiServerUrl}/book/add`, book);
  }

  public updateBook(book: Book): Observable<Book>{
    return this.http.put<Book>(`${this.apiServerUrl}/book/update`, book);
  }

  public getOneBookById(bookId: number): Observable<Book>{
    return this.http.get<Book>(`${this.apiServerUrl}/book/find/${bookId}`)
  }

  public deleteBook(bookId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/book/delete/${bookId}`)
  }

}
