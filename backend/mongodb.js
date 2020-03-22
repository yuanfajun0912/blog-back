const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/BlogBack', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
//用户
const Users = mongoose.model('Users', new mongoose.Schema({
  userName: { type: String },
  password: { type: String }
}))
//文章
const Articles = mongoose.model('Articles', new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  currentCg: { type: String },
  selectTags: { type: Array },
  time: { type: String },
  value: { type: String }
}))
//标签
const Tags = mongoose.model('Tags', new mongoose.Schema({
  tagName: { type: String }
}))
//分类
const Categories = mongoose.model('Categories', new mongoose.Schema({
  cgName: { type: String }
}))

module.exports = { Users, Articles, Tags, Categories }