import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-detalle',
  templateUrl: './categoria-detalle.component.html',
  styleUrls: ['./categoria-detalle.component.css']
})
export class CategoriaDetalleComponent implements OnInit {



  @Input() categoria: Categoria;
  public fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private categoriaService: CategoriaService,
    public modalService:ModalService) { }

  ngOnInit(): void {
     }

  selecionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error selecionar Imagen ', 'el archivo debe ser de tipo Imagen', 'error');
      //Limpiar el input
      this.fotoSeleccionada = null;
    }

  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire(
        'Error Upload ',
        'Debe selecionar una foto',
        'error'
      );

    } else {
      this.categoriaService.subirFoto(this.fotoSeleccionada, this.categoria.id).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.categoria = response.categoria as Categoria;
            //this.categoria=categoria
            this.modalService.notificarUpload.emit(this.categoria)
            Swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
}

cerrarModal(){
  this.modalService.cerrarModal();
  this.fotoSeleccionada = null;
  this.progreso = 0;
}

}
