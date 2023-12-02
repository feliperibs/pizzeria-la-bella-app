import { Moment } from "moment";

export interface IUser {
  name: string;
  cpf: string;
  address: {
    street: string;
    number: number;
    POST_CODE: string;
    city: string;
    state: string;
  };
  creation_date: Moment;
  email: string;
  password: string;
  is_admin: boolean;
}
