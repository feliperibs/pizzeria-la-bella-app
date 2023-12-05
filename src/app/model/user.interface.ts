import { Moment } from "moment";

export interface IUser {
  _id: string;
  name: string;
  cpf: string;
  address: {
    street: string;
    number: number;
    postcode: string;
    city: string;
    state: string;
  };
  creation_date: Moment;
  email: string;
  password: string;
  is_admin: boolean;
}

export interface IUserRequest {
  name: string;
  cpf: string;
  address: {
    street: string;
    number: number;
    postcode: string;
    city: string;
    state: string;
  };
  email: string;
  password: string;
}
