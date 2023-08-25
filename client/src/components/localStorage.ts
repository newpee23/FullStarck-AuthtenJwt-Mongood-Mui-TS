import { localStorageType } from "../types/authType";

// Set expiration time in milliseconds (6 hours)
const expirationTime = 6 * 60 * 60 * 1000;

// localStorageUserLogin
export const storageUser: localStorageType = {_id: null, username: null , role: null};
export const setLocalUser = (data: localStorageType): void => {
    localStorage.setItem('user', JSON.stringify(data));

    setTimeout(() => {
        setLocalUser({_id: null, username: null , role: null});
    }, expirationTime);
};

// localStorageTokenUser
export const storageTokenUser: string = '';
export const setLocalTokenUser = (data: string): void => {
    localStorage.setItem('tokenAuth', data);

    setTimeout(() => {
        setLocalTokenUser('');
    }, expirationTime);
};






