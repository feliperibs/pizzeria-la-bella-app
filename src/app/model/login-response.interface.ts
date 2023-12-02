import { Moment } from "moment";
import { IUser } from "./user.inteface";

export interface ILoginResponse {
  token: string;
  user: IUser;
}
