import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Convert as orderCvt, Order } from 'src/app/models/order.model';
import { Convert as statusCvt, Status } from 'src/app/models/status.model';
import { MatDialog } from '@angular/material/dialog';
import { OrderdetailsComponent } from '../orderdetails/orderdetails.component';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders: Order[] = [];
  status: Status[] = [];
  selectedOrder: any;

  displayedColumns: string[] = ['order_id', 'name', 'address', 'phone', 'date', 'status'];
  dataSource!: MatTableDataSource<Order>;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private dataService: DataService, private http: HttpClient, private dialog: MatDialog) {
    this.http.get(this.dataService.apiEndpoint + '/orders').subscribe((data: any) => {
      console.log(data);
      this.orders = orderCvt.toOrder(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      console.log(this.orders)
    });

    this.http.get(this.dataService.apiEndpoint + '/status').subscribe((data: any) => {
      this.status = statusCvt.toStatus(JSON.stringify(data));
    });
  }

  detail(order:Order){
    this.selectedOrder = order; //รับข้อมูลมาจาก Option html
    this.dataService.selectedOrder = this.selectedOrder;
    console.log(this.dataService.selectedOrder);
    this.dialog.open(OrderdetailsComponent, {
      width: '480px',
      height: '640px'
    });
  }


}
