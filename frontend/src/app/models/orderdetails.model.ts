export interface OrderDetails {
  product_id: number;
  order_id: number;
  amount: number;
  name: string;
  user_id: number;
  image: string;
  price: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toOrderDetails(json: string): OrderDetails[] {
      return JSON.parse(json);
  }

  public static orderDetailsToJson(value: OrderDetails[]): string {
      return JSON.stringify(value);
  }
}
