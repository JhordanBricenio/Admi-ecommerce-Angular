import { Cliente } from "./cliente";
import { Direccion } from "./direccion";
import { Dventa } from "./dventa";

export class Venta {
    id: number;
    nventa:string;
    subtotal: number;
    envio_titulo: string;
    envio_precio: number;
    transaccion: string;
    estado: string;
    nota: string;
    fecha: Date;
    direccion:Direccion
    dventas: Dventa[] = [];
    cliente: Cliente;
}
