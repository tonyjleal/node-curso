const Role = require("../models/role");

const isRoleValid = async(rol = '') => {
    const existRol = await Role.findOne( {rol} );
    if(!existRol) {
            throw new Error(`El rol ${rol} no está registrado en la BBDD`);
    }
} 

module.exports = {
    isRoleValid,
}