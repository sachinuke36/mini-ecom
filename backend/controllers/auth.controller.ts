import { genSalt, hash } from "bcryptjs";
import { Request, Response } from "express"
import bcrypt from 'bcryptjs'
import {prisma} from '../db/db.config'
// import { User } from "generated/prisma";
import jwt from 'jsonwebtoken'



export const Login = async(req: Request, res: Response):Promise<any>=>{
    const {email, password} =  req.body;
    if(!email || !password)  throw new Error('Email and password are required');
    try {
        const user = await prisma.user.findFirst({where: {email}});
        if(!user) return res.status(404).json({message:"User not found!"});
        const isMatch = await bcrypt.compare(password, user?.password);
        if(isMatch){
            return setCookies(user, res);
        }
        // return res.status(201).json({message:'User logged in successfully!'});
    } catch (error) {
        console.log("Error in login");
        console.log(error)
    }
}

export const Logout = (req: Request, res: Response) => {
  res.clearCookie('authtoken');
  res.status(200).json({ message: 'Logged out successfully' })
}

export const Register = async(req: Request, res: Response):Promise<any>=>{
    const { name, email, password } =  req.body;
    if(!email || !password || !name) throw new Error('All fields are required');
    const user = await prisma.user.findFirst({where:{email}});
    if(user) return res.json({message:'User already exist! Please login.'});
    const hashedPass = await generateSalt(password);
    try {
         const response = await prisma.user.create({
        data:{
            email,
            password: hashedPass,
            name
        }
    });
    console.log(response);
    const newUser = await prisma.user.findFirst({where: { email}});
        if(newUser){
           return setCookies(newUser, res);
        }
    } catch (error) {
        console.log("Error in register");
        console.log(error)
    }
   
    // res.status(201).json({ message: 'User registered successfully' });
}

export async function getUser(req:Request, res:Response):Promise<any>{
    const { userId } = req.params.userId as any;
    try {
        const user = await prisma.user.findFirst({where:{userId},select:{
            userId:true,
            name: true,
            email: true,
        }});
        if(!user) return res.json({message:"No user found!"});
        return res.status(201).json({user: user});
    } catch (error) {
        console.log(error)
    }
}

export async function generateSalt(password: string):Promise<string>{
    const salt = await genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
}

export async function setCookies(user:any, res: Response){
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const token = await jwt.sign({email: user.email},JWT_SECRET, {expiresIn:'1d'});
    return res.status(200).cookie('authtoken',token).json({success: true, userId: user.userId})
}