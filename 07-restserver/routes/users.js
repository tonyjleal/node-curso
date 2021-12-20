const { Router } = require('express');
const { check } = require('express-validator');

const { isRoleValid, existEmail, existUserById } = require('../helpers/db-validators');

const { validateFields, 
        validateJWT, 
        isAdminRole, 
        hasRole } = require('../middlewares');

const { userGET, 
        userPUT, 
        userPATCH, 
        userDELETE, 
        userPOST } = require('../controllers/users');

const router = Router();

router.get('/', userGET);

router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('email').custom( existEmail ),
        check('password', 'El password es obligatorio y debe tener más de 6 letras').isLength({ min: 6}),
        // check('role', 'Nop es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( isRoleValid ),
        validateFields,
], userPOST);

router.patch('/', userPATCH);

router.put('/:id', [
        check('id','No es un ID válido').isMongoId(),
        check('id').custom( existUserById ),
        check('role').custom( isRoleValid ),
        validateFields,
], userPUT);

router.delete('/:id', [
        validateJWT,
        // isAdminRole,        
        hasRole('ADMIN_ROLE', 'USER_ROLE', 'OTRO_ROLE'),
        check('id','No es un ID válido').isMongoId(),
        check('id').custom( existUserById ),
        validateFields,
], userDELETE);


module.exports = router;