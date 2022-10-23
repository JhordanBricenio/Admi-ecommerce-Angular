import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { Cupon } from 'src/app/models/cupon';
import { CuponService } from 'src/app/services/cupon.service';
import Swal from 'sweetalert2';

declare var iziToast: any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {

  public cupon: Cupon = new Cupon();
  public errors: string[];

  constructor(private cuponService:CuponService, private router:Router, private activateRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.cargarCupon();
  }
  cargarCupon(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.cuponService.getCupon(id).subscribe(
          response => this.cupon = response
          )}
    });

  }
  create(){
    this.cuponService.create(this.cupon).subscribe(
      (categoria) => {
        this.router.navigate(['/cupones']);
        iziToast.show({
          title: 'success',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: `El cupón ${this.cupon.codigo} ha sido creado con éxito`,
        });
      });

  }
  update(){
    this.cuponService.updateCategoria(this.cupon)
      .subscribe(
        json => {
          this.router.navigate(['/cupones']);
          Swal.fire('Cupon Actualizado', `${json.codigo} `, 'success');
        },
        err => {
          this.errors = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        })
  }



}
