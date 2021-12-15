const { response } = require("express");

const { comparePassword } = require("../helpers/encrypt-password");
const { generateJWT } = require("../helpers/generate-jwt");

const User = require('../models/user');

const login = async ( req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email }) ;
  
        if( !user || !user.state){
            return res.status(400).json({
                msg: 'Usuario/Password invalidos'
            });
        }

        const valid = comparePassword(password, user.password);
        if( !valid ) {
            return res.status(400).json({
                msg: 'Usuario/Password invalidos'
            });
        }

        // JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token,
        });

    } catch ( error ) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }


}

module.exports = {
    login
}