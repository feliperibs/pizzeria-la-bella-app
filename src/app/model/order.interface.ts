import { Moment } from "moment";
import { IPizza } from "./pizza-interface";
import { IUser } from "./user.interface";

export interface IOrderRequest {
  userId: string;
  pizzasIds: string[];
}

export interface IOrder {
  _id: string;
  userId: string;
  pizzas: IPizza[];
  orderDate: Moment;
  orderPrice: number;
}


export interface IAllOrders {
  _id: string;
  user: IUser;
  pizzas: IPizza[];
  orderDate: Moment;
  orderPrice: number;
}
