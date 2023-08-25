
import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    role: string;
    img: string|undefined;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type responseUserLogin = {
    _id: string;
    username: string;
    role: string;
}

export type responseUpdataUser = {
    username: string;
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
    image: File | undefined;
}

export type responseDataUser = {
    username: string; 
    role: string; 
    image: string | undefined;
}

export type responseDataUserAll = {
    username: string;
    role: string;
    img: string|undefined;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type responseStatusUser = {
    _id: string;
    username: string;
    status: boolean;
}