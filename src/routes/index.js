import ownerRouter from '../routes/ownerRouter.js';
import siteRouter from '../routes/siteRouter.js';

const route = (app) => {
    app.use('/owner', ownerRouter);
    app.use('/site', siteRouter);
};

export default route;
