import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../../models/category.model';
import { DataService } from '../../../../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  constructor(private dialogRef: MatDialogRef<AddCategoryComponent>,private http: HttpClient, private dataService: DataService){
  }

  close(){
    this.dialogRef.close();
  }

  addCategory(name : string){
    let jsonObj = {
      name : name
    }

    let jsonString = JSON.stringify(jsonObj);
    this.http.post(this.dataService.apiEndpoint + "/admin/add/category", jsonString,
    {observe: 'response'}).subscribe(response => {
      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));
      this.dialogRef.close();
    });
  }
}
