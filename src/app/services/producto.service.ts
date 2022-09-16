import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable,tap, throwError } from 'rxjs';
import { Categoria } from '../models/categoria';
import { Product } from '../models/product';
import { GLOBAL } from './GLOBAL';

declare var iziToast: any;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;
  private httheaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private Router: Router) {
    this.url = GLOBAL.url;
  }
  getClientes(page: number): Observable<any> {
    return this.http.get(this.url +'/products' + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Product[]).forEach((product) => {
        });
      }),
      map((response: any) => {
        (response.content as Product[]).map((product) => {
          product.titulo = product.titulo.toUpperCase();
          return product;
        });
        return response;
      })
    );
  }


  create(producto: Product) {
    return this.http
      .post(this.url + '/products', producto, { headers: this.httheaders })
      .pipe(
        map((response: any) => response.cliente as Product),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => e);
          }
          console.log(e.error.mensaje);
          // swal.fire(e.error.mensaje, e.error.error, 'error');
          iziToast.show({
            title: `Error ${e.error.mensaje, e.error.error}`,
            titleColor: '#FF0000',
            class: 'text-danger',
            position: 'topRight',
            message: `${e.error.mensaje}`
          });
          return throwError(() => e);
        })
      );

  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url + '/products/categories').pipe(
      catchError(e => {
        return throwError(() => e);
      })
    );
  }

  getMarcas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url + '/products/marcas').pipe(
      catchError(e => {
        return throwError(() => e);
      })
    );
  }
}

