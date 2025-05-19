import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Convert as categoryCvt, Category } from 'src/app/models/category.model';
import { Convert as productCvt, Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Convert as userCvt, User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products=Array<Product>();
  categories=Array<Category>();
  user: any;

  constructor(private dataService:DataService, private http:HttpClient, private router: Router){
    this.user = localStorage.getItem('user');
    console.log(this.user)
    http.get(dataService.apiEndpoint+"/products").subscribe((data:any)=>{
      this.products=productCvt.toProduct(JSON.stringify(data));
      console.log(this.products);
    });

    http.get(dataService.apiEndpoint+"/categories").subscribe((data:any)=>{
      this.categories = categoryCvt.toCategory(JSON.stringify(data));
      console.log(this.categories);
    });
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      this.user = userCvt.toUser(JSON.stringify(userObj));
      console.log(this.user.user_id);
    }
  }


  findByName(name:string){
    this.http.get(this.dataService.apiEndpoint+"/products/name/"+name)
    .subscribe(data=>{
      this.products=productCvt.toProduct(JSON.stringify(data));
    });
  }

  findByCategory(name:string){
    this.http.get(this.dataService.apiEndpoint+"/products/category/"+name)
    .subscribe(data=>{
      this.products=productCvt.toProduct(JSON.stringify(data));
    });
  }

  findAll(){
    this.http.get(this.dataService.apiEndpoint+"/products")
    .subscribe(data=>{
      this.products=productCvt.toProduct(JSON.stringify(data));
    });
  }
  // stepUp(){
  //   this.amount = this.amount+1;
  //   if (this.amount >= 10) {
  //     this.amount = 10;
  //   }
  // }
  // stepDown(){
  //   this.amount = this.amount-1;
  //   if (this.amount <= 10) {
  //     this.amount = 1;
  //   }
  // }
  myalert() {
    alert("เพิ่มสินค้าลงในตะกร้าแล้ว")
  }
  addToCart(product_id: number, amount: number){
    let jsonObj = {
      product_id : product_id,
      amount: amount,
      user_id: this.user.user_id,
    }

    let jsonString = JSON.stringify(jsonObj);
    this.http.post(this.dataService.apiEndpoint + "/cart/add", jsonString,
    {observe: 'response'}).subscribe(response => {
      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));
    });
  }
}
