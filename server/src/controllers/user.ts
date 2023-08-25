import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
const fs = require('fs');
import path from 'path';

import { upload } from '../middleware/uploadfile';
import { IUser, responseDataUser, responseUpdataUser } from '../types/user_type';
import User from '../models/user';
const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads'); // ถอยก่อนไปที่โฟลเดอร์ 

export const getImg = async (req: Request, res: Response): Promise<void> => {
  try {
    const imagePath = path.join(uploadDir, req.params.img); // สร้างเส้นทางสำหรับไฟล์ภาพ
    res.sendFile(imagePath); // ส่งไฟล์ภาพกลับไปยัง client
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error!');
  }
}

export const deleteImg = async (req: Request, res: Response): Promise<void> => {
  try {
    const username: string = req.params.username;
    const filter = { username: username };
    const user: IUser | null = await User.findOne({ username });
    let updatedata: { $set: any } = { $set: {} };
    if (user?.img) {

      const imagePath = path.join(uploadDir, user.img); // สร้างเส้นทางสำหรับไฟล์ภาพ

      // ตรวจสอบว่าไฟล์ภาพนี้มีอยู่จริงหรือไม่
      if (fs.existsSync(imagePath)) {
        // ลบไฟล์ภาพ
        fs.unlink(imagePath, async (err: any) => {
          if (err) {
            console.error('เกิดข้อผิดพลาดในการลบไฟล์:', err);
            res.status(201).send('เกิดข้อผิดพลาดในการลบไฟล์');
          } else {

            // อัปเดตฟิลด์ภาพของผู้ใช้ในฐานข้อมูล (หากคุณต้องการ)
            updatedata.$set.img = "";
            const result = await User.updateOne(filter, updatedata);
            if (result.modifiedCount === 1) {
              res.status(200).send('ลบไฟล์ภาพเรียบร้อยแล้ว');
            } else {
              res.status(200).send('ลบไฟล์ภาพไม่สำเร็จ');
            }
          }
        });
      } else {
        res.status(201).send('ไม่พบไฟล์ภาพที่ต้องการลบ');
      }
    } else {
      res.status(201).send('ไม่พบข้อมูลผู้ใช้หรือไม่มีภาพที่ต้องการลบ');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('เกิดข้อผิดพลาดบนเซิร์ฟเวอร์');
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.params.username;

    const user: IUser | null = await User.findOne({ username });
    if (user) {

      const payload: responseDataUser = {
        username: user.username,
        role: user.role,
        image: user.img,
      };

      res.status(200).json(payload);
      return;
    }

    // Handle case where user is not found
    res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error!');
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    upload(req, res, async (err): Promise<void> => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }

      const { username, newpassword, oldpassword }: responseUpdataUser = req.body;
      const user: IUser | null = await User.findOne({ username });
      const filter = { username: username };
      let updatedata: { $set: any } = { $set: {} };

      if (req.file) {
        const uploadedFilename: string = req.file.filename;
        updatedata.$set.img = uploadedFilename;
      }
      if (user) {
        if (newpassword && oldpassword) {
          try {
            const isMatchPass: boolean = await bcrypt.compare(oldpassword, user.password);
            if (isMatchPass) {
              const salt: string = await bcrypt.genSalt(10);
              const passwordNew: string = await bcrypt.hash(newpassword, salt);
              updatedata.$set.password = passwordNew;
            } else {
              res.status(201).send('Invalid old password');
            }
          } catch (error) {
            res.status(201).send('Server Error!');
          }
        }
      } else {
        res.status(201).send('User not found');
      }

      const result = await User.updateOne(filter, updatedata);

      if (result.modifiedCount === 1) {
        res.status(201).send('Document updated successfully');
      } else {
        res.status(201).send('Document not found or not updated');
      }

    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error!');
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.send('API Connect Success Get deleteUser');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error!');
  }
}