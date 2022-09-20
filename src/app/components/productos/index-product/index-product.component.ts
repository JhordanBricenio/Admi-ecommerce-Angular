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

  constructor(
    private productSevice: ProductoService,
    private activateRoute: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.productSevice
        .getProducts(page)
        .pipe(
          tap((response) => {
            (response.content as Product[]).forEach((product) => {
              console.log(product.titulo);
            });
          })
        )
        .subscribe((response) => {
          this.productos = response.content as Product[];
          this.pagination = response;
        });
    });
    this.modalService.notificarUpload.subscribe((producto) => {
      this.productos = this.productos.map((productoOriginal) => {
        if (producto.id == productoOriginal.id) {
          productoOriginal.imagen = producto.imagen;
        }
        return productoOriginal;
      });
    });
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
        title: 'Está seguro?',
        text: `Seguro que desea eliminar al Cliente! ${producto.titulo}`,
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
              'Cliente Eliminado!',
              `Cliente ${producto.titulo} Eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }
}
