const Article = require('../models/articles');
var ObjectID = require("mongodb").ObjectID;

class ArticlesCtl{
    async findAll(ctx){
        // ctx.body = await Article.find();
        let arr1 = await Article.find();
        ctx.body = {
            success: true,
            data: {
                totalCount: arr1.length,
                list: arr1
            }
        };
    }
    async find(ctx){
        const {pageNo, pageSize} = ctx.request.body;
        // ctx.body = await Article.find().limit(pageSize).skip(pageNo-1);
        let arr1 = await Article.find();
        let arr2 = await Article.find().limit(pageSize).skip(pageNo-1);
        ctx.body = {
            success: true,
            data: {
                totalCount: arr1.length,
                list: arr2
            }
        };
    }
    async findById(ctx){
        // 验证是否是 ObjectId (_id)
        if (ObjectID.isValid(ctx.query.id)) {
            const article = await Article.findById(ctx.query.id); // ctx.params.id?
            // ctx.body = article;
            ctx.body = {
                success: true,
                data: article
            };
        }
        else {
            ctx.throw(404, '文章不存在');
        }
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
    async search(ctx){
        const {keyword} = ctx.request.body;
        const article = await Article.find({"title": {$regex: keyword, $options:'i'} });
        ctx.body = {
            success: true,
            data: article
        };
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
