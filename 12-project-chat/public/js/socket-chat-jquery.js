let params = new URLSearchParams(window.location.search);
// 

//References
const divUsers = $('#divUsers');

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


divUsers.on('click', 'a', function(){

    const id = $(this).data('id');

    if( id ) {
        console.log(id);
    }

});
