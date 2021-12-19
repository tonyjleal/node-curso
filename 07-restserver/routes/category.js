const { Router } = require('express');
const { check } = require('express-validator');
const {  validateJWT, validateFields } = require('../middlewares');
const { createCategory } = require('../controllers/category')
const router = Router();

router.get('/', (req , res) => {
    res.json('get');
});

router.get('/:id', (req , res) => {
    res.json('get');
});

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
], createCategory);

router.put('/:id', (req , res) => {
    res.json('put');
});

router.delete('/:id', (req , res) => {
    res.json('delete');
});



module.exports = router;