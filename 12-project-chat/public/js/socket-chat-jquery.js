let params = new URLSearchParams(window.location.search);

const nameUser = params.get('name');
const room = params.get('room');


//References
const divUsers = $('#divUsers');
const sendForm = $('#sendForm');
const txtMessage = $('#txtMessage');
const divChatbox = $('#divChatbox');


const renderUsers = (users) => {

    let html = '';

    html = `<li>
                <a href="javascript:void(0)" class="active"> Chat de <span> ${ params.get('room') }</span></a>
            </li>`;


    for(let i = 0; i < users.length; ++i) {
       html += `<li>
                    <a  data-id="${ users[i].id }"  href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${ users[i].name }<small class="text-success">online</small></span></a>
                </li>`;
    }        

    divUsers.html(html);

}

const renderMessage = ( message, self ) => {

    const date = new Date(message.date);
    // let hour = date.getHours() + ':' + date.getMinutes();
    let hour = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    let html = '';
    let adminClass = 'info';

    if(message.name === 'Admin') {
        adminClass = 'danger';
    }

    if ( self ) {
        html = `<li class="reverse">
                    <div class="chat-content">
                        <h5>${ message.name }</h5>
                        <div class="box bg-light-inverse">${ message.message }</div>
                    </div>
                    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
                    <div class="chat-time">${ hour }</div>
                </li>`; 

    } else {
        html = `<li class="animated fadeIn">
                    <div class="chat-img" style="display:${ message.name === 'Admin' ? 'none' : '' }"><img src="assets/images/users/1.jpg" alt="user"  /></div>
                    <div class="chat-content">
                        <h5>${ message.name }</h5>
                        <div class="box bg-light-${ adminClass }">${ message.message }</div>
                    </div>
                    <div class="chat-time">${ hour }</div>
                </li>`;
    }

    divChatbox.append(html);
}

const scrollBottom = () => {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

divUsers.on('click', 'a', function() {

    const id = $(this).data('id');

    if ( id ) {
        console.log(id);
    }

});

sendForm.on('submit', function(e) {
    e.preventDefault();

    if (txtMessage.val().trim().length == 0) {
        return;
    }

    socket.emit('sendMessage', {
        user: nameUser,
        message: txtMessage.val(),
    }, function( message ) {
       txtMessage.val('').focus();
       renderMessage(message, true);
       scrollBottom();
    });
    
});

