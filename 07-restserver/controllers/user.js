const { response, request } = require('express');
const { encryptPassword } = require('../helpers/encrypt-password');


const User = require('../models/user');


const userGET = async (req = request, res = response) => {

    // const {q, name = 'No name', apikey, page = 1, limit = 5} = req.query;
    const { limit = 5, skip = 0 } = req.query;
    const users = await User.find()
                            .skip( Number( skip ) )
                            .limit( Number( limit ));

    res.json(users);
}

const userPOST = async (req, res = response) => {

    const { name, email, password, rol} = req.body;
    const user = new User( { name, email, password, rol } );

    encryptPassword( password, user );

    await user.save();
    
    res.json({
        user,
    });
}

const userPUT = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if ( password ) {
        encryptPassword( password, rest );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json(user);
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