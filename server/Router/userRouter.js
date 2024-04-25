import { Router } from "express";
import { getUserDetails, login, logout, signup } from "../Controller/userController.js";
import { isLoggedIn } from "../Middleware/authMiddleware.js";

const userRouter = Router();

userRouter.route('/signup')
    .post(signup);
userRouter.route('/login')
    .post(login);
userRouter.route('/logout')
    .post(logout);
userRouter.route('/me')
    .get(isLoggedIn ,getUserDetails);
export default userRouter;