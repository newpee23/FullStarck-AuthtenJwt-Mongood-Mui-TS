import express from "express";
import { loginUser, registerUser } from "../controllers/auth";
const router = express.Router(); //ใช้สร้างเส้นทาง

// post

// http://localhost:8080/api/registerUser
// Publish
router.post("/registerUser", registerUser);
// http://localhost:8080/api/loginUser
// Publish
router.post("/loginUser", loginUser);

// end post

export = router;
