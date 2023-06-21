import JWT from 'jsonwebtoken';
import sequelize from '../config/database/index.js';

const signToken = async (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
        };
        const secret = process.env.TOKEN_SECRET;
        const options = {
            expiresIn: '1h', //10s
        };
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};

const verifyOwnerToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.json({
            status: 401,
            message: 'Unauthorized',
        });
    }

    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
        if (err) {
            return res.json({
                status: 401,
                message: 'Unauthorized',
            });
        }
        const id = payload.id;
        const query = `SELECT role FROM users WHERE id = '${id}'`;
        const [row] = await sequelize.query(query);
        const isOwner = row[0].role;
        if (!isOwner) {
            return res.json({
                status: 401,
                message: 'Unauthorized',
            });
        }
        req.payload = payload;
        next();
    });
};

const verifyFreelancerToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.json({
            status: 401,
            message: 'Unauthorized',
        });
    }

    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
        if (err) {
            return res.json({
                status: 401,
                message: 'Unauthorized',
            });
        }
        const id = payload.id;
        const query = `SELECT role FROM users WHERE id = '${id}'`;
        const [row] = await sequelize.query(query);
        const isOwner = row[0].role;
        if (isOwner) {
            return res.json({
                status: 401,
                message: 'Unauthorized',
            });
        }

        req.payload = payload;
        next();
    });
};

export { signToken, verifyOwnerToken, verifyFreelancerToken };
