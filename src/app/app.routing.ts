import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { CreateProductComponent } from "./components/productos/create-product/create-product.component";
import { IndexProductComponent } from "./components/productos/index-product/index-product.component";
import { ProductDetalleComponent } from "./components/productos/product-detalle/product-detalle.component";
import { InventarioProductComponent } from "./components/productos/inventario-product/inventario-product.component";
import { CategoriasComponent } from "./components/categorias/categorias.component";
import { FormComponent } from "./components/categorias/form.component";

const appRoute:Routes=[
    {path:'', redirectTo:'inicio', pathMatch:'full'},
    {path:'inicio', component:InicioComponent},
    {path:'clientes', component:IndexClienteComponent},
    {path:'clientes/page/:page', component:IndexClienteComponent},
    {path:'clientes/registro', component:CreateClienteComponent},
    {path:'clientes/registro/:id', component:CreateClienteComponent},

    {path:'productos', component:IndexProductComponent},
    {path:'productos/registro', component:CreateProductComponent},
    {path:'productos/registro/:id', component:CreateProductComponent},
    {path:'productos/page/:page', component:IndexProductComponent},
    {path:'productos/inventario/:id', component:InventarioProductComponent},

    {path:'categorias', component:CategoriasComponent},
    {path:'categorias/registro', component:FormComponent},
    {path:'categorias/registro/:id', component:FormComponent},


   /* {path:'panel', children:[
        {path:'clientes/page/:page', component:IndexClienteComponent},
        {path:'clientes/registro', component:CreateClienteComponent, canActivate:[]},

        {path:'productos', component:IndexProductComponent, canActivate:[]},
        {path:'productos/registro', component:CreateProductComponent, canActivate:[]},
        {path:'productos/page/:page', component:IndexClienteComponent},
       
    ]},*/

    {path:'login', component:LoginComponent}


]
export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders<any>= RouterModule.forRoot(appRoute);