import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ModalService } from 'src/app/services/modal.service';

declare var iziToast: any;

@Component({
  selector: 'true-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];

  categoriaSeleccionada: Categoria;

  constructor(private categoriaService: CategoriaService,
    private modalService:ModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      response => {
        this.categorias = response;
      }
    );
    this.modalService.notificarUpload.subscribe(categoria=>{
      this.categorias= this.categorias.map(categoriaOriginal=>{
        if(categoria.id==categoriaOriginal.id){
          categoriaOriginal.foto=categoria.foto;
        }
        return categoriaOriginal;

      })
    });
  }

  abrirModal(categoria: Categoria) {
    this.categoriaSeleccionada = categoria;
    this.modalService.abrirModal();
  }



  delete(categoria: Categoria): void {
    this.categoriaService.delete(categoria.id).subscribe(
      response => {
        this.categorias = this.categorias.filter((cli) => cli !== categoria);
        this.router.navigate(['/categorias']);
        iziToast.show({
          title: 'success',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: `La categoria ${categoria.nombre} ha sido eliminada con éxito`,
        });

      });
  }

}
