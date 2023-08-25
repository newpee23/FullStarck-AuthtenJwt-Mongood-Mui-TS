export interface updataDataType {
    username: string;
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
    image: undefined | File;
}

export interface UserData  {
    username: string;
    role: string;
    image: null | string;
}

export interface UserDataAll  {
    _id: string;
    username: string;
    role: string;
    status: boolean | string;
    img: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export type updateDataType = {
    userData: UserData | null ;
    userDataAll: UserDataAll | [] ;
    message: string;
    loading: boolean;
    error: string;
}

export type responseStatusUser = {
    _id: string;
    username: string;
    status: boolean;
}

