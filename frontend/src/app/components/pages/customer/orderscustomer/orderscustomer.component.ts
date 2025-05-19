import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Convert as orderCvt, Order } from 'src/app/models/order.model';
import { Convert as statusCvt, Status } from 'src/app/models/status.model';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { Convert as userCvt, User } from 'src/app/models/user'

@Component({
  selector: 'app-orderscustomer',
  templateUrl: './orderscustomer.component.html',
  styleUrls: ['./orderscustomer.component.scss']
})
export class OrderscustomerComponent{
  orders: Order[] = [];
  status: Status[] = [];
  selectedOrder: any;
  user : any;




  displayedColumns: string[] = ['order_id', 'name', 'address', 'phone', 'date', 'status'];
  dataSource!: MatTableDataSource<Order>;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private dataService: DataService, private http: HttpClient, private dialog: MatDialog) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      this.user = userCvt.toUser(JSON.stringify(userObj));
      console.log(this.user.user_id);

      this.http.get(this.dataService.apiEndpoint + '/order/' +this.user.user_id).subscribe((data: any) => {
        this.orders = orderCvt.toOrder(JSON.stringify(data));
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        console.log(data)
      });
    }

    this.http.get(this.dataService.apiEndpoint + '/status').subscribe((data: any) => {
      this.status = statusCvt.toStatus(JSON.stringify(data));
    });
  }

  detail(order:Order){
    this.selectedOrder = order; //รับข้อมูลมาจาก Option html
    this.dataService.selectedOrder = this.selectedOrder;
    console.log(this.dataService.selectedOrder);
    this.dialog.open(OrderDetailsComponent, {
      width: '480px',
      height: '640px'
    });
  }


}
