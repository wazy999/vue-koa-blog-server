const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const articleSchema = new Schema({
  title: {type: String, required: true},
  id: {type: Number, required: true},  //, select: false
  body_html: {type: String, required: true},
  body_markdown: {type: String, required: true}
})
module.exports = model('Article', articleSchema);  //导出模型
