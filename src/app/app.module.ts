import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


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
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
