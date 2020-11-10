# vue-koa-blog-server

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn dev
```


## 功能

提供读写MongoDB数据库的API：

(1) 分页查询文章：
http://localhost:5000/articles
POST
{
	"pageNo": 1,
	"pageSize": 10
}

(2) 查询所有文章：
http://localhost:5000/articles
GET

(3) 文章详情接口：
http://localhost:5000/articles/article?id=5f63ab9c375f032e745ce107
GET

