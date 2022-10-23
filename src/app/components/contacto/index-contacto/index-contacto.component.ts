import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/models/contacto';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;
declare var $:any;


@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.css']
})
export class IndexContactoComponent implements OnInit {

  contactos:Contacto[]= [];
  public load_btn=false;

  constructor(private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.init_data();
    
  }

  init_data(){
    this.clienteService.getContactos().subscribe(
      data => {
        //Cortar los nombres de los clientes

        data.forEach((contacto) => {
          contacto.nombres = contacto.nombres.split(" ")[0];
        });

        this.contactos = data;
      }
    )
  }
  //Actualizar el contacto
  cerrar(contacto:Contacto){
    this.load_btn=true;
    this.clienteService.updateContacto(contacto).subscribe(
      response=>{
        iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se cerró correctamente el mensaje.'
        });

        $('#estadoModal-'+contacto.id).modal('hide');
        $('.modal-backdrop').remove();

        this.init_data();
        this.load_btn=false;
        
      },
      error=>{
        console.log(error);
        
      }
    )
  }

}
