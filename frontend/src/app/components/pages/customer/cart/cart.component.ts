import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as userCvt, User } from 'src/app/models/user'
import { Convert as orderDetailsCvt, OrderDetails } from 'src/app/models/orderdetails.model';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cart = Array<OrderDetails>();
  user : any;
  // total = Array<OrderDetails>();
  totalprice: number =0;

  constructor(private dataService: DataService, private http: HttpClient, private router: Router) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      this.user = userCvt.toUser(JSON.stringify(userObj));
      console.log(this.user.user_id);

      http.get(dataService.apiEndpoint + "/cart/" + this.user.user_id).subscribe((data: any) => {
        this.cart = orderDetailsCvt.toOrderDetails(JSON.stringify(data));
        console.log(this.cart);

        for (let i=0; i < this.cart.length ; i++) {
          this.totalprice = this.totalprice+this.cart[i].price;
          console.log(this.totalprice)
        }
      });
    }
  }

  deleteItem(product_id: number){
    console.log(product_id)
    if(confirm("ยืนยันการลบ")){
      this.http.delete(this.dataService.apiEndpoint + "/cart/delete/" + this.user.user_id +"/" +product_id).subscribe(res => {
        console.log(res)
        location.reload();
      })
    }
  }

  stepUp(amount:number, product_id: number, user_id: number){
    if(amount < 10){
      let jsonObj = {
        amount: amount,
        product_id : product_id,
        user_id: user_id,
      }

      let jsonString = JSON.stringify(jsonObj);
      this.http.put(this.dataService.apiEndpoint + "/cart/stepUp", jsonString,
      {observe: 'response'}).subscribe(response => {
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.body));
        window.location.reload();
      });
    }
  }


  stepDown(amount:number, product_id: number, user_id: number){
    if(amount > 1){
      let jsonObj = {
        amount: amount,
        product_id : product_id,
        user_id: user_id,
      }

      let jsonString = JSON.stringify(jsonObj);
      this.http.put(this.dataService.apiEndpoint + "/cart/stepDown", jsonString,
      {observe: 'response'}).subscribe(response => {
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.body));
        window.location.reload();
      });

    }
}

  buy(name: string, address: string, phone :string, amount: number) {
    if(amount > 0 && name != '' && address != '' && phone !=''){
      let jsonObj = {
        name: name,
        address: address,
        phone: phone,
        user_id: this.user.user_id
      }
      console.log(jsonObj)
      let jsonString = JSON.stringify(jsonObj);
      this.http.post(this.dataService.apiEndpoint + "/customer/buy", jsonString,
      {observe: 'response'}).subscribe(response => {
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.body));
      });
      window.location.reload();
    }
    else if (name == '' || address == '' || phone =='') {
      alert("โปรดกรอกข้อมูลการจัดส่ง")
    }
    else if(amount <= 0){
      alert("ไม่มีสินค้าในตะกร้า")
    }

  }


  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}


