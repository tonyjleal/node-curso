const { Schema, model } = require('mongoose');

const CategorySchema = Schema({

    name: {
        type: String,
        unique: true,
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

CategorySchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    
    return data;
}

module.exports = model('Category', CategorySchema);