import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Variedad } from 'src/app/models/variedad';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;


@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {

  public load_data = false;
  public load_btn = false;
  public id;
  public errors: string[];

  public producto: Product = new Product();
  public variedad:Variedad= new Variedad();

  constructor(private activateRoute: ActivatedRoute, private productService: ProductoService) { }

  ngOnInit(): void {
    this.cargarProducto();

  }
  cargarProducto(): void {
    this.activateRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.productService.getProducto(this.id).subscribe((producto) => {
        this.producto = producto;
        this.load_data = true;
      });
    });

  }

  agregarVariedad() {
    this.variedad.producto = this.producto;
    this.productService.agregarVariedadProducto(this.variedad).subscribe(response => {
      console.log(response);
      iziToast.show({
        title: 'OK',
        titleColor: '#1DC74C',
        class: 'text-success',
        position: 'topRight',
        message: 'Variedad agregada con exito'
      });
      this.variedad = new Variedad();
      this.cargarProducto();    
    },
      (err) => {
        this.errors = err.error.errors as string[];
        console.log('Codigo del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    );
   
  }
}
