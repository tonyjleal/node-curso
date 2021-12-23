const { Router } = require('express');
const { check } = require('express-validator');
const { loadFile, updateImage } = require('../controllers/uploads');
const { collectionsAllowed } = require('../helpers');
const { validateFields } = require('../middlewares');

const router = Router();


router.post( '/', loadFile );

router.put('/:collection/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users', 'products']) ),
    validateFields 
],
 updateImage);

module.exports = router;