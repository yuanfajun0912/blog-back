const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/BlogBack', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}) 

//自增长id
let counter = 1; 
let CountedId = {type: Number, default: () => counter++};  

//用户
const Users = mongoose.model('Users', new mongoose.Schema({
  userName: { type: String },
  password: { type: String }
}))
//文章
const Articles = mongoose.model('Articles', new mongoose.Schema({
  id: CountedId,  //自增长id
  title: { type: String },
  body: { type: String },
  selectTags: { type: Array },
  time: { type: String },
  value: { type: String },  //markdown解析成html以前的内容
  discription: { type: String },  //文章描述
  topicImage: { type: String },  //文章顶部图片/缩略图
  views: { type: Number, default: 0 },  //浏览量
  like: { type: Number, default: 0 },  //喜欢
  comments: { type: Array }  //评论
}))
//标签
const Tags = mongoose.model('Tags', new mongoose.Schema({
  tagName: { type: String }
}))
//留言
const leaveMessages = mongoose.model('leaveMessages', new mongoose.Schema({
  nickName: { type: String },
  body: { type: String },
  time: { type: String },
}))

//分类
const Categories = mongoose.model('Categories', new mongoose.Schema({
  cgName: { type: String },
  id: CountedId
}))

module.exports = { Users, Articles, Tags, Categories, leaveMessages }