import server from "./app.js"
import { Server } from "socket.io"

const PORT = process.env.PORT || 8080
const ready = ()=> console.log('server ready on port '+PORT)

let http_server = server.listen(PORT,ready)
let socket_server = new Server(http_server)

let contador = 0

socket_server.on(       //on sirve para escuchar los mensajes que llegan (en este caso del cliente)
    'connection',       //identificador del mensaje a escuchar (el primero siempre connection)
    socket => {         //callback que se va a ejecutar apenas se conecta un cliente
        //console.log(socket)
        console.log(`client ${socket.client.id} connected`)
        socket.on(
            'primer_conexion',
            data=> {
                console.log(data.name)
                contador++
                socket_server.emit(
                    'contador',
                    { contador }
                )
            }
        )
    }
)