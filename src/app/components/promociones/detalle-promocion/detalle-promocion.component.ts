import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Promocion } from 'src/app/models/promocion';
import { ModalService } from 'src/app/services/modal.service';
import { PromocionService } from 'src/app/services/promocion.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-detalle-promocion',
  templateUrl: './detalle-promocion.component.html',
  styleUrls: ['./detalle-promocion.component.css']
})
export class DetallePromocionComponent implements OnInit {

  @Input() promocion: Promocion;
  public fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private promocionService: PromocionService,
    public modalService:ModalService) { }

  ngOnInit(): void {
     }

  selecionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error selecionar Imagen ', 'el archivo debe ser de tipo Imagen', 'error');
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
      this.promocionService.subirFoto(this.fotoSeleccionada, this.promocion.id).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.promocion = response.promocion as Promocion;
            this.modalService.notificarUpload.emit(this.promocion)
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
