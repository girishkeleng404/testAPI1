import { Router } from "express";
import signup from "../controller/authController";

const router = Router();

router.route('/signup').post(signup);


export default router;