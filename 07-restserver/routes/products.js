const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, isAdminRole } = require('../middlewares');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/products');
const { existProductId, existCategoryId } = require('../helpers/db-validators');

const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existProductId),
    validateFields,
], getProduct);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un ID válido').isMongoId(),
    check('category').custom(existCategoryId),
    validateFields,
], createProduct);

router.put('/:id', [
    validateJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existProductId),
    validateFields,
], updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existProductId),
    validateFields   
], deleteProduct);


module.exports = router;