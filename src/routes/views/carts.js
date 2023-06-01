import { Router } from "express"
import product_manager from "../../managers/Product.js"
import cart_manager from "../../managers/Cart.js"

const carts_router = Router()


carts_router.get('/:cid', async(req,res,next) => {
    try {
        let cid = Number(req.params.cid)
        let cart = await cart_manager.read_cart(cid)
        let products = []
        let total = 0
        cart.products.forEach(each => {
            let product = product_manager.read_product(each.pid)
            product.quantity = each.quantity
            product.total = product.price*each.quantity
            total = total + product.total
            products.push(product)
        })
        return res.render('cart',{ title: 'MY CART', script:"cart.js", products, total })
        } catch (error) {
            next()
        }
    }
)

export default carts_router