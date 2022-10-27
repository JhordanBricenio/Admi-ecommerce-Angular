import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-index-ventas',
  templateUrl: './index-ventas.component.html',
  styleUrls: ['./index-ventas.component.css']
})
export class IndexVentasComponent implements OnInit {
  public desde
  public hasta

  public ventas: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    if (this.desde == null && this.hasta == null) {
      this.adminService.getVentasByFecha().subscribe(
        response => {
          this.ventas = response;
        }
      );
    }
  }
  filtrar() {
    const dt = new Date(this.desde)
    const year = dt.getFullYear()
    const month = dt.getMonth() + 1
    const day = dt.getDate() + 1
    const fecha = year + '/' + month + '/' + day
    //Convertir fecha a tipo Date
    const fecha1 = new Date(fecha)
    

    const dt2 = new Date(this.hasta)
    const year2 = dt2.getFullYear()
    const month2 = dt2.getMonth() + 1
    const day2 = dt2.getDate() + 1
    const fecha2 = year2 + '/' + month2 + '/' + day2
    const fecha3 = new Date(fecha2)


    this.adminService.getVentasByFecha(fecha1,fecha3).subscribe(
      response => {
        this.ventas = response;
        });
      } 

}