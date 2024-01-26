const express = require('express')
const cors = require('cors')
const { socketController } = require('../sockets/controller')

 
class Server{
    constructor(){
        this.app    = express()
        this.paths  = {}
        this.PORT   = process.env.PORT
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);
        //Midlewares : no son mas que funciones que van a añadirle otras funcionalidades al web server
        // en otras palabras es una funcion que se ejecuta antes de llamar un controlador o seguir con la ejecucion
        //de las peticiones
        //rutas de mi applicacion

        this.middlewares()
        
        this.routes()

        // sockets
        this.sockets()
    }

    middlewares(){
        //cors 
        this.app.use(cors())
        
        
        //directorio publico
        this.app.use(express.static('public'))
   

    }
    routes(){

        // this.app.use(this.paths.authPath, require('../routers/auth'))
 
    }
    sockets(){
        this.io.on('connection', socketController)
    }

    listen(){
        this.server.listen(this.PORT, ()=>{
            console.log("Servidor corriendo en puerto", this.PORT)
        })
    }
 
}


module.exports = Server