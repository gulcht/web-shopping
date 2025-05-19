// To parse this data:
//
//   import { Convert } from "./file";
//
//   const products = Convert.toProducts(json);

export interface Product {
  product_id:  number;
  name:        null | string;
  image:       null | string;
  price:       number | null;
  category: string;
  amount:number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toProduct(json: string): Product[] {
      return JSON.parse(json);
  }

  public static productToJson(value: Product[]): string {
      return JSON.stringify(value);
  }
}
