import express from 'express';
const router = express.Router(); //ใช้สร้างเส้นทาง
// middleware

import { deleteImg, deleteUser, getImg, getUser, updateUser } from '../controllers/user';
import { checkRequestToken } from '../middleware/requestData_mw';
// checkToken เช็คว่ามี token มั้ย


// get 

// http://localhost:8080/api/getUser/:username
// Publish
router.get('/getUser/:username', checkRequestToken, getUser)
// http://localhost:8080/api/getimg/:img
// Publish
router.get('/getimg/:img', getImg)
// http://localhost:8080/api/deleteimg/:username
// Publish
router.get('/deleteimg/:username', checkRequestToken, deleteImg)
// end get

// put

// http://localhost:8080/api/updateDataUser
// Publish
router.put('/updateDataUser', checkRequestToken, updateUser)

// end put

// delete

// http://localhost:8080/api/deleteUser
// Publish
router.delete('/deleteUser', checkRequestToken, deleteUser)

// end delete

export = router;