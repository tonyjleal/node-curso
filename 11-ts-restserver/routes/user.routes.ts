import { getUsers, getUser, postUser, putUser, deletUser } from '../controllers/users.controllers';
import { Router }  from 'express';

const router: Router = Router();


router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', deletUser);



export default router;