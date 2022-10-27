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
import { CategoriaDetalleComponent } from "./components/categorias/categoria-detalle/categoria-detalle.component";
import { IndexContactoComponent } from "./components/contacto/index-contacto/index-contacto.component";
import { VariedadProductoComponent } from "./components/productos/variedad-producto/variedad-producto.component";
import { GaleriaComponent } from "./components/productos/galeria/galeria.component";
import { CreateCuponComponent } from "./components/cupones/create-cupon/create-cupon.component";
import { IndexCuponComponent } from "./components/cupones/index-cupon/index-cupon.component";
import { IndexPromocionComponent } from "./components/promociones/index-promocion/index-promocion.component";
import { CreatePromocionComponent } from "./components/promociones/create-promocion/create-promocion.component";
import { IndexVentasComponent } from "./components/ventas/index-ventas/index-ventas.component";
import { DetalleVentasComponent } from "./components/ventas/detalle-ventas/detalle-ventas.component";

const appRoute:Routes=[
    {path:'', redirectTo:'inicio', pathMatch:'full'},
    {path:'inicio', component:InicioComponent},
    {path:'login', component:LoginComponent},
    {path:'clientes', component:IndexClienteComponent},
    {path:'clientes/page/:page', component:IndexClienteComponent},
    {path:'clientes/registro', component:CreateClienteComponent},
    {path:'clientes/registro/:id', component:CreateClienteComponent},

    {path:'productos', component:IndexProductComponent},
    {path:'productos/registro', component:CreateProductComponent},
    {path:'productos/registro/:id', component:CreateProductComponent},
    {path:'productos/page/:page', component:IndexProductComponent},
    {path:'productos/inventario/:id', component:InventarioProductComponent},
    {path:'productos/variedad/:id', component:VariedadProductoComponent},
    {path:'productos/galeria/:id', component:GaleriaComponent},
    
    {path:'cupones', component:IndexCuponComponent},
    {path:'cupones/registro', component:CreateCuponComponent},
    {path:'cupones/registro/:id', component:CreateCuponComponent},

    {path:'categorias', component:CategoriasComponent},
    {path:'categorias/registro', component:FormComponent},
    {path:'categorias/registro/:id', component:FormComponent},

    {path:'promociones', component:IndexPromocionComponent},
    {path:'promociones/registro', component:CreatePromocionComponent},
    {path:'promociones/registro/:id', component:CreatePromocionComponent},

    {path:'ventas', component:IndexVentasComponent},
    {path:'ventas/detalle/:id', component:DetalleVentasComponent},



    {path:'contacto', component:IndexContactoComponent},



   /* {path:'panel', children:[
        {path:'clientes/page/:page', component:IndexClienteComponent},
        {path:'clientes/registro', component:CreateClienteComponent, canActivate:[]},

        {path:'productos', component:IndexProductComponent, canActivate:[]},
        {path:'productos/registro', component:CreateProductComponent, canActivate:[]},
        {path:'productos/page/:page', component:IndexClienteComponent},
       
    ]},*/

]
export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders<any>= RouterModule.forRoot(appRoute);