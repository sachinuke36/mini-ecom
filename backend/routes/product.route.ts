import { Router } from 'express'
import { getProducts } from '../controllers/product.controller'


export default (router: Router)=>{
    router.get('/products/:userId', getProducts)
}