const path = require('path');
const fs = require('fs');

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

    // Limpiar imagenes previas
    try {
        if( model.image ) {
            // Borrar imagen del servidor
            const pathImage = path.join(__dirname, '../uploads', collection, model.image)
            if ( fs.existsSync(pathImage) ) {
                fs.unlinkSync(pathImage);
            } 
        }
    } catch( error ) {

    }

    const name = await uploadFile(req.files, undefined, collection);
    model.image = name;
    
    await model.save();

    res.json({
        model,
    });
}


const showImage = async( req, res= response ) => {

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

    // Limpiar imagenes previas

    if( model.image ) {
        // Borrar imagen del servidor
        const pathImage = path.join(__dirname, '../uploads', collection, model.image)
        if ( fs.existsSync(pathImage) ) {
            return res.sendFile( pathImage );
        } 
    }

    res.json({
        msg: 'Falta place holder'
    });
}

module.exports = {
    loadFile,
    updateImage,
    showImage
}