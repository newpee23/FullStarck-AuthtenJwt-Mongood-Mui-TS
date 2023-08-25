import express, { Request, Response } from 'express';
const router = express.Router(); //ใช้สร้างเส้นทาง

// http://localhost:8080/api/
// GET
// Publish
router.get('/',(_, res: Response<string>) => {
    res.send('API Connect Success' as string);
})


export = router;