import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { tap } from 'rxjs';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css']
})
export class IndexProductComponent implements OnInit {

  public productos:Product[]=[];

  public paginator:any;

  constructor(private productSevice:ProductoService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      let page: 0;
      if (!page) {
        page = 0;
      }
      this.productSevice
        .getClientes(page)
        .pipe(
          tap((response) => {
            (response.content as Product[]).forEach((product) => {
              //console.log(cliente.name);
            });
          })
        )
        .subscribe(
          response => {
            this.productos = response.content as Product[];
            this.paginator=response;
          }
        );
    });
  }

  }


