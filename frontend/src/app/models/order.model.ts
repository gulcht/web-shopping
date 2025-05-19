
export interface Order {
  order_id:  number;
  date:      string;
  status_id: number;
  name:      string;
  address:   string;
  phone:     string;
  status:    string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toOrder(json: string): Order[] {
      return JSON.parse(json);
  }

  public static orderToJson(value: Order[]): string {
      return JSON.stringify(value);
  }
}
