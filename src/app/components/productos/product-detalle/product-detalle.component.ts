import { Component, Input, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';

import Swal from 'sweetalert2';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detalle',
  templateUrl: './product-detalle.component.html',
  styleUrls: ['./product-detalle.component.css']
})
export class ProductDetalleComponent implements OnInit {

  @Input()producto:Product;
  public title:string='Detalle del producto';
  public fotoSeleccionada:File;
  progreso:number=0;


  constructor(private productService: ProductoService,
    public modalService:ModalService, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  selecionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso=0;
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

    }
    this.productService.subirFoto(this.fotoSeleccionada, this.producto.id)
    .subscribe(event=>{
      if(event.type=== HttpEventType.UploadProgress){
        this.progreso=Math.round((event.loaded/event.total)*100);
      }
      else if(event.type=== HttpEventType.Response){
        let response:any= event.body;
        this.producto=response.producto as Product;
        
        this.modalService.notificarUpload.emit(this.producto);
        Swal.fire(
          'La foto se ha subido correctamente',
          response.mensaje,
          'success'
        );
      }
    });
  }
  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada=null;
    this.progreso=0;
  }

}
