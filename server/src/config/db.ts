import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        
        const mongodbUri = "mongodb://localhost:27017/db_login";

        if (!mongodbUri) {
            throw new Error("MONGODB_URI is not defined in the environment variables.");
        }
       
        await mongoose.connect(mongodbUri);
        console.log('Connect DB Success');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
