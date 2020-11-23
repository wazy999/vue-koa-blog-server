const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const statisticalSchema = new Schema({
  UV:{type: Number, required: true},
  PV:{type: Number, required: true},
  date: {type: Date},
  pageType:{type: String},
  pageId:{type: String}
})
module.exports = model('statistical', statisticalSchema);  //导出模型
