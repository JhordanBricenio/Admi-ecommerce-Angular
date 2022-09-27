import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { GLOBAL } from './GLOBAL';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  public url;
  private httheaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private Router: Router) {
    this.url = GLOBAL.url;
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url + '/categorias');
  }

  create(categoria: Categoria) {
    return this.http.post(this.url + '/categorias', categoria, {
      headers: this.httheaders,
    });
  }
  getCategoria(id): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.url + '/categorias'}/${id}`);
  }
  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<any>(
      `${this.url + '/categorias'}/${categoria.id}`,
      categoria,
      {
        headers: this.httheaders,
      }
    );
  }

  delete(id: number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.url+ '/categorias'}/${id}`, {
      headers: this.httheaders,
    });
  }

  
}
