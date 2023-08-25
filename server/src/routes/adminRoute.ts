import express from 'express';
const router = express.Router(); //ใช้สร้างเส้นทาง
// middleware

import { getUserAll, updateStatusUser } from '../controllers/admin';
import { checkRequestToken } from '../middleware/requestData_mw';
// checkToken เช็คว่ามี token มั้ย

// get 

// http://localhost:8080/api/getUserAll
// Publish
router.get('/getUserAll/', checkRequestToken, getUserAll)

// end get

// http://localhost:8080/api/updateStatusUser
// Publish
router.put('/updateStatusUser', checkRequestToken, updateStatusUser)

// end put

export = router;