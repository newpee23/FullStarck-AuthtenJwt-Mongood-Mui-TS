import { Request, Response } from 'express';
import { UserLogin, UserRegister } from '../types/auth_type';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';
import { IUser } from '../types/user_type';
import User from '../models/user';

export const registerUser = async (req: Request<UserRegister>, res: Response<string>): Promise<void> => {
    try {
        const { username, password }: UserRegister = req.body;

        const user: IUser | null = await User.findOne({ username });

        if (user) {
            res.status(200).send("User Already exists");
            return;
        }

        // Encrypt
        const salt: string = await bcrypt.genSalt(10);
        const newUser: IUser = new User({
            username,
            password: await bcrypt.hash(password, salt)
        });

        await newUser.save();

        res.status(200).send("Register Success");
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

export const loginUser = async (req: Request<UserRegister>, res: Response<UserLogin>): Promise<void> => {

    // DataPayload
    let payload : UserLogin = { user: null ,token: undefined ,message: '' };

    try {

        const { username, password }: UserRegister = req.body;
        // Check User
        const user: IUser | null = await User.findOne({ username, status: true });

            // status = true
            if(user && user.status){

                // Check Password
                const IsMatchPass = await bcrypt.compare(password,user.password);
                if(!IsMatchPass){
                    payload.message = 'Password Invalid!!';
                    res.status(200).json(payload);
                    return;
                }

                // set DataPayload
                payload = { user: {_id: user._id, username: user.username, role: user.role } ,token: undefined ,message: 'Login Success!!' };

                // Generate Token
                jwt.sign(payload, 'jwtSecret', { expiresIn: '8H' }, (err: Error | null, token: string | undefined) => {
                    if (err) throw err;
                    payload.token = token; // เพิ่ม property token เข้าไปใน payload
                    payload.user = {_id: user._id, username: user.username, role: user.role };
                    res.status(200).json(payload);
                });           
                
            }else{
                // User Not Found
                payload.message = 'User Not Found!!';
                res.status(200).json(payload);
            }

     } catch (error) {

        console.log(error);
        payload.user = null;
        payload.message = 'Error Server!!';
        res.status(500).json(payload);

     }
}

