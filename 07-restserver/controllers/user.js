const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const userGET = (req = request, res = response) => {

    const {q, name = 'No name', apikey, page = 1, limit = 5} = req.query;

    res.json({
        message: 'get API - controller',
        q,
        name,
        apikey,
        page,
        limit
    });
}

const userPOST = async (req, res = response) => {

    const { name, email, password, rol} = req.body;
    const user = new User( { name, email, password, rol } );

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar db
    await user.save();
    
    res.json({
        user,
    });
}

const userPUT = (req, res = response) => {

    const { id } = req.params;

    res.json({
        message: 'put API - controller',
        id,
    });
}

const userPATCH = (req, res = response) => {
    res.json({
        message: 'patch API - controller'
    });
}

const userDELETE = (req, res = response) => {
    res.json({
        message: 'delete API - controller'
    });
}

module.exports = {
    userGET,
    userPOST,
    userPUT,
    userPATCH,
    userDELETE
}