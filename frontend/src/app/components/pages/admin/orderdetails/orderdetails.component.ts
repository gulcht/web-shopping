import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Convert as statusCvt, Status } from 'src/app/models/status.model';
import { Convert as orderDetailsCvt, OrderDetails } from 'src/app/models/orderdetails.model';
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent {
  orderdetails = Array<OrderDetails>();
  selectedOrder: any;
  totalprice : number = 0;
  statuses = Array<Status>();

  constructor(private dialogRef: MatDialogRef<OrderdetailsComponent>,
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

    http.get(dataService.apiEndpoint + "/status").subscribe((data: any) => {
      this.statuses = statusCvt.toStatus(JSON.stringify(data));
      console.log(this.statuses);
    });


  }
  updateStatus(status: number, order_id: number){
    let jsonObj = {
      order_id : order_id,
      status: status,
    }
    let jsonString = JSON.stringify(jsonObj);
    this.http.put(this.dataService.apiEndpoint + "/status", jsonString,
    {observe: 'response'}).subscribe(response => {
      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));
      this.dialogRef.close();
      window.location.reload();
    });

  }

}
