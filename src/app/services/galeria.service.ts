import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Galeria } from '../models/galeria';
import { GLOBAL } from './GLOBAL';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  public url;
  private httheaders = new HttpHeaders({'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private Router: Router) {
    this.url = GLOBAL.url;
  }

  //subir la galeria para productos
  subirGaleria(file:File,galeria:Galeria):Observable<Galeria>{
    let formData = new FormData();
    formData.append('file', file);
    formData.append('galeria', JSON.stringify(galeria));
    return this.http.post(`${this.url}/products`+'/galeria', formData).pipe(
      map((response: any) => response.imagen as Galeria),
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })

    )    
  }
}
