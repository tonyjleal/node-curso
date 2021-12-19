const { Schema, model } = require('mongoose');

const CategorySchema = Schema({

    name: {
        type: String,
        required:[true, 'El nombre es obligatorio'],
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio']
    }

});

module.exports = model('Category', CategorySchema);