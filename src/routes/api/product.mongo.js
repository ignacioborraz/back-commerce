import is_admin from '../../middlewares/is_admin.js'
import Product from '../../models/product.model.js'
import { Router } from 'express'

const router = Router()

router.post('/',is_admin, async(req,res,next)=>{
    try {
        await Product.create(req.body)
        return res.status(201).json({
            success:true,
            message:'product created'
        })
    } catch (error) {
        next(error)
    }
})

export default router