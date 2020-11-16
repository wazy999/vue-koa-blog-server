const Router = require('koa-router');
const router = new Router({prefix: '/articles'});

const { findAll, find, findById, create, search, delete:del } = require('../controllers/articles');

const jwt = require('koa-jwt');
const {secret} = require('../config');
const auth = jwt({ secret });

router.get('/', findAll);        // http://localhost:5000/articles/
router.post('/', find);        // http://localhost:5000/articles/
// router.get('/:id', findById);	// Article.findById(ctx.params.id);
router.get('/article', findById); // Article.findById(ctx.query.id);  http://localhost:5000/articles/article?id=5f63ab9c375f032e745ce107
router.post('/new', create);			// http://localhost:5000/articles/new
router.post('/search', search);			// http://localhost:5000/articles/search
router.delete('/:id', auth, del);

module.exports = router;
