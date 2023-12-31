import { Moment } from "moment";
import { IUser } from "./user.interface";

export interface ILoginResponse {
  token: string;
  user: IUser;
}
