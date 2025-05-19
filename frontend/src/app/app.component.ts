import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project';
  constructor(private router: Router){}
  ngOnInit(){
    if (localStorage.getItem("user")==null) {
      this.router.navigateByUrl("")
    }
  }
}
