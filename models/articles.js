const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const articleSchema = new Schema({
  title: {type: String, required: true},
  id: {type: Number, required: true},  //, select: false
  body_html: {type: String, required: true},
  body_markdown: {type: String, required: true},
  book_id: {type: Number},
  comments_count: {type: Number},
  content_updated_at: {type: String},
  cover: {type: String},
  creator: {type: Object},
  created_at: {type: String},
  custom_description: {type: String},
  description: {type: String},
  first_published_at: {type: String},
  format: {type: String},
  hits: {type: Number},
  likes_count: {type: Number},
  public: {type: Number},
  published_at: {type: String},
  read_status: {type: Number},
  slug: {type: String},
  status: {type: Number},
  updated_at: {type: String},
  user_id: {type: Number},
  view_status: {type: Number},
  word_count: {type: Number}
})
module.exports = model('Article', articleSchema);  //导出模型
