import bcrypt from 'bcrypt';
import sequelize from '../config/database/index.js';

const IsOwnerOfThisStore = async (ownerId, storeId) => {
    const query = `SELECT * FROM store WHERE id = ${storeId}`;
    const [rows] = await sequelize.query(query);
    if (rows[0].ownerid == ownerId) return 1;
    return 0;
};

const IsWorking = async (freeId) => {
    const query = `SELECT storeid FROM users WHERE id = ${freeId} AND role = false`;
    const [rows] = await sequelize.query(query);
    if (!rows[0].storeid) {
        return 0;
    } else {
        return 1;
    }
};

const isCheckedPassword = async (password, passwordInDb) => {
    try {
        return await bcrypt.compare(password, passwordInDb);
    } catch (error) {
        console.log(error);
    }
};

export { isCheckedPassword, IsOwnerOfThisStore, IsWorking };
