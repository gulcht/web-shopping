import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Convert as userCvt, User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  user: any;
  constructor(private http: HttpClient, private dataService: DataService, private router :Router){
  }

  login(email: string, password: string) {
    let jsonObj = {
      email: email,
      password: password,
    }
    let jsonString = JSON.stringify(jsonObj);
    // console.log(jsonString)
    this.http.post(this.dataService.apiEndpoint + "/login", jsonString, {observe: 'response'})
      .subscribe((response: any) => {
        let responseBody = response.body;
        // console.log(response)
        this.user = userCvt.toUser(JSON.stringify(responseBody));
        localStorage.setItem("user", JSON.stringify(this.user));

        if(this.user.role == 0){
          this.router.navigateByUrl('/admin/(adminoutlet:orders)');
        }
        else if (this.user.role == 1) {
          this.router.navigateByUrl('/home');
        }
    });
  }

  register(email : string, password: string, name: string){
    if (email != '' && password != ''&& name!='') {
      let jsonObj = {
        email: email,
        password: password,
        name: name,
      }
      let jsonString = JSON.stringify(jsonObj);
      this.http.post(this.dataService.apiEndpoint + "/register", jsonString,
      {observe: 'response'}).subscribe(response => {
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.body));
      });
      alert("ลงทะเบียนเสร็จสิ้น")
    }
    else{
      alert("โปรดกรอกข้อมูลให้ครบ")
    }

  }


  ngOnInit(){
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');

    registerLink?.addEventListener('click', ()=> {
      wrapper?.classList.add('active');
    });

    loginLink?.addEventListener('click', ()=> {
      wrapper?.classList.remove('active');
    });
  }
}
