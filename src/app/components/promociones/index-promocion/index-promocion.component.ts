import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Promocion } from 'src/app/models/promocion';
import { ModalService } from 'src/app/services/modal.service';
import { PromocionService } from 'src/app/services/promocion.service';

declare var iziToast: any;

@Component({
  selector: 'app-index-promocion',
  templateUrl: './index-promocion.component.html',
  styleUrls: ['./index-promocion.component.css']
})
export class IndexPromocionComponent implements OnInit {

  public promociones:Promocion[]=[]
  promocionSeleccionada: Promocion;

  constructor(private promocionSErvice:PromocionService, private router:Router, 
    private modalService:ModalService) { }

  ngOnInit(): void {
    this.promocionSErvice.getPromociones().subscribe(
      response=>{
        this.promociones=response;
        this.promociones.forEach(promocion => {
          //convertir a timestamp
          var tt_inicio=new Date(promocion.fechainicio+"T00:00:00").getTime()/1000;
          var tt_fin=new Date(promocion.fechafin+"T00:00:00").getTime()/1000;
          var today=Date.parse(new Date().toString())/1000;          
          if(today>tt_inicio){
            promocion.estado="Expirado";
          }
          if(today<tt_inicio){
            promocion.estado="Proximamente";
          }
          if(today>=tt_inicio&&today<=tt_fin){
            promocion.estado="En progreso";
          }  
        })
      }
    )
    this.modalService.notificarUpload.subscribe(promocion=>{
      this.promociones= this.promociones.map(promocionOriginal=>{
        if(promocion.id==promocionOriginal.id){
          promocionOriginal.banner=promocion.banner;
        }
        return promocionOriginal;
      })
    });
  }
  delete(promocion: Promocion): void {
    this.promocionSErvice.delete(promocion.id).subscribe(
      response => {
        this.promociones = this.promociones.filter((cli) => cli !== promocion);
        this.router.navigate(['/promociones']);
        iziToast.show({
          title: 'success',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: `La promoción ${promocion.titulo} ha sido eliminado con éxito`,
        });

      });
  }

  abrirModal(promocion: Promocion) {
    this.promocionSeleccionada = promocion;
    this.modalService.abrirModal();
  }
}
