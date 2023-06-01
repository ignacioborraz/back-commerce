import { Router } from "express"
import product_manager from "../../managers/Product.js"

const products_router = Router()

products_router.get('/', async(req,res,next) => {
    try {
        return res.render('products',{ title: 'PRODUCTS', products: product_manager.read_products() })
        } catch (error) {
            next()
        }
    }
)

products_router.get('/:pid', async(req,res,next) => {
    try {
        let pid = Number(req.params.pid)
        return res.render('product',{ title: 'PRODUCT DETAIL', script:'detail.js', product: product_manager.read_product(pid) })
        } catch (error) {
            next()
        }
    }
)

export default products_router