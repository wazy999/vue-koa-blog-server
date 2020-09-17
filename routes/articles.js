const Router = require('koa-router');
const router = new Router({prefix: '/articles'});

const { find, findById, create, delete:del } = require('../controllers/articles');

const jwt = require('koa-jwt');
const {secret} = require('../config');
const auth = jwt({ secret });

router.get('/', find);        // http://localhost:3000/articles/
router.get('/:id', findById);
router.post('/', create);
router.delete('/:id', auth, del);

module.exports = router;
