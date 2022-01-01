const { Router } = require('express');
const { validateFields, validateJWT } = require('../middlewares');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields,
], login);

router.post('/google', [
    check('id_token', 'ID Token es necesario').not().isEmpty(),
    validateFields,
], googleSignIn);

router.get('/', 
    validateJWT,
renewToken);

module.exports = router;