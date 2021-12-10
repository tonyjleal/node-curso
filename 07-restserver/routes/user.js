const { Router } = require('express');
const { userGET, 
        userPUT, 
        userPATCH, 
        userDELETE, 
        userPOST } = require('../controllers/user');

const router = Router();

router.get('/', userGET);

router.post('/', userPOST);

router.patch('/', userPATCH);

router.put('/:id', userPUT);

router.delete('/', userDELETE);


module.exports = router;