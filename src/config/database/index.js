import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test1', 'postgres', '123456789', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;
