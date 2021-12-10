const { response, request } = require('express');

const userGET = (req = request, res = response) => {

    const {q, nombre = 'No name', apikey, page = 1, limit = 5} = req.query;

    res.json({
        message: 'get API - controller',
        q,
        nombre,
        apikey
    });
}

const userPOST = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        message: 'post API - controller',
        nombre,
        edad,
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