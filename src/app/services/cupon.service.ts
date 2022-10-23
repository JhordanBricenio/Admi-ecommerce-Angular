import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cupon } from '../models/cupon';
import { ClienteService } from './cliente.service';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  public url;
  private httheaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private clienteService: ClienteService) {
    this.url = GLOBAL.url;
  }

  getCupones(): Observable<Cupon[]> {
    return this.http.get<Cupon[]>(this.url + '/cupones');
  }

  create(cupon: Cupon) {
    return this.http.post(this.url + '/cupones', cupon, {
      headers: this.clienteService.agregarAuthorizationHeader(),
    });
  }
  getCupon(id): Observable<Cupon> {
    return this.http.get<Cupon>(`${this.url + '/cupones'}/${id}`);
  }
  updateCategoria(cupon: Cupon): Observable<Cupon> {
    return this.http.put<any>(
      `${this.url + '/cupones'}/${cupon.id}`,cupon,{headers: this.httheaders}
    );
  }

  delete(id: number): Observable<Cupon> {
    return this.http.delete<Cupon>(`${this.url+ '/cupones'}/${id}`, {
      headers: this.httheaders,
    });
  }

}
