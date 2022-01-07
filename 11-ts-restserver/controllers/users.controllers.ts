import { Request, Response} from 'express';
import User from '../models/user';


export const getUsers = async ( req: Request, res: Response) => {

    const users = await User.findAll();

    res.json({users});

}

export const getUser = async( req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk(id);

    if( user ) {
        res.json(user);
    } else {
        res.status(404).json({
            msg: `No existe usuario con id: ${id}`
        });
    }
}

export const postUser = async( req: Request, res: Response) => {

    const { body } = req;

    try {

        const exist = await User.findOne({
            where: {
                email: body.email
            }
        });
        
        if( exist ) {
            return res.status(400).json({
                msg: `Ya existe usuario con el email ${body.email}`
            })
        }

        const user = await User.create(body);
        res.json(user);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el usuario'
        });

    }

}

export const putUser = async( req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk( id );
        if ( !user ) {
            return res.status(404).json({
                msg: 'No existe usuario con id' + id
            });
        }

        await user.update(body);

        res.json(user);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el usuario'
        });

    }

}

export const deletUser = ( req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'deleteUser',
        id,
    });

}


