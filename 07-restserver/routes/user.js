const { Router } = require('express');
const { check } = require('express-validator');

const { userGET, 
        userPUT, 
        userPATCH, 
        userDELETE, 
        userPOST } = require('../controllers/user');

const router = Router();

router.get('/', userGET);

router.post('/', [
        check('email', 'El correo no es válido').isEmail()
], userPOST);

router.patch('/', userPATCH);

router.put('/:id', userPUT);

router.delete('/', userDELETE);


module.exports = router;