import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { tap } from 'rxjs';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css'],
})
export class IndexProductComponent implements OnInit {
  public productos: Product[] = [];

  public pagination: any;
  productoSeleccionado: Product;
  public filtro: string;

  constructor(
    private productSevice: ProductoService,
    private activateRoute: ActivatedRoute,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    if (this.filtro == null) {
      this.activateRoute.paramMap.subscribe((params) => {
        let page: number = +params.get('page');
        if (!page) {
          page = 0;
        }
        this.productSevice.geProductsBySearch(page).subscribe((response) => {
          this.productos = response.content as Product[];
          this.pagination = response;
        });
      });
    }

    this.modalService.notificarUpload.subscribe((producto) => {
      this.productos = this.productos.map((productoOriginal) => {
        if (producto.id == productoOriginal.id) {
          productoOriginal.imagen = producto.imagen;
        }
        return productoOriginal;
      });
    });
  }
  filtrar() {
    if (this.filtro != null) {
      console.log(this.filtro);
      
      this.productSevice.geProductsBySearch(0,this.filtro).subscribe((response) => {
        this.productos = response.products as Product[];        
      }
      );
      
    }
  }
  reset(){
    this.filtro = null;
    this.ngOnInit();
  }

  abrirModal(producto: Product) {
    this.productoSeleccionado = producto;
    this.modalService.abrirModal();
  }

  delete(producto: Product): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Est?? seguro?',
        text: `Seguro que desea eliminar al Producto! ${producto.titulo}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.productSevice.delete(producto.id).subscribe((response) => {
            this.productos = this.productos.filter((cli) => cli !== producto);
            swalWithBootstrapButtons.fire(
              'Producto Eliminado!',
              `Producto ${producto.titulo} Eliminado con ??xito.`,
              'success'
            );
          });
        }
      });
  }
}
