const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const collectionsAllowed = [
    'categories',
    'products',
    'roles',
    'users',
];

const searchUsers = async( term = '', res = response ) => {
    
    const isMongoId = ObjectId.isValid( term );

    if(isMongoId) {
        const user = await User.findById( term );
        res.json({
            results: ( user ) ? [ user ] : [],
        });
    }
}

const search = ( req, res = response ) => {
  
    const { collection, term} = req.params;

    if ( !collectionsAllowed.includes( collection) ) {
       return res.status(400).json({
           msg: `Las colecciones permitidas son ${ collectionsAllowed }`
       }) 
    }

    switch ( collection ) {
        case 'users':
            searchUsers(term, res);
        break;
        case 'categories':
        
        break;
        case 'products':

        break;
        default:
            res.status(500).json({
                msg: 'No se ha implementado esta búsqueda'
            });
        break;
    }
}



module.exports = {
    search,
}