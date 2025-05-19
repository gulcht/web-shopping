import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Convert as orderDetailsCvt, OrderDetails } from 'src/app/models/orderdetails.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent{
  orderdetails = Array<OrderDetails>();
  selectedOrder: any;
  totalprice : number = 0;
  constructor(private dialogRef: MatDialogRef<OrderDetailsComponent>,
    private http: HttpClient, private dataService: DataService){
    this.selectedOrder = dataService.selectedOrder;


    console.log(this.selectedOrder.order_id)
    http.get(dataService.apiEndpoint + "/orderdetails/"+this.selectedOrder.order_id).subscribe((data: any) => {
      this.orderdetails = orderDetailsCvt.toOrderDetails(JSON.stringify(data));
      console.log(this.orderdetails);

      for (let i=0; i < this.orderdetails.length ; i++) {
        this.totalprice = this.totalprice+this.orderdetails[i].price;
        console.log(this.totalprice)
      }
    });

  }





}
