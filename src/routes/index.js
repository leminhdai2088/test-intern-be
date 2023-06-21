import ownerRouter from '../routes/ownerRouter.js';
import siteRouter from '../routes/siteRouter.js';
import freelancerRouter from '../routes/freelancerRouter.js';

const route = (app) => {
    app.use('/owner', ownerRouter);
    app.use('/site', siteRouter);
    app.use('/freelancer', freelancerRouter);
};

export default route;
