const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");


const loadFile = async( req, res = response ) => {
    
    try {
        const fileName = await uploadFile(req.files, undefined, 'imgs');
        res.json({
            fileName,
        })
    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const updateImage = async(req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch ( collection ) {
        case 'users':
            model = await User.findById(id);
            if( !model ) {
                return res.status(400).json({
                    msg: `No existe usuario con el id ${ id }`
                }); 
            }
        break;
        case 'products':
            model = await Product.findById(id);
            if( !model ) {
                return res.status(400).json({
                    msg: `No existe el producto con el id ${ id }`
                })
            }
        break;
        default:
            return res.status(500).json({
                msg: 'No está realizada esta validación'
            });
    }

    const name = await uploadFile(req.files, undefined, collection);
    model.image = name;
    
    await model.save();

    res.json({
        model,
    });
}


module.exports = {
    loadFile,
    updateImage
}