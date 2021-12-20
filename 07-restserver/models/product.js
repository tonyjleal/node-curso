const { Schema, model } = require('mongoose');

const ProductSchema = Schema({

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
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: { type: String },
    available: { type: String, default: true },
});

ProductSchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    
    return data;
}

module.exports = model('Product', ProductSchema);