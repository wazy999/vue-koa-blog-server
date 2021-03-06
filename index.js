var Koa = require('koa');
var app = new Koa();

const path = require('path');

// koa-body
const koaBody = require('koa-body');
app.use(koaBody({
  // 启用文件
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true,
  },
}));

// koa-static
const koaStatic = require('koa-static');
app.use(koaStatic(path.join(__dirname, 'public')));

// mongoose
const { mongo_url } = require('./config');
const mongoose = require('mongoose');
mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }, ()=> console.log('MongoDB连接成功！'))
mongoose.connection.on('error', console.error);
mongoose.set('useFindAndModify', false)

// 校验参数
// controllers/users.js create(ctx){}
const parameter = require('koa-parameter');
app.use(parameter(app));

// cors
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

app.listen(5000, () => console.log("Listening on 5000. Vue-koa-blog-server"));
