const { Router } = require('express');
const { check } = require('express-validator');
const { loadFile, updateImage, showImage } = require('../controllers/uploads');
const { collectionsAllowed } = require('../helpers');
const { validateFields, validateFileUpload } = require('../middlewares');

const router = Router();

router.get('/:collection/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users', 'products']) ),
    validateFields 
], showImage);

router.post( '/', [
    validateFileUpload,
], loadFile );

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users', 'products']) ),
    validateFields 
],
 updateImage);

module.exports = router;