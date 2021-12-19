const { Router } = require('express');
const { check } = require('express-validator');
const {  validateJWT, validateFields, isAdminRole } = require('../middlewares');
const { createCategory, getCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/category');
const {  existCategoryId } = require('../helpers/db-validators');
const router = Router();

router.get('/', getCategories);

router.get('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existCategoryId),
    validateFields,
], getCategory);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
], createCategory);

router.put('/:id', [
    validateJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existCategoryId),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
], updateCategory);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existCategoryId),  
    validateFields,
], deleteCategory);



module.exports = router;