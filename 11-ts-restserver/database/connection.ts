import { Sequelize } from 'sequelize';

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'node.db',
    host: 'localhost',
});

export default db;

