import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocion } from '../models/promocion';
import { ClienteService } from './cliente.service';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  public url;
  private httheaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private clienteService: ClienteService) {
    this.url = GLOBAL.url;
  }

  getPromociones(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(this.url + '/promocion');
  }
  create(promocion: Promocion) {
    return this.http.post(this.url + '/promocion', promocion, {
      headers: this.clienteService.agregarAuthorizationHeader(),
    });
  }
  getPromocion(id): Observable<Promocion> {
    return this.http.get<Promocion>(`${this.url + '/promocion'}/${id}`);
  }
  updatePromocion(promocion: Promocion): Observable<Promocion> {
    return this.http.put<any>(
      `${this.url + '/promocion'}/${promocion.id}`, promocion, { headers: this.httheaders }
    );
  }

  delete(id: number): Observable<Promocion> {
    return this.http.delete<Promocion>(`${this.url + '/promocion'}/${id}`, {
      headers: this.httheaders,
    });
  }
  subirFoto(file: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', file);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.url}/promocion` + '/upload', formData, {
      reportProgress: true
    });

    return this.http.request(req)
  }

}
