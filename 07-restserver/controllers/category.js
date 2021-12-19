const { response, request } = require('express');


const Category = require('../models/category');


const categoryGET = async (req = request, res = response) => {

    // const {q, name = 'No name', apikey, page = 1, limit = 5} = req.query;
    const { limit = 5, skip = 0 } = req.query;
    const query = { state: true };

    // Ejecuta ambas pero hasta que no termina
    // la primera promesa, no pasa a lanzar la
    // siguiente.
    // const categorys = await Category.find( query )
    //                         .skip( Number( skip ) )
    //                         .limit( Number( limit ));
    // const total = await Category.countDocuments( query );

    // Ejecuta ambas promesas de manera simultanea
    // no devolverá la respuesta hasta que ambas
    // hayan devuelto su valor.
    // NOTA: Si una da error, todas van a dar error.
    const [total, categorys] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
            .skip( Number( skip ) )
            .limit( Number( limit )),
    ]);

    res.json({
        total,
        categorys,
    });
}

const categoryPOST = async (req, res = response) => {

    const { name, email, password, role} = req.body;
    const category = new Category( { name, email, password, role } );

    encryptPassword( password, category );

    await category.save();
    
    res.json({
        category,
    });
}

const categoryPUT = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if ( password ) {
        encryptPassword( password, rest );
    }

    const category = await Category.findByIdAndUpdate( id, rest );

    res.json(category);
}

const categoryPATCH = (req, res = response) => {
    res.json({
        message: 'patch API - controller'
    });
}

const categoryDELETE = async (req, res = response) => {

    const { id } = req.params;
    // Eliminar físicamente
    // const category = await Category.findByIdAndDelete( id );

    const category = await Category.findByIdAndUpdate( id, { state: false });


    res.json({
        category,
    });
}

module.exports = {
    categoryGET,
    categoryPOST,
    categoryPUT,
    categoryPATCH,
    categoryDELETE
}