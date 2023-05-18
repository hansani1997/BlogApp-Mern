import express from "express";
import { getAllUsers, signup,loginUser } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/",getAllUsers);
userRouter.post("/signup",signup);
userRouter.post("/login",loginUser)
export default userRouter;