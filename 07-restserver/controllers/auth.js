const { response } = require("express");

const { comparePassword } = require("../helpers/encrypt-password");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async( req, res = response ) => {
    const { id_token } = req.body;

    try {

        const googleUser = await googleVerify( id_token )

        res.json({
            msg: 'OK, Sign-In',
            id_token,
        });

    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        });
    }



}

module.exports = {
    login,
    googleSignIn
}