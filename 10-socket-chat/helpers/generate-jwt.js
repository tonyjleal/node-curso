const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateJWT = ( uid = '') => {
    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( error, token ) => {

            if ( error ) {
                console.log(error);
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }
            
        });

    });
}

const validateJWT = async( token = '' ) => {
    try {
        if( token.length < 10 ){
            return null;
        }

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await User.findById( uid );

        return ( user && user.status ) 
                ? user
                : null;

    } catch (error) {
        return null;
    }
}


module.exports = {
    generateJWT,
    validateJWT
}