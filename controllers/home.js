class HomeCtl{
    index(ctx){
        ctx.body = '<h1>这是主页</h1><p>vue-koa-blog-server</p>';
    }
}
module.exports = new HomeCtl();
