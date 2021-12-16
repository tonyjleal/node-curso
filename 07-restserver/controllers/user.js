const { response, request } = require('express');
const { encryptPassword } = require('../helpers/encrypt-password');


const User = require('../models/user');


const userGET = async (req = request, res = response) => {

    // const {q, name = 'No name', apikey, page = 1, limit = 5} = req.query;
    const { limit = 5, skip = 0 } = req.query;
    const query = { state: true };

    // Ejecuta ambas pero hasta que no termina
    // la primera promesa, no pasa a lanzar la
    // siguiente.
    // const users = await User.find( query )
    //                         .skip( Number( skip ) )
    //                         .limit( Number( limit ));
    // const total = await User.countDocuments( query );

    // Ejecuta ambas promesas de manera simultanea
    // no devolverá la respuesta hasta que ambas
    // hayan devuelto su valor.
    // NOTA: Si una da error, todas van a dar error.
    const [total, users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number( skip ) )
            .limit( Number( limit )),
    ]);

    res.json({
        total,
        users,
    });
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

const userDELETE = async (req, res = response) => {

    const { id } = req.params;
    // Eliminar físicamente
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { state: false });


    res.json({
        user,
    });
}

module.exports = {
    userGET,
    userPOST,
    userPUT,
    userPATCH,
    userDELETE
}