import { Router } from "express"
import User from "../../models/user.model.js"
import is_form_ok from "../../middlewares/is_form_ok.js"
import is_8_char from "../../middlewares/is_8_char.js"

const router = Router()

router.post('/register', is_form_ok, is_8_char ,async(req,res,next)=> {
    try {
        let one = await User.create(req.body)
        return res.status(201).json({
            success: true,
            message: 'user registered',
            user_id: one._id
        })
    } catch (error) {
        next(error)
    }
})

router.post('/signin', async(req,res,next)=> {
})

router.post('/signout', async(req,res,next)=> {
})

export default router