import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inventario } from 'src/app/models/inventario';
import { Product } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-inventario-product',
  templateUrl: './inventario-product.component.html',
  styleUrls: ['./inventario-product.component.css']
})
export class InventarioProductComponent implements OnInit {

  product:Product;
  inventario:Inventario;


  constructor( private productSevice: ProductoService,
    private activateRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      params=>{
        let id= params['id'];
        console.log(id);

        this.productSevice.getProducto(id).subscribe(
          response=>{
            this.product=response;
            console.log(this.product);
          }
        );
      }
    );
    this.getInventario();
  }
  getInventario(){
    this.activateRoute.params.subscribe(
      params=>{
        let id= params['id'];
        console.log(id);

        this.productSevice.getInventario(id).subscribe(
          response=>{
            this.inventario=response;
            console.log(this.product);
          }
        );
      }
    );
  }

}
