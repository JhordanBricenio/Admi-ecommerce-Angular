import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { Cliente } from '../models/cliente';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

declare var iziToast:any;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;
  private httheaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private Router: Router) {
    this.url= GLOBAL.url;
   }

   getClientes(page: number): Observable<any> {
    //return of(CLIENTES);
    return this.http.get(this.url +'/clientes' + '/page/' + page).pipe(
      tap((response: any) => {
        //console.log('ClientesService tap 01');
        (response.content as Cliente[]).forEach((cliente) => {
          //console.log(cliente);
        });
      }),
      map((response: any) => {
        (response.content as Cliente[]).map((cliente) => {
          cliente.nombres = cliente.nombres.toUpperCase();
          return cliente;
        });
        return response;
      })
    );
  }

  create(cliente: Cliente){
  return this.http
      .post(this.url +'/clientes', cliente, { headers: this.httheaders })
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => e);
          }
          console.log(e.error.mensaje);
         iziToast.show({
            title:'Error',
            titleColor:'#FF0000',
            class:'text-danger',
            position:'topRight',
            message:`${e.error.mensaje}`
          });
         // swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );

    }
}
