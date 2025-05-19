import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/pages/admin/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './components/pages/customer/header/header.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ProductsComponent } from './components/pages/admin/products/products.component';
import { OrdersComponent } from './components/pages/admin/orders/orders.component';
import { AddComponent } from './components/pages/admin/add-product/add.component';
import { AddCategoryComponent } from './components/pages/admin/add-category/add-category.component';
import { CategoriesComponent } from './components/pages/admin/categories/categories.component';
import { EditProductComponent } from './components/pages/admin/edit-product/edit-product.component';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MainComponent } from './components/pages/main/main.component';
import { OrderdetailsComponent } from './components/pages/admin/orderdetails/orderdetails.component';
import { CartComponent } from './components/pages/customer/cart/cart.component';
import { OrderscustomerComponent } from './components/pages/customer/orderscustomer/orderscustomer.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HomeComponent } from './components/pages/customer/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderDetailsComponent } from './components/pages/customer/order-details/order-details.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    ProductsComponent,
    OrdersComponent,
    AddComponent,
    AddCategoryComponent,
    CategoriesComponent,
    EditProductComponent,
    MainComponent,
    OrderdetailsComponent,
    CartComponent,
    OrderscustomerComponent,
    HomeComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    FontAwesomeModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
