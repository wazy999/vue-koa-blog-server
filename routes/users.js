const Router = require('koa-router');
const router = new Router({prefix: '/users'});

const { find, findById, create, update, delete:del, login, checkOwner } = require('../controllers/users');

const jwt = require('koa-jwt');
const {secret} = require('../config');
const auth = jwt({ secret });
// .unless({ path: [/\/register/, /\/login/] });

router.get('/', auth, find);        // http://localhost:3000/users/
router.get('/:id', findById); // http://localhost:3000/users/tom
router.post('/', auth, create);     // http://localhost:3000/users
router.patch('/:id', auth, checkOwner, update); //patch部分更新 替换 put整体更新
router.delete('/:id', auth, checkOwner, del);
router.post('/login', login);

module.exports = router;
