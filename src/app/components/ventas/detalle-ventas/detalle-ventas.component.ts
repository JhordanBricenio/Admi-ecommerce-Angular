import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Venta } from 'src/app/models/venta';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})
export class DetalleVentasComponent implements OnInit {

  public detalles: Venta = new Venta();
  public load_data = true;
  public id;

  constructor(private clienteService: ClienteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.clienteService.getOrdenCompra(this.id).subscribe(
      response => {
        this.detalles = response;
        console.log(this.detalles);
        
        this.load_data = false;
      });
  }
}
