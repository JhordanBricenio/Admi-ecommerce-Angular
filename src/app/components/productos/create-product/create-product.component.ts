import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Marca } from 'src/app/models/marca';
import { Product } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';

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

  public imgSelect : any | ArrayBuffer = 'assets/img/R.jpg';
  public file : any = undefined;

  constructor(private productService: ProductoService,
    private router: Router,
    private activateRoute: ActivatedRoute) { 
     
    }

  ngOnInit(): void {
    this.productService.getCategorias().subscribe(categories=>this.categorias= categories);
    this.productService.getMarcas().subscribe(marcas=>this.marcas= marcas);
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

  fileChangeEvent(event:any):void{
    var file :any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'No hay un imagen de envio'
      });
    }

    if(file.size <= 4000000){

      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){
    
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect);
        
        reader.readAsDataURL(file);

         $('#input-portada').text(file.name);
        this.file = file;

      }else{
        iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'El archivo debe ser una imagen'
        });
         $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/R.jpg';
        this.file = undefined;
      }
    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'La imagen no puede superar los 4MB'
      });
       $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/R.jpg';
      this.file = undefined;
    }
    
    console.log(this.file);
    
  }

}
