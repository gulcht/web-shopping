import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { DataService } from 'src/app/services/data.service';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  categories: Array<Category>;
  selectedProduct: Product;

  constructor(private dialogRef: MatDialogRef<AddCategoryComponent>,
    private http: HttpClient, private dataService: DataService){
    this.categories = dataService.categories;
    this.selectedProduct = dataService.selectedProduct;
    console.log()
  }

  close(){
    this.dialogRef.close();
  }

  save(name : string, price: number, image: string, category_id: number){
    let jsonObj = {
      name : name,
      price: price,
      image: image,
      category_id: category_id
    }

    let jsonString = JSON.stringify(jsonObj);
    this.http.put(this.dataService.apiEndpoint + "/products/" +this.selectedProduct.product_id, jsonString,
    {observe: 'response'}).subscribe(response => {
      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));
      this.dialogRef.close();
    });
  }
}
