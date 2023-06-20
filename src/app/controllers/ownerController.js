import sequelize from '../../config/database/index.js';

class ownerController {
    async Test(req, res) {
        try {
            const query = 'SELECT * FROM users';
            const [results] = await sequelize.query(query);

            // Trả về kết quả truy vấn dưới dạng JSON
            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default new ownerController();
