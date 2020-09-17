const Router = require('koa-router');
const router = new Router({prefix: '/articles'});

const { find, findById, create } = require('../controllers/articles');

router.get('/', find);        // http://localhost:3000/articles/
router.get('/:id', findById);
router.post('/', create);

module.exports = router;
