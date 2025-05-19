import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Convert as productCvt, Product } from 'src/app/models/product.model';
import { Convert as categoryCvt, Category } from 'src/app/models/category.model';
import { AddComponent } from '../add-product/add.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { MatListOption } from '@angular/material/list';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = Array<Product>();
  categories = Array<Category>();
  selectedProduct : any;

  constructor(private dataService: DataService, private http: HttpClient, private dialog: MatDialog, private router: Router){
    http.get(dataService.apiEndpoint + "/products").subscribe((data: any) => {
      this.products = productCvt.toProduct(JSON.stringify(data));
      console.log(this.products);
    });

    http.get(dataService.apiEndpoint + "/categories").subscribe((data: any) => {
      this.categories = categoryCvt.toCategory(JSON.stringify(data));
      console.log(this.categories);
    });

  }

  ngOnInit() {
    if (this.dataService.user === null) {
      this.router.navigateByUrl('/main/(mainoutlet:login)');
    }
  }

  findAllProduct(){
    this.http.get(this.dataService.apiEndpoint + "/products").subscribe(data => {
      this.products = productCvt.toProduct(JSON.stringify(data));
    })
  }

  show(product: Product){
    this.selectedProduct = product; //รับข้อมูลมาจาก Option html
    console.log(this.selectedProduct);
  }

  addProduct(){
    this.dataService.categories = this.categories;
    this.dialog.open(AddComponent, {
      minWidth: '400px',
    });
  }
  deleteProduct(id: number){
    if(confirm("ยืนยันการลบ")){
      this.http.delete(this.dataService.apiEndpoint + "/products/" + id).subscribe(res => {
        console.log(res)
      })
    }
  }
  editProduct(){
    this.dataService.selectedProduct = this.selectedProduct;
    this.dataService.categories = this.categories;
    this.dialog.open(EditProductComponent, {
      minWidth: '480px',
    });
  }

  findByCategory(name: string){
    this.http.get(this.dataService.apiEndpoint + "/products/category/"+ name).subscribe(data => {
      this.products = productCvt.toProduct(JSON.stringify(data));
      console.log(name)
    })
  }



}
