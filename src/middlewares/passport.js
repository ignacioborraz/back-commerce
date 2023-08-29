import passport from 'passport'
import { Strategy } from 'passport-local'
import User from '../models/user.model.js'

export default function() {
    passport.serializeUser(
        (user,done)=> done(null,user._id)
    )
    passport.deserializeUser(
        async(id,done)=> {
            const user = await User.findById(id)
            return done(null,user)
        }
    )
    passport.use(
        'register',     //nombre de la estrategia
        new Strategy(   //la estrategia
            {passReqToCallback:true,usernameField:'mail'},      //objeto de configuración
            async(req,username,password,done)=>{                //callback que será la encargada de procesar los datos y dejarme PASAR
                try {
                    //let one = await User.findOne({ mail:req.body.mail })
                    let one = await User.findOne({ mail:username }) //en L18 se configuró como campo principal el mail popr eso esto es lo mismo que la L22
                    if (!one) {
                        let user = await User.create(req.body)
                        return done(null,user)
                    } else {
                        return done(null,false)
                    }
                } catch (error) {
                    return done(error,false)
                }
            }                
        )
    )
    passport.use(
        'login',
        new Strategy(
            {usernameField:'mail'},
            async(username,password,done)=>{
                try {
                    let igna = await User.findOne({ mail:username})
                    if (!igna) {
                        return done(null)
                    } else {
                        return done(null,igna)   //le ponga el nombre que le ponga SIEMPRE inyecta al objeto de requerimientos una propiedad user
                        //de forma que en req.user tengo los datos del usuario encontrado
                    }
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
}