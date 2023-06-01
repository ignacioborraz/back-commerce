import { Router } from "express"
import products_router from "./products.js"
import carts_router from "./carts.js"

const router = Router()

router.get('/',async (req,res,next) => {
    try {
        return res.render('index',{ title: 'HOME' })
    } catch (error) {
        next(error)
    }
})

router.use('/products',products_router)
router.use('/carts',carts_router)

export default router