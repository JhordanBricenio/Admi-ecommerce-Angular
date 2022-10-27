import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { Cliente } from '../models/cliente';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contacto } from '../models/contacto';
import { AdminService } from './admin.service';

declare var iziToast: any;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;
  private httheaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private Router: Router, private adminService: AdminService) {
    this.url = GLOBAL.url;
  }
  public agregarAuthorizationHeader() {
    let token = this.adminService.token;
    if (token != null) {
      return this.httheaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httheaders;
  }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.url + '/clientes' + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Cliente[]).forEach((cliente) => {
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

  create(cliente: Cliente) {
    return this.http
      .post(this.url + '/clientes', cliente, { headers: this.httheaders })
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => e);
          }
          console.log(e.error.mensaje);
          iziToast.show({
            title: 'Error',
            titleColor: '#FF0000',
            class: 'text-danger',
            position: 'topRight',
            message: `${e.error.mensaje}`
          });
          // swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );

  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url+'/clientes'}/${id}`).pipe(
      catchError((e) => {
        console.log(e.error.mensaje);
        Swal.fire(' Error al obtener', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.url+'/clientes'}/${cliente.id}`, cliente, { headers: this.httheaders }).pipe(
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

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.url+'/clientes'}/${id}`, { headers: this.httheaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  //Listar contacos
  getContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.url + '/contacto');
  }

  //Cambiar estado de contacto
  updateContacto(contacto: Contacto): Observable<any> {
    return this.http.put<any>(`${this.url+'/contacto'}/${contacto.id}`, contacto, { headers: this.httheaders }).pipe(
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
  
  //Orden compra
   //Obtener orden de compra
   getOrdenCompra(id): Observable<any>{
    return this.http.get(`${this.url+'/ventas/detalle'}/${id}`);
  }

}
