const Router = require('koa-router');
const router = new Router({prefix: '/flow'});

const { findFlow,getFlow } = require('../controllers/flow');


router.get('/getFlow', getFlow);        // http://localhost:5000/flow/getFlow
router.post('/findFlow', findFlow);        // http://localhost:5000/flow/findFlow

module.exports = router;
