const bcryptjs = require('bcryptjs');
    
const encryptPassword = ( password, user ) => {
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
}

const comparePassword = ( password, passwordCompare ) => {
   return bcryptjs.compareSync(password, passwordCompare);
}


module.exports = {
    encryptPassword,
    comparePassword
}