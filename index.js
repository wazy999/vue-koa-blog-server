var Koa = require('koa');
var app = new Koa();

const path = require('path');

// 上传图片
const koaBody = require('koa-body');
app.use(koaBody({
  // 启用文件
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true,
  },
}));

// 生成图片链接
const koaStatic = require('koa-static');
app.use(koaStatic(path.join(__dirname, 'public')));

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db_blog', { useNewUrlParser: true, useUnifiedTopology: true }, ()=> console.log('MongoDB连接成功！'))
mongoose.connection.on('error', console.error);
mongoose.set('useFindAndModify', false)

// 校验参数
// controllers/users.js create(ctx){}
const parameter = require('koa-parameter');
app.use(parameter(app));


const cors = require('@koa/cors');
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/cors') {
      return '*';
    }
    return '*';
    // return 'http://localhost:8080';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  keepHeadersOnError: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));


// 路由
const routing = require('./routes');
routing(app);

app.listen(3000, () => console.log("Listening on 3000. Vue-koa-blog-server"));
