import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3000/produtos'

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
      .pipe(map((obj) => obj),
        catchError(e => this.errorHandler(e))
      )
  }

  reader(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
      .pipe(map((obj) => obj),
        catchError(e => this.errorHandler(e))
      )
  }

  readerById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url)
      .pipe(map((obj) => obj),
        catchError(e => this.errorHandler(e))
      )
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
      .pipe(map((obj) => obj),
        catchError(e => this.errorHandler(e))
      )
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url)
      .pipe(map((obj) => obj),
        catchError(e => this.errorHandler(e))
      )
  }

}
