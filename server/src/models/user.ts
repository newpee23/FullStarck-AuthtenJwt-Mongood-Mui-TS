import mongoose from 'mongoose';
import { IUser } from '../types/user_type';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    password:{
        type: String,
    },
    role:{
        type: String,
        default: 'user'
    },
    img:{
        type: String,
        default: ''
    },
    status:{
        type: Boolean,
        default: false
    }
},{timestamps:true});

export default mongoose.model<IUser>('User', UserSchema);