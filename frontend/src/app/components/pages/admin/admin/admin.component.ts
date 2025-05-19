import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Convert as userCvt, User } from 'src/app/models/user'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  user : any;
  constructor(private dataService: DataService, private http: HttpClient, private router: Router){}
  logOut(){
    localStorage.removeItem("user");
  }
  ngOnInit(){
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      this.user = userCvt.toUser(JSON.stringify(userObj));
      if(this.user.role == 1){
        this.router.navigateByUrl("/home")
      }
    }

    if (localStorage.getItem("user")==null) {
      this.router.navigateByUrl("")
    }
  }
}
