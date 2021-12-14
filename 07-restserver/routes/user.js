const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../middlewares/validate-fields');
const { isRoleValid, existEmail, existUserById } = require('../helpers/db-validators');
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
        check('email').custom( existEmail ),
        check('password', 'El password es obligatorio y debe tener más de 6 letras').isLength({ min: 6}),
        // check('rol', 'Nop es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( isRoleValid ),
        validateFields,
], userPOST);

router.patch('/', userPATCH);

router.put('/:id', [
        check('id','No es un ID válido').isMongoId(),
        check('id').custom( existUserById ),
        check('rol').custom( isRoleValid ),
        validateFields,
], userPUT);

router.delete('/', userDELETE);


module.exports = router;