const { response } = require('express');

const userGET = (req, res = response) => {
    res.json({
        message: 'get API - controller'
    });
}

const userPOST = (req, res = response) => {
    res.json({
        message: 'post API - controller'
    });
}

const userPUT = (req, res = response) => {
    res.json({
        message: 'put API - controller'
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