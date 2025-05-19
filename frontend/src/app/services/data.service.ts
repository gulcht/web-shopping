import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiEndpoint = 'http://localhost:80/API_Project';
  categories: any;
  selectedProduct: any;
  selectedStatus: any;
  selectedOrder: any;
  user: any;
  constructor() { }
}
