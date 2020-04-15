const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/BlogBack', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}) 

// //自增长id 
// let counter = 1; 
// let CountedId = {type: Number, default: () => counter++};  

//用户
const Users = mongoose.model('Users', new mongoose.Schema({
  userName: { type: String, default: '' },
  password: { type: String, default: '' }
}))
//发表评论的游客
const Visitors = mongoose.model('Visitors', new mongoose.Schema({
  name: { type: String, default: '' }
}))
//文章
const Articles = mongoose.model('Articles', new mongoose.Schema({
  title: { type: String, default: '' },
  // body: { type: String, default: '' },
  selectTags: { type: Array, default: [] },
  time: { type: String, default: '' },
  value: { type: String, default: '' },  //markdown解析成html以前的内容
  discription: { type: String, default: '' },  //文章描述
  topicImage: { type: String, default: '' },  //文章顶部图片/缩略图
  views: { type: Number, default: 0 },  //浏览量
  like: { type: Number, default: 0 },  //喜欢
  comments: { type: Array, default: [] }  //评论
}))
//置顶文章
const TopicArticles = mongoose.model('TopicArticles', new mongoose.Schema({
  articleId: { type: String, default: '' },
  articleTitle: { type: String, default: '' }
}))
//标签
const Tags = mongoose.model('Tags', new mongoose.Schema({
  tagName: { type: String, default: '' },
  selectArticles: { type: Array, default: [] }
}))
//留言
const LeaveMessages = mongoose.model('leaveMessages', new mongoose.Schema({
  nickName: { type: String, default: '' },
  body: { type: String, default: '' },
  time: { type: String, default: '' },
  reply: { type: String, default: '' },
  loginNum: { type: Number, default: 0 },
  commentId: { type: Number, default: 0 }
}))
//时间线
const Timeline = mongoose.model('Timeline', new mongoose.Schema({
  title: { type: String, default: '' },
  body: { type: String, default: ''},
  time: { type: String, default: '' }
}))

//分类
const Categories = mongoose.model('Categories', new mongoose.Schema({
  cgName: { type: String, default: '' },
  // id: CountedId
}))

module.exports = { Users, Visitors, Articles, TopicArticles, Tags, Timeline, Categories, LeaveMessages }