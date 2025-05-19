export interface Status {
  status_id: number;
  name: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toStatus(json: string): Status[] {
      return JSON.parse(json);
  }

  public static statusToJson(value: Status[]): string {
      return JSON.stringify(value);
  }
}
