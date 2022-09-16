import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  paginator:any;
  

  constructor(private clienteService:ClienteService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService
        .getClientes(page)
        .pipe(
          tap((response) => {
            (response.content as Cliente[]).forEach((cliente) => {
              //console.log(cliente.name);
            });
          })
        )
        .subscribe(
          response => {
            this.clientes = response.content as Cliente[];
            this.paginator=response;
          }
        );
    });
  }

}
