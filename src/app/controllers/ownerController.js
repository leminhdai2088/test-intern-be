import sequelize from '../../config/database/index.js';
import { IsOwnerOfThisStore, IsWorking } from '../../helpers/multiFunc.js';

class ownerController {
    // GET /owner/store
    async ShowStore(req, res) {
        try {
            const { id } = req.payload;
            const query = `SELECT * FROM store WHERE ownerId = ${id}`;
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

    // GET /owner/store/:id/employee
    async ShowEmployeeByStoreId(req, res) {
        try {
            const storeId = req.params.id;
            const ownerId = req.payload.id;
            const isOwnerOfThisStore = await IsOwnerOfThisStore(ownerId, storeId);
            if (isOwnerOfThisStore == 0) {
                return res.json({
                    status: 401,
                    message: `${ownerId} is not a owner of this store`,
                });
            } else {
                const query = `SELECT * FROM users WHERE storeId = ${storeId}`;
                const [rows] = await sequelize.query(query);
                res.json(rows);
            }
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: 'cannot show employee',
            });
        }
    }

    // GET /owner/show-request
    async ShowRequest(req, res) {
        try {
            const ownerId = req.payload.id;
            const query = `
            SELECT users.*, store.name as store FROM request, store, users
            WHERE request.storeid = store.id
			AND request.freelancerid = users.id
            AND ownerid = ${ownerId}
            AND requested = false
            `;
            const [rows] = await sequelize.query(query);
            console.log(':::::::', rows);
            res.json(rows);
        } catch (err) {
            console.log(err);
            return res.json({
                status: 500,
                message: 'cannot inspect request',
            });
        }
    }

    // PUT /owner/show-request
    async AcceptRequest(req, res) {
        try {
            const ownerId = req.payload.id;
            const { storeId, freelancerId } = req.body;
            const isOwnerOfThisStore = await IsOwnerOfThisStore(ownerId, storeId);
            const isWorking = await IsWorking(freelancerId);
            if (isOwnerOfThisStore == 0) {
                return res.json({
                    status: 401,
                    message: 'You is not the owner of this store',
                });
            }

            if (isWorking == 1) {
                return res.json({
                    status: 401,
                    message: 'Cannot accept request, the freelancer is current working!',
                });
            }

            const queryAccept = `
            SELECT * FROM request WHERE freelancerid = ${freelancerId} AND storeid = ${storeId} AND requested = false
        `;
            const [rows] = await sequelize.query(queryAccept);
            if (rows.length == 0) {
                return res.json({
                    status: 401,
                    message: 'The freelancer was not requested working in this store',
                });
            }

            const deleteRequest = `
            DELETE FROM request
            WHERE freelancerid = ${freelancerId}
            AND requested = false
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

    async FindFreelancerByPhone(req, res) {
        try {
            let query;
            const { phone } = req.query;
            if (phone) {
                query = `
                SELECT * 
                FROM users 
                WHERE storeid is null 
                AND role = false
                AND phone = '${phone}'
                `;
            } else {
                query = `
                SELECT * 
                FROM users 
                WHERE storeid is null 
                AND role = false
                `;
            }

            const [rows] = await sequelize.query(query);
            res.json(rows);
        } catch (err) {
            console.log(err);
            return res.json({
                status: 500,
                message: 'Cannot find freelancer!',
            });
        }
    }

    async SendRequest(req, res) {
        try {
            const { storeId, freelancerId } = req.body;
            const ownerId = req.payload.id;
            const isWorking = await IsWorking(freelancerId);
            if (isWorking) {
                return res.json({
                    status: 401,
                    message: 'This freelancer are working in store! ',
                });
            }

            const isOwnerOfThisStore = await IsOwnerOfThisStore(ownerId, storeId);
            if (!isOwnerOfThisStore) {
                return res.json({
                    status: 401,
                    message: 'You is not the owner of this store!',
                });
            }

            const query = `INSERT INTO request (freelancerid, storeid, requested) values (${freelancerId}, ${storeId}, true)`;
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

    // GET /owner/show-empl-gr-store
    async ShowEmplGrByStore(req, res) {
        try {
            const ownerId = req.payload.id;
            const query = `
                SELECT store.id, store.name as store, users.*
                FROM users, store
                WHERE storeid = store.id
                AND role = false
                AND ownerid = ${ownerId}
                GROUP BY store.id, store.name, users.id
            `;
            const [rows] = await sequelize.query(query);

            res.json(rows);
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: 'cannot show employee',
            });
        }
    }

    async DeleteEmployee(req, res) {
        try {
            const ownerId = req.payload.id;
            const freelancerId = req.body.id;

            const queryStoreId = `
                SELECT storeid
                FROM users
                WHERE id = ${freelancerId}
                AND role = false
            `;
            const [row] = await sequelize.query(queryStoreId);
            if (row.length == 0) {
                return res.json({
                    status: 402,
                    message: 'cannot find employee',
                });
            }
            const storeId = row[0].storeid;
            if (!storeId) {
                return res.json({
                    status: 401,
                    message: 'You are not the owner of this employee!',
                });
            }
            const isOwnerOfThisStore = IsOwnerOfThisStore(ownerId, storeId);
            if (isOwnerOfThisStore == 0) {
                return res.json({
                    status: 401,
                    message: 'You are not the owner of this employee!',
                });
            }

            const queryDeleteEmployee = `UPDATE users SET storeid = null WHERE id = ${freelancerId}`;
            await sequelize.query(queryDeleteEmployee);
            return res.json({
                status: 200,
                message: 'Delete employee successfully!',
            });
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: 'cannot show employee',
            });
        }
    }
}

export default new ownerController();
