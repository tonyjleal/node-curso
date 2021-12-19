const { Category, Role, User } = require("../models");

const isRoleValid = async(role = '') => {
    const existRol = await Role.findOne( {role} );
    if(!existRol) {
            throw new Error(`El rol ${role} no está registrado en la BBDD`);
    }
} 

const existEmail = async( email = '' ) => {
    const exist = await User.findOne({ email });
    if( exist ) { 
        throw new Error(`El email (${ email }) ya está registrado`);
    }
}

const existUserById = async ( id ) => {
    const exist = await User.findById( id );
    if ( !exist ) {
        throw Error(`El ID no existe ${ id }`);
    }
}

const existCategoryId = async( id ) => {
    const exist = await Category.findById( id );
    if ( !exist ) {
        throw Error(`El ID no existe ${ id }`);
    }
}

module.exports = {
    isRoleValid,
    existEmail,
    existUserById,
    existCategoryId,
}