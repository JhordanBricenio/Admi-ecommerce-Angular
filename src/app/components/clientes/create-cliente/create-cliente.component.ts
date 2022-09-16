import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

declare var iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public errors: string[];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  create() {
    this.clienteService.create(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(['/clientes']);
        iziToast.show({
          title: 'success',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: `El cliente ${this.cliente.nombres} ha sido creado con éxito`,
        });
      },
      (err) => {
        this.errors = err.error.errors as string[];
        console.log('Codigo del error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    );

  }

}
