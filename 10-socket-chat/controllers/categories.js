const { response, request } = require('express');
const { Category } = require('../models');

// getcATEGORY paginado, populate (relación), total
// getcATEGORY populate (relación)

const getCategory = async( req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById( id )
                                    .populate('user', 'name');

    res.json(category);

}

const getCategories = async( req, res = response ) => {

    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
            .populate('user', 'name')
            .skip( Number( skip ) )
            .limit( Number( limit )),
    ]);

    res.json({
        total,
        categories,
    });
}

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

const updateCategory = async ( req, res = response ) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;
    data.name = req.body.name.toUpperCase()
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json(category);

}

const deleteCategory = async(req, res= response ) => {
    const { id } = req.params;
    // {new: true} refleja los datos actualizados / eliminados
    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true})

    res.json(category);

}


module.exports = {
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}