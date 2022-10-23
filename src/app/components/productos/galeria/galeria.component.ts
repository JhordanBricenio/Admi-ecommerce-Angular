import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Galeria } from 'src/app/models/galeria';
import { Product } from 'src/app/models/product';
import { GaleriaService } from 'src/app/services/galeria.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  public id;
  public producto:Product= new Product();
  public galeria:Galeria= new Galeria();
  public load_data = false;
  public fotoSeleccionada:File;


  constructor(private activateRoute:ActivatedRoute, private productService: ProductoService,
    private galeriaService:GaleriaService
     ) { }

  ngOnInit(): void {
    this.cargarProducto();

  }
  cargarProducto(): void {
    this.activateRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.productService.getProducto(this.id).subscribe((producto) => {
        this.producto = producto;
        console.log(this.producto);
        this.load_data = true;
      });
    });

  }
  selecionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    if(this.fotoSeleccionada.type.indexOf('image')<0){
      Swal.fire(
        'Error selecionar Imagen ',
        'el archivo debe ser de tipo Imagen',
        'error'
      );
      this.fotoSeleccionada=null;
    }

  }
  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire(
        'Error Upload ',
        'Debe selecionar una foto',
        'error'
      );

    }else{
      this.galeria.producto=this.producto;
      this.galeriaService.subirGaleria(this.fotoSeleccionada,this.galeria).subscribe((galeria)=>{
       // this.producto.galeria.push(galeria);
        Swal.fire(
          'Foto subida ',
          'La foto se subio correctamente',
          'success'
        );
        this.fotoSeleccionada=null;
      });
    }}

}
