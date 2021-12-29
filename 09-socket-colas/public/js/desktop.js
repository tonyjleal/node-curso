// Referencias HTML
const lblDesktop = document.querySelector('h1');
const btnAttend = document.querySelector('button');



const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('desktop') ) {
    window.location = 'index.html';
    throw new Error('El escritorio es oblitatorio');
}

const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop;

// Referencias del HTML
const lblNewTicket  = document.querySelector('#lblNewTicket');
const btnCreate = document.querySelector('button');

const socket = io();



socket.on('connect', () => {

    btnAttend.disabled = false;

});

socket.on('disconnect', () => {

    btnAttend.disabled = true;

});


socket.on( 'last-ticket',  ( last ) => {
    // lblNewTicket.innerText = last;
});

btnAttend.addEventListener( 'click', () => {
    
    // socket.emit( 'next-ticket', null, ( ticket ) => {
    //     lblNewTicket.innerText = ticket;
    // });

});

