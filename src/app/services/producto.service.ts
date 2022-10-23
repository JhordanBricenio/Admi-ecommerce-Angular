import { HttpClient, HttpHeaders, HttpEvent ,HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable,tap, throwError } from 'rxjs';
import { Categoria } from '../models/categoria';
import { Product } from '../models/product';
import { GLOBAL } from './GLOBAL';
import Swal from 'sweetalert2';
import { Inventario } from '../models/inventario';
import { Marca } from '../models/marca';
import { Variedad } from '../models/variedad';

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
  getProducts(page: number): Observable<any> {
    return this.http.get(this.url +'/products' + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Product[]).forEach((product) => {
        });
      }),
      map((response: any) => {
        (response.content as Product[]).map((product) => {
         // product.titulo = product.titulo.toUpperCase();
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

  update(producto: Product): Observable<any> {
    return this.http.put<any>(`${this.url+'/products'}/${producto.id}`, producto, { headers: this.httheaders }).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }


  getProducto(id): Observable<Product> {
    return this.http.get<Product>(`${this.url+'/products'}/${id}`).pipe(
      catchError((e) => {
        this.Router.navigate(['/productos']);
        Swal.fire(' Error al obtener', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }
  getInventario(id): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.url+'/products/inventario'}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(' Error al obtener', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }


  subirFoto(file: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    const req= new HttpRequest('POST',`${this.url}/products`+'/upload', formData,{
      reportProgress:true
    });

    return this.http.request(req).pipe(
      catchError(e =>{
     // this.isNoAutorizado(e);
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

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.url + '/products/marcas').pipe(
      catchError(e => {
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Product> {
    return this.http
      .delete<Product>(`${this.url}/products/${id}`, {
        headers: this.httheaders,
      })
      .pipe(
        catchError((e) => {
          //console.log(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          //return throwError(e);
          return throwError(() => e);
        })
      );
  }

  //agregar variedad
  agregarVariedadProducto(variedad:Variedad) : Observable<Variedad>{
    return this.http.post<Variedad>(this.url + '/products/variedad', variedad, {headers: this.httheaders }).pipe(
      catchError(e => {
        iziToast.error({
          title: 'Error',
          message: e.error.mensaje,
        });
        return throwError(() => e);
      })

    );
  }


}

