const TicketControl = require('../models/ticket-control')

const ticketControl = new TicketControl()


const socketController = (socket) =>{
    socket.emit('ultimo-ticket',ticketControl.ultimo)
    socket.emit('estado-actual',ticketControl.ultimos4)
    socket.emit('tickets-pendientes',ticketControl.tickets.length)
    
    socket.on('siguiente-ticket', (payload, callback)=>{
        const siguiente = ticketControl.siguiente()
        callback(siguiente)
        socket.emit('tickets-pendientes',ticketControl.tickets.length)
        // TODO modificar que hay un nuevo ticket que asignar
    })
    socket.on('atender-ticket', ({escritorio}, callback)=>{
        if(!escritorio){
            return {
                ok:false,
                msg:'El escritorio es obligatorio'
            }
        }
        const ticket = ticketControl.atenderTicket(escritorio)
        socket.broadcast.emit('estado-actual',ticketControl.ultimos4)
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length)
        socket.emit('tickets-pendientes',ticketControl.tickets.length)
        
        if(!ticket){
                callback({
                    ok:false,
                    msg:'Ya no hay ticket pendientes'
                })
            }else{
                callback({
                    ok:true,
                    ticket,
                    length: ticketControl.tickets.length
                })
            }
    })


}

module.exports = {
    socketController
}