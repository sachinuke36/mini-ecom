import { Router } from 'express'
import { getProducts, smartSearch } from '../controllers/product.controller'


export default (router: Router)=>{
    router.get('/products/:userId', getProducts)
    router.post('/products/smartsearch', smartSearch )
}