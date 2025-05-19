import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/pages/admin/admin/admin.component';
import { CategoriesComponent } from './components/pages/admin/categories/categories.component';
import { OrdersComponent } from './components/pages/admin/orders/orders.component';
import { ProductsComponent } from './components/pages/admin/products/products.component';
import { CartComponent } from './components/pages/customer/cart/cart.component';
import { HomeComponent } from './components/pages/customer/home/home.component';
import { OrderscustomerComponent } from './components/pages/customer/orderscustomer/orderscustomer.component';
import { MainComponent } from './components/pages/main/main.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, children:[
    {path: 'categories', component: CategoriesComponent, outlet: 'adminoutlet'},
    {path: 'orders', component: OrdersComponent, outlet: 'adminoutlet'},
    {path: 'products', component: ProductsComponent, outlet: 'adminoutlet'}
  ]},
  {path: '', component: MainComponent},
  {path: 'home', component: HomeComponent},
  {path:'cart',component:CartComponent},
  {path:'order',component:OrderscustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
