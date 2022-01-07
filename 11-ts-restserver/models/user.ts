import { DataTypes } from 'sequelize';
import db from '../database/connection';


const User  = db.define('User', {

    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },

}, { paranoid: true } );

// Sequelize supports the concept of paranoid tables. A paranoid table is one that, 
// when told to delete a record, it will not truly delete it. Instead, a special 
// column called deletedAt will have its value set to the timestamp of that deletion 
// request.

// This means that paranoid tables perform a soft-deletion of records, instead of a hard-deletion.

export default User;