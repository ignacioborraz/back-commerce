import 'dotenv/config.js'
import { connect } from 'mongoose'
import express from 'express'
import router from './routes/index.js'
import error_handler from './middlewares/error_handler.js'
import not_found_handler from './middlewares/not_found.js'
import { __dirname } from './utils.js'

const server = express()

//middlewares
server.use('',express.static('public'))
server.use('/img',express.static('img'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/',router)
server.use(error_handler)
server.use(not_found_handler)

//database
connect(process.env.LINK_DB) //requiere mínimo un parámetro: el link de conexión (URI)
    .then(()=>console.log('database connected'))
    .catch(err=>console.log(err))

export default server