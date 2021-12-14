const Role = require("../models/role");
const User = require('../models/user');

const isRoleValid = async(rol = '') => {
    const existRol = await Role.findOne( {rol} );
    if(!existRol) {
            throw new Error(`El rol ${rol} no está registrado en la BBDD`);
    }
} 

const existEmail = async( email = '' ) => {
    const exist = await User.findOne({ email });
    if( exist ) { 
        throw new Error(`El email (${ email }) ya está registrado`);
    }
}

const existUserById = async ( id ) => {
    const exist = await User.findById(id);
    if ( !exist ) {
        throw Error(`El ID no existe ${ id }`);
    }
}

module.exports = {
    isRoleValid,
    existEmail,
    existUserById,
}