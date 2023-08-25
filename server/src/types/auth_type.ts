import { ObjectId } from "mongoose";
import { responseUserLogin } from "./user_type";

export interface UserRegister {
    username: string;
    password: string;
}

export interface UserLogin {
    user : responseUserLogin | null;
    token: string | undefined;
    message : string;
}

export interface UserToken extends UserRegister {
    id: string;
}