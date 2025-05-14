import express, { Router } from 'express'
import authRouter from './auth.route'
import ProducRouter from './product.route'

const router = Router();


export default ():Router=>{
    authRouter(router)
    ProducRouter(router);
    return router;
}