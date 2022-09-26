import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

declare var iziToast: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public categoria:Categoria= new Categoria();

  constructor(private categoriaService:CategoriaService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCategoria();
  }
  cargarCategoria():void{
    this.activateRoute.params.subscribe(params=>
      {
        let id=params['id']
        if(id){
          this.categoriaService.getCategoria(id).subscribe(
            categoria=>
            this.categoria= categoria
          );
        }
      });


  }
  create(){
    this.categoriaService.create(this.categoria).subscribe(
      (categoria) => {
        this.router.navigate(['/categorias']);
        iziToast.show({
          title: 'success',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: `La categoria ${this.categoria.nombre} ha sido creada con éxito`,
        });
      });

  }
  update(){
    this.categoriaService.updateCategoria(this.categoria).subscribe(
      (categoria) => {
        this.router.navigate(['/categorias']);
        iziToast.show({
          title: 'success',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: `La categoria ${categoria.nombre} ha sido actualizada con éxito`,
        });
      });
  }
}
