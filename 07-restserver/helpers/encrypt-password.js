const bcryptjs = require('bcryptjs');
    
const encryptPassword = ( password, user ) => {
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
}


module.exports = {
    encryptPassword
}