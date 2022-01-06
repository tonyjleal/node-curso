import { Sequelize } from 'sequelize';

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database/node.db',
    host: 'localhost',
});

export default db;

