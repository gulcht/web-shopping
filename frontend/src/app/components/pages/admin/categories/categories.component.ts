import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Convert as categoryCvt, Category } from 'src/app/models/category.model';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories = Array<Category>();

  constructor(private dataService: DataService, private http: HttpClient, private dialog: MatDialog, private router: Router){
    http.get(dataService.apiEndpoint + "/categories").subscribe((data: any) => {
      this.categories = categoryCvt.toCategory(JSON.stringify(data));
      console.log(this.categories);
    });
  }

  addCategory(){
    this.dataService.categories = this.categories;
    this.dialog.open(AddCategoryComponent, {
      minWidth: '400px',
    });
  }

    deleteCategory(id: number){
    if(confirm("ยืนยันการลบ")){
      this.http.delete(this.dataService.apiEndpoint + "/category/" + id).subscribe(res => {
        console.log(res)
      })
    }
  }

  ngOnInit() {
    if (this.dataService.user === null) {
      this.router.navigateByUrl('/main/(mainoutlet:login)');
    }
  }
}
