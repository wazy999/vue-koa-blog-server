<!--
 * @Description: 
 * @Author: fanghaoji
 * @Date: 2020-09-17 00:16:00
 * @LastEditTime: 2020-11-16 23:04:37
 * @FilePath: \vue-koa-blog-server\README.md
-->
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

```javascript
{
	"pageNo": 1,
	"pageSize": 10
}
```

(2) 文章详情接口：
http://localhost:5000/articles/article?id=5f63ab9c375f032e745ce107

GET


(3) 根据标题关键词搜索文章：
http://localhost:5000/articles/search

POST

```javascript
{
	"keyword": "项目"
}
```



