const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { userGET, 
        userPUT, 
        userPATCH, 
        userDELETE, 
        userPOST } = require('../controllers/user');

const router = Router();

router.get('/', userGET);

router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('password', 'El password es obligatorio y debe tener más de 6 letras').isLength({ min: 6}),
        check('rol', 'Nop es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validateFields,
], userPOST);

router.patch('/', userPATCH);

router.put('/:id', userPUT);

router.delete('/', userDELETE);


module.exports = router;