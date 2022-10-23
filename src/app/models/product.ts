import { Categoria } from "./categoria";
import { Galeria } from "./galeria";
import { Marca } from "./marca";
import { Variedad } from "./variedad";

export class Product {
    id:number;
    slug:string;
    titulo:string;
    precio:number;
    descripcion:string;
    contenido:string;
    stock:number;
    nventas:number;
    npuntos:number;
    estado:string;
    create_at:Date;
    imagen:string;
    categoria:Categoria;
    variedades: Variedad[] = [];
    galeria: Galeria[] = [];
    titulo_variedad:string;
    marca:Marca;
}
