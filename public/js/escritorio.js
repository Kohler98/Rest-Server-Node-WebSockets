const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const searchParams = new URLSearchParams(window.location.search)
const lblTicket = document.querySelector('small')
const lblPendientes = document.querySelector('#lblPendientes')

const alerta = document.querySelector('.alert')
if (!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es Obligatorio')
}

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio
const socket = io();

alerta.style.display = 'None'


socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false
    socket.on('ultimo-ticket', (payload,callback) => {
        // lblTicket.innerText = 'Ticket : '+ callback.ultimo
       
    });
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true
 
});


socket.on('tickets-pendientes',(payload)=>{
    if(payload == 0){
        lblPendientes.style.display ='none'
    }else{
        lblPendientes.innerText = payload

    }
 
})


btnAtender.addEventListener( 'click', () => {
    
    socket.emit('atender-ticket', {escritorio}, ({ok,ticket, msg})=>{
        if (!ok){
            lblTicket.innerText = ' a nadie'
            return alerta.style.display = ''
        }
        lblTicket.innerText ='Ticket '+ ticket.numero
 
     
       
    })

    
    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //     lblTicket.innerText = 'Ticket : '+ ticket.Ticket
    // });

});
 