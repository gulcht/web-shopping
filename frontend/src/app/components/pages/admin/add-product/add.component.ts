import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../../models/category.model';
import { DataService } from '../../../../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  categories: Array<Category>;
  constructor(private data: DataService, private dialogRef: MatDialogRef<AddComponent>,
    private http: HttpClient, private dataService: DataService){
    this.categories = data.categories;
  }

  close(){
    this.dialogRef.close();
  }

  addProduct(name : string, price: number, image: string, category_id: number){
    let jsonObj = {
      name : name,
      price: price,
      image: image,
      category_id: category_id
    }

    let jsonString = JSON.stringify(jsonObj);
    this.http.post(this.dataService.apiEndpoint + "/admin/add/product", jsonString,
    {observe: 'response'}).subscribe(response => {
      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));
      this.dialogRef.close();
    });
  }
}
