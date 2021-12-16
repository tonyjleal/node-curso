const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async( req, res ) => {

    const token = req.header('x-token');
 
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        // leer (modelo) usuario correspondiente al uid
        const user = await User.findById( uid );

        if ( !user ) {
            return res.status(401).json({
                msg: 'Usuario no existente'
            });
        }
        
        if ( !user.state ){
            return res.status(401).json({
                msg: 'Token no válido - usuario no activo'
            });
        }


        req.user = user;

        next();

    } catch( error ) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validateJWT,
}

