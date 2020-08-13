export class User {
  id: number;
  username: string;
  password?: string;
  email?: string;
  // tslint:disable-next-line: variable-name
  first_name?: string;
  // tslint:disable-next-line: variable-name
  last_name?: string;
  // tslint:disable-next-line: variable-name
  is_staff?: boolean;
  // tslint:disable-next-line: variable-name
  is_active?: boolean;
}
