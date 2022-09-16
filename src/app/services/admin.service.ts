import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url;

  constructor() {
    this.url= GLOBAL.url;
   }
}
