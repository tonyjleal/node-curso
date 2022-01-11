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

const renderMessage = ( message ) => {

    let html = '';

    html = `<li class="animated fadeIn">
                <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
                <div class="chat-content">
                    <h5>${ message.name }</h5>
                    <div class="box bg-light-info">${ message.message }</div>
                </div>
                <div class="chat-time">10:56 am</div>
            </li>`;

    divChatbox.append(html);
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
       renderMessage(message);
    });
    
});