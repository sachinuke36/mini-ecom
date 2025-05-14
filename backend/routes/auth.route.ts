import express, { Response, Router } from 'express'
import {  getUser, Login, Logout, Register } from '../controllers/auth.controller'
import {CustomRequest, isLoggedIn} from '../middleware/isLoggedIn'



export default (router: Router)=>{
    router.post("/auth/login",Login);
    router.get("/auth/logout", Logout);
    router.post("/auth/register",Register);
    router.get("/user/:userId",getUser);
    router.get("/auth/me", isLoggedIn, (req: CustomRequest, res: Response) => {
  res.status(200).json({ user: req.user });
});
}