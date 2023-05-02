import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MenuComponent } from './components/Restaurant/menu/menu.component';
import { AddMenuComponent } from './components/Restaurant/add-menu/add-menu.component';
import { EditeMenuComponent } from './components/Restaurant/edite-menu/edite-menu.component';
import { DeleteMenuComponent } from './components/Restaurant/delete-menu/delete-menu.component';
import { ProductsComponent } from './components/Restaurant/products/products.component';
import { OrderShowComponent } from './components/Restaurant/order-show/order-show.component';
import { OrderTableComponent } from './components/Restaurant/order-table/order-table.component';
import { OrderDetailsComponent } from './components/Restaurant/order-details/order-details.component';
import { OrderDeleteComponent } from './components/Restaurant/order-delete/order-delete.component';


const routes: Routes = [
  { path: '',
   component:MenuComponent },{
    path:'home',
    component:MenuComponent
   },
   
   
   {path:"addMenuItem",component:AddMenuComponent},
   {path:"editMenuItem/:id",component:EditeMenuComponent},
   {path:"deleteMenuItem/:id",component:DeleteMenuComponent},
   {path:"Products",component:ProductsComponent},
   {path:"Order/:id",component:OrderShowComponent},
   {path:"Orders",component:OrderTableComponent},
   {path:"orderDetails/:id",component:OrderDetailsComponent},
   {path:"DeleteOrder/:id",component:OrderDeleteComponent}


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
