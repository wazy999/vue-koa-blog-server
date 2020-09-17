const jwt = require('jsonwebtoken');
const {secret} = require('../config');
const Article = require('../models/articles');

class ArticlesCtl{
    async find(ctx){
        ctx.body = await Article.find();
    }
    async findById(ctx){
        const article = await Article.findById(ctx.params.id);
        if(!article) { ctx.throw(404, '文章不存在')};
        ctx.body = article;
    }
    async create(ctx){
        ctx.verifyParams({
          title: { type: 'string', required: true},
          id: { type: 'number', required: true},
          body_html: { type: 'string', required: true},
          body_markdown: { type: 'string', required: true}
        })
        // 添加重复文章时报错
        const {id} = ctx.request.body;
        const repeatedArticle = await Article.findOne({id});
        if(repeatedArticle){ ctx.throw(409, '文章已持久化') }; // 409 Conflict
        const article = await new Article(ctx.request.body).save();
        ctx.body = article;
    }
}
module.exports = new ArticlesCtl();    //对象
