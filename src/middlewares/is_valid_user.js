import User from "../models/user.model.js"

export default async function(req,res,next) {
    try {
        const { mail,password } = req.body
        let one = await User.findOne({ mail })
        if (one && one.password===password) {
            next()
        } else {
            return res.status(400).json({
                status: 400,
                method: req.method,
                path: req.url,
                response: 'invalid credential'
            })
        }
    } catch (error) {
        next(error)
    }
}