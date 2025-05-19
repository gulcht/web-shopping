export interface User {
  user_id: number;
  name:        string;
  role:        number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toUser(json: string): User[] {
      return JSON.parse(json);
  }

  public static userToJson(value: User[]): string {
      return JSON.stringify(value);
  }
}
