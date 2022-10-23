import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { CreateProductComponent } from './components/productos/create-product/create-product.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { IndexProductComponent } from './components/productos/index-product/index-product.component';
import { ProductDetalleComponent } from './components/productos/product-detalle/product-detalle.component';
import { PaginattionComponent } from './components/productos/pagination/pagination.component';
import { InventarioProductComponent } from './components/productos/inventario-product/inventario-product.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { FormComponent } from './components/categorias/form.component';
import { CategoriaDetalleComponent } from './components/categorias/categoria-detalle/categoria-detalle.component';
import { IndexContactoComponent } from './components/contacto/index-contacto/index-contacto.component';
import { VariedadProductoComponent } from './components/productos/variedad-producto/variedad-producto.component';
import { GaleriaComponent } from './components/productos/galeria/galeria.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './components/cupones/index-cupon/index-cupon.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    CreateProductComponent,
    PaginationComponent,
    IndexProductComponent,
    ProductDetalleComponent,
    PaginationComponent,
    PaginattionComponent,
    InventarioProductComponent,
    CategoriasComponent,
    FormComponent,
    CategoriaDetalleComponent,
    IndexContactoComponent,
    VariedadProductoComponent,
    GaleriaComponent,
    CreateCuponComponent,
    IndexCuponComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CKEditorModule,
    HttpClientModule,

    routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
