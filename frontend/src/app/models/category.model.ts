export interface Category {
  category_id: number;
  name:        string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCategory(json: string): Category[] {
      return JSON.parse(json);
  }

  public static categoryToJson(value: Category[]): string {
      return JSON.stringify(value);
  }
}
