import  express, { Router }  from "express";
import {  registerUser } from "../Controllers/RegisterUserController.js";

const router = express.Router()


router.post('/register', registerUser)

export default router