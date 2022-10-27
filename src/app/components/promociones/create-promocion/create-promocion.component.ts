import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Promocion } from 'src/app/models/promocion';
import { PromocionService } from 'src/app/services/promocion.service';
import Swal from 'sweetalert2';

declare var iziToast: any;

@Component({
  selector: 'app-create-promocion',
  templateUrl: './create-promocion.component.html',
  styleUrls: ['./create-promocion.component.css']
})
export class CreatePromocionComponent implements OnInit {

  public promocion: Promocion = new Promocion();
  public errors: string[];

  constructor(private promocionService: PromocionService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPromocion();
  }
  cargarPromocion(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.promocionService.getPromocion(id).subscribe(
          response => this.promocion = response
        )
      }
    });

  }
  create() {
    if (this.promocion.descuento >= 1 && this.promocion.descuento <= 100) {
      this.promocionService.create(this.promocion).subscribe(
        (categoria) => {
          this.router.navigate(['/promociones']);
          iziToast.show({
            title: 'OK',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topRight',
            message: `La promoción ${this.promocion.titulo} ha sido creada con éxito`,
          });
        });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha podido crear la promoción',
        footer: 'El descuento debe ser un valor entre 1 y 100'
      })
    }
  }
  update() {
    if (this.promocion.descuento >= 1 && this.promocion.descuento <= 100) {
      this.promocionService.updatePromocion(this.promocion)
        .subscribe(
          json => {
            this.router.navigate(['/promociones']);
            Swal.fire('Promoción Actualizada', `${json.titulo} `, 'success');
          },
          err => {
            this.errors = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error(err.error.errors);
          })
    }
    else {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: `El descuento debe ser un valor entre 1 y 100`,
      });
    }
  }


}
