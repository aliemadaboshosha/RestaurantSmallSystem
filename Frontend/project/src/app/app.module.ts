import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';


import { RestaurantService } from './services/Restaurant.service';
import { MenuComponent } from './components/Restaurant/menu/menu.component';
import { EditeMenuComponent } from './components/Restaurant/edite-menu/edite-menu.component';
import { AddMenuComponent } from './components/Restaurant/add-menu/add-menu.component';
import { DeleteMenuComponent } from './components/Restaurant/delete-menu/delete-menu.component';
import { ProductsComponent } from './components/Restaurant/products/products.component';
import { OrderShowComponent } from './components/Restaurant/order-show/order-show.component';
import { OrderTableComponent } from './components/Restaurant/order-table/order-table.component';
import { OrderDetailsComponent } from './components/Restaurant/order-details/order-details.component';
import { OrderDeleteComponent } from './components/Restaurant/order-delete/order-delete.component';

@NgModule({
  declarations: [
 AppComponent,
   
    MenuComponent,
    EditeMenuComponent,
    AddMenuComponent,
    DeleteMenuComponent,
    ProductsComponent,
    OrderShowComponent,
    OrderTableComponent,
    OrderDetailsComponent,
    OrderDeleteComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
