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
    async delete(ctx){
        const article = await Article.findOneAndDelete({id: ctx.params.id});
        // const article = await Article.findByIdAndRemove(ctx.params.id);
        if(!article){ctx.throw(404, '文章不存在');}
        ctx.status = 204;
    }
    // // 授权
    // async checkOwner(ctx, next){
    //     console.log("ctx.state.user._id")
    //     console.log(ctx.state)
    //     console.log(ctx.state.user._id)
    //     if(ctx.params.id !== ctx.state.user._id){
    //         ctx.throw(403, '没有权限');
    //     }
    //     await next();
    // }
}
module.exports = new ArticlesCtl();    //对象
