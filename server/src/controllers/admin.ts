import { Request, Response } from "express";
import User from "../models/user";
import { IUser, responseDataUserAll, responseStatusUser } from "../types/user_type";

export const getUserAll = async (req: Request, res: Response): Promise<void> => {
  try {
    // ในตัวอย่างนี้เราเลือกเฉพาะฟิลด์ name และ email
    const data: IUser[] = await User.find({}).select("_id username role status img createdAt updatedAt");
    if (data) {
      const result: responseDataUserAll[] = data;
      res.json(result); // ส่งข้อมูลกลับให้กับเครื่องลูกค้าในรูปแบบ JSON
      return;
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
};

export const updateStatusUser = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const {_id , username , status}:responseStatusUser = req.body;
    const data: { $set: {status : boolean} } = { $set: {status: status} };
    const filter = { _id:_id , username: username };

    const result = await User.updateOne(filter, data);

    if (result.modifiedCount === 1) {
      res.status(201).send('Document updated successfully');
    } else {
      res.status(201).send('Document not found or not updated');
    }

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
}
