const { response, request } = require('express');
const { Category } = require('../models');



const createCategory = async (req, res = response) => {



    const name = req.body.name.toUpperCase();
    const categoryBD = await Category.findOne({ name });

    if( categoryBD ) {
        return res.status(400).json({
            msg: `La categoria ${ categoryBD.name } ya existe`,
        })
    }

    const data = {
        name,
        user: req.user._id,
    }

    const category = new Category(data);
    category.save();


    res.json({
        category,
    });
}


module.exports = {
    createCategory,
}