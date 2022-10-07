import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Marca } from 'src/app/models/marca';
import { Product } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $:any;

declare var iziToast: any;

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public producto: Product = new Product();
  public errors: string[];

  categorias:Categoria[];
  marcas:Marca[];


  constructor(private productService: ProductoService,
    private router: Router,
    private activateRoute: ActivatedRoute) { 
     
    }

  ngOnInit(): void {
    this.productService.getCategorias().subscribe(categories=>this.categorias= categories);
    this.productService.getMarcas().subscribe(marcas=>this.marcas= marcas);
    this.cargarProducto();
  }

  cargarProducto(): void {
    this.activateRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productService
          .getProducto(id)
          .subscribe(producto=>   
            this.producto = producto
            );
      }
    });

  }

  create(){
    console.log(this.producto);
    this.productService.create(this.producto).subscribe(
      (producto) => {
        this.router.navigate(['productos']);
        iziToast.show({
          title: 'success',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: `El producto ${this.producto.titulo} ha sido creado con éxito`,
        });
      },
      (err) => {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color:'#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Los datos del formulario no son válidos',
        });
        this.errors = err.error.errors as string[];
        console.log('Codigo del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      });
    
  }
  update(){
    this.productService.update(this.producto).subscribe(
        json => {
          this.router.navigate(['/productos']);
          Swal.fire('Producto Actualizado', `${json.mensaje}: ${json.producto.titulo}`, 'success');
        },
        err => {
          this.errors = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        })
  }


  compararCategoria(o1:Categoria, o2:Categoria):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  compararMarca(o1:Marca, o2:Marca):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }


}
