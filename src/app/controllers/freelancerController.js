import sequelize from '../../config/database/index.js';
import { IsWorking } from '../../helpers/multiFunc.js';

class freelancerController {
    // GET /owner/store
    async ShowStore(req, res) {
        try {
            const isWorking = await IsWorking(req.payload.id);
            if (isWorking) {
                return res.json({
                    status: 401,
                    message: 'You are working in store! ',
                });
            }
            const query = 'SELECT * FROM store';
            const [rows] = await sequelize.query(query);
            return res.json(rows);
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: 'cannot show store',
            });
        }
    }

    // GET
    async SendRequest(req, res) {
        try {
            const storeId = req.params.id;
            const freeId = req.payload.id;
            const isWorking = await IsWorking(freeId);
            if (isWorking) {
                return res.json({
                    status: 401,
                    message: 'You are working in store! ',
                });
            }

            const query = `INSERT INTO request (freelancerid, storeid, requested) values (${freeId}, ${storeId}, false)`;
            await sequelize.query(query);
            res.json({
                status: 200,
                message: 'Request was sent successfully!',
            });
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: 'cannot send request',
            });
        }
    }

    // GET /freelancer/show-request
    async ShowRequest(req, res) {
        try {
            const freelancerId = req.payload.id;
            const query = `
            SELECT store.*
            FROM request, store
            WHERE request.storeid = store.id
            AND freelancerid = ${freelancerId}
            AND requested = true
            `;
            const [rows] = await sequelize.query(query);
            res.json(rows);
        } catch (err) {
            console.log(err);
            return res.json({
                status: 500,
                message: 'cannot inspect request',
            });
        }
    }

    async ResponseRequest(req, res) {
        try {
            const freelancerId = req.payload.id;
            const { storeId } = req.body;
            const isWorking = await IsWorking(freelancerId);
            if (isWorking == 1) {
                return res.json({
                    status: 401,
                    message: 'Cannot response request, you is current working!',
                });
            }

            const queryResponse = `
                SELECT * FROM request WHERE freelancerid = ${freelancerId} AND storeid = ${storeId} AND requested = true
            `;
            const [rows] = await sequelize.query(queryResponse);
            if (rows.length == 0) {
                return res.json({
                    status: 401,
                    message: 'You was not requested working in this store',
                });
            }

            const deleteRequest = `
            DELETE FROM request
            WHERE freelancerid = ${freelancerId}
            AND requested = true
            `;
            await sequelize.query(deleteRequest);

            const acceptImpl = `UPDATE users SET storeid = ${storeId} WHERE id = ${freelancerId}`;
            await sequelize.query(acceptImpl);

            return res.json({
                status: 200,
                message: 'Accept request successfully!',
            });
        } catch (err) {
            console.log(err);
            return res.json({
                status: 500,
                message: 'Cannot accept request',
            });
        }
    }
}

export default new freelancerController();
