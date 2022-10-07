import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  paginator:any;
  

  constructor(private clienteService:ClienteService,
    private activateRoute: ActivatedRoute
    ,private router:Router) { }

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

  delete(cliente: Cliente): void {
    this.clienteService.delete(cliente.id).subscribe(
      response => {
        this.clientes = this.clientes.filter((cli) => cli !== cliente);
        this.router.navigate(['/clientes']);
        iziToast.show({
          title: 'success',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: `El cliente ${cliente.nombres} ha sido eliminado con éxito`,
        });

      });
  }

}
