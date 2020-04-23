const express = require('express')
const app = express()
const { Users, Visitors, Articles, TopicArticles, Tags, Timeline, About, LeaveMessages, FriendshipLinks } = require('./mongodb')

app.use(require('cors')())  //允许跨域
app.use(express.json())  //允许处理json数据
// app.use('/', express.static(__dirname + '/front'))  //前台
// app.use('/back', express.static(__dirname + '/back'))  //后台

const jwt = require('jsonwebtoken') //token的包
const SECRET = 'F651AF1A6VA1C6AC65A1' //密钥


/*
  用户相关
*/
app.post('/api/login', async (req, res) => {  //登录 
  const user = await Users.findOne({
    userName: req.body.userName
  })
  if(!user) return res.send( { status: 201 } )  //用户不存在
  const isPasswordTrue = (user.password === req.body.password) ? true : false
  if(!isPasswordTrue) return res.send( { status: 202 } )  //密码错误
  const token = jwt.sign({  //签名生成token
    id: user._id
  }, SECRET)
  res.send({
    user,
    token
  })
})
//游客
app.post('/api/visitors', async (req, res) => {
  await Visitors.insertMany(req.body)
  res.send('111')
})
/*
  文章相关
*/
// Articles.find({ id: { $gt: 0 } }).sort({ id: -1 })  //自增长id
// .then(([first, ...others]) => {
//   if (first)
//     counter = first.id + 1;
// });
const authentic = async (req, res, next) => {  //验证token的中间件
  try {
    const token = req.headers.authorization.split(' ').pop()
    var { id } = jwt.verify(token, SECRET)  //解析token拿到用户的id
  } catch(err) {
    req.errmessage = '请重新登陆'
  }
  req.user = await Users.findById(id)  //拿到token对应的用户并且传下去
  next()
}

app.get('/api/articlesList', authentic, async (req, res) => {  //获取文章列表（后台专用）
  var articles = await (await Articles.find()).reverse()  //反序
  const total = articles.length
  const page = req.query.page  //拿到传入的page,要用query拿
  articles = articles.slice((page-1)*10, page*10)  //分页处理 
  articles.push(total)  //传出文章总数
  articles.push('manager') 
  if(req.user.userName === '111' || null) {  //拿到的用户名是111，说明就是游客 
    articles.splice(articles.length-1, 1, 'visitor')
    return res.send(articles)
  }
  res.send(articles)
})
app.get('/api/articles', async (req, res) => {  //获取文章列表（前台/后台置顶文章管理专用）
  var articles = await (await Articles.find()).reverse()  //反序
  const topicArticlesId = await TopicArticles.find()
  const total = articles.length
  const page = req.query.page  //拿到传入的page,要用query拿
  if(page > 0) {  //前台
    const topicArticles = topicArticlesId.map(item => {
      for(let i of articles) {
        if(item.articleTitle == i.title) {
          return i
        }
      }
    })
    articles = articles.slice((page-1)*10, page*10)  //分页处理 
    articles.push(total)  //传出文章总数 
    articles.push(topicArticles)  //传出置顶文章
    res.send(articles)
    return
  }
  //后台文章管理
  articles.push(total)  //传出文章总数 
  articles.push(topicArticlesId)  //传出置顶文章id
  res.send(articles)
})
app.get('/api/articlesList/:id', async (req, res) => {  //获取一篇文章
  const article = await Articles.findById(req.params.id)
  article.views++  //浏览量+1
  article.save()
  res.send(article)
})
app.post('/api/articlesList', async (req, res) => {  //增加一篇文章
  const article = await Articles.create(req.body)
  const selectTags = article.selectTags
  selectTags.forEach(async item => { //将这篇文章的_id加到它的selectTags中去
    const tag = await Tags.findOne({ tagName: item.tagName })
    tag.selectArticles.push(article._id)
    await tag.save()
  })
  res.send('成功增加一篇文章')
})
app.put('/api/articlesList/:id', async (req, res) => {  //更新一篇文章
  const oldArticle = await Articles.findById(req.params.id)
  const oldSelectTags = oldArticle.selectTags
  //{ new: true }使得返回的article是修改后的值
  const article = await Articles.findByIdAndUpdate(req.params.id, req.body, { new: true })
  const newSelectTags = article.selectTags
  const deleteTags = oldSelectTags.filter(item => {  //该文章删除了的标签
    const tagName = item.tagName
    let isDeleteTag = true
    for(let i of newSelectTags) {
      if(tagName === i.tagName) {
        isDeleteTag = false
      }
    }
    return isDeleteTag
  })
  const addTags = newSelectTags.filter(item => {  //该文章添加的标签
    const tagName = item.tagName
    let isAddTag = true
    for(let i of oldSelectTags) {
      if(tagName === i.tagName) {
        isAddTag = false
      }
    }
    return isAddTag
  })
  deleteTags.forEach(async (item) => {  //该文章的_id从tag的selectArticls中删除
    let tag = await Tags.findOne({ tagName: item.tagName })
    const newSA = tag.selectArticles.filter(i => i != req.params.id)
    tag.selectArticles = newSA
    await tag.save()
  })
  addTags.forEach(async (item) => {  //将该文章_id加入tag的selectArticls
    const tag = await Tags.findOne({ tagName: item.tagName })
    tag.selectArticles.push(req.params.id)
    await tag.save()
  })
  res.send(article)
})
app.put('/api/articlesList/:id/like', async (req, res) => {  //喜欢一篇文章
  let article = await Articles.findById(req.params.id)
  article.like++
  await article.save()
  res.send(article.like)
})
app.delete('/api/articlesList/:id', async (req, res) => {  //删除一篇文章 
  const article = await Articles.findById(req.params.id)
  await Articles.findByIdAndDelete(req.params.id)
  let tags = article.selectTags
  tags.forEach(async item => {  //将该文章的_id从其选中的标签删除
    const tag = await Tags.findOne({ tagName: item.tagName })
    const newSA = tag.selectArticles.filter(i => i != req.params.id)
    tag.selectArticles = newSA
    await tag.save()
  })
  res.send('成功删除')
})
app.post('/api/topicArticles', async (req, res) => {  //更新置顶文章
  await TopicArticles.remove()
  await TopicArticles.insertMany(req.body)
  res.send('更新成功')
})

/*
  评论相关
*/

app.get('/api/articleComments/:id', async (req, res) => {  //获取一篇文章的评论
  const article = await Articles.findById(req.params.id)
  let comment = article.comments
  comment.reverse()
  if(req.query.page) {  //前端传入了page则做分页处理，不传就不做分页处理
    const page = req.query.page  //拿到传入的page,要用query拿
    comment = comment.slice((page-1)*10, page*10)  //分页处理 
  }
  comment = comment.map((item, index) => {  //给每一个评论加个commentId，便于操作
    item.commentId = index 
    return item
  })
  comment.push(article.title)  //把文章标题页传出去
  res.send(comment)
})
app.put('/api/articleComments/:id', async (req, res) => {  //更新评论（回复/删除）
  let article = await Articles.findById(req.params.id)
  req.body.reverse()  //拿的时候对评论反序了的，那么更新评论的时候要掰过来
  article.comments = req.body
  await article.save()  //将改动保存到数据库中
  res.send('更新成功')
})
app.post('/api/articleComments/:id', async (req, res) => {  //向一篇文章增加一个评论
  let article = await Articles.findById(req.params.id)
  let visitors = await Visitors.find()
  const isRepeat = visitors.some(visitor => {  //检验昵称是否第一次登录且昵称重复
    if(req.body.loginNum === 0 && visitor.name === req.body.nickName) {
      return true
    }
  })
  if(isRepeat) {
    return res.send({ //返回错误状态码401
      state: 401
    })
  }
  req.body.loginNum++
  article.comments.push(req.body)  //将评论加进文章评论
  await article.save()  //保存改动
  //评论的昵称在visitors中没有就不添加，有就添加
  if(visitors.findIndex(item => item.name === req.body.nickName) === -1) {
    await Visitors.insertMany({ name: req.body.nickName })
  } 
  article.comments.reverse()
  res.send(article.comments) 
})

/*
  留言相关
*/
app.get('/api/leaveMessages', async (req, res) => {  //获得所有留言
  let leaveMessages = await LeaveMessages.find()
  leaveMessages.reverse() 
  if(req.query.page) {  //前端传入了page则做分页处理，不传就不做分页处理
    const page = req.query.page  //拿到传入的page,要用query拿
    leaveMessages = leaveMessages.slice((page-1)*20, page*20)  //分页处理 
  }
  leaveMessages = leaveMessages.map((item, index) => {  //给每一个评论加个leaveMessagesId，便于操作
    item.commentId = index
    return item
  })
  res.send(leaveMessages)
})
app.put('/api/leaveMessages', async (req, res) => {  //更新留言（回复/删除）
  req.body.reverse()  //拿的时候对留言反序了的，那么更新留言的时候要掰过来
  await LeaveMessages.remove()
  await LeaveMessages.insertMany(req.body)
  res.send('更新成功')
})
app.post('/api/leaveMessages', async (req, res) => {  //增加留言
  let visitors = await Visitors.find()
  const isRepeat = visitors.some(visitor => {  //检验昵称是否第一次登录且昵称重复
    if(req.body.loginNum === 0 && visitor.name === req.body.nickName) {
      return true
    }
  })
  if(isRepeat) {
    return res.send('昵称重复，请选择其他昵称')
  }
  req.body.loginNum++
  await LeaveMessages.insertMany(req.body)
  let messages = await LeaveMessages.find()
  //评论的昵称在visitors中没有就不添加，有就添加
  if(visitors.findIndex(item => item.name === req.body.nickName) === -1) {
    await Visitors.insertMany({ name: req.body.nickName })
  } 
  messages.reverse()
  res.send(messages) 
})

/**
 * 时间线相关 
 */
app.get('/api/timeline', async (req, res) => {
  const things = await Timeline.find()
  things.reverse()
  res.send(things)
})
app.put('/api/timeline/:id', async (req, res) => {  //编辑
  const thing = await Timeline.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.send(thing)
}) 
app.delete('/api/timeline/:id', async (req, res) => {  //删除
  await Timeline.findByIdAndDelete(req.params.id)
  res.send('成功删除')
})
app.post('/api/timeline', async (req, res) => {  //增加时间线
  await Timeline.create(req.body)
  res.send('成功添加')
})

/*
  标签相关
*/
app.get('/api/tagsList', async (req, res) => {  //获取所有标签
  const tags = await Tags.find()
  res.send(tags)
})
app.post('/api/tagsList', async (req, res) => {  //新增标签
  await Tags.insertMany(req.body)            //需要是个数组
  res.send('成功添加')                        //数组里面每一项是对象 
})
app.delete('/api/tagsList/:id', async (req, res) => {  //删除一个标签
  await Tags.findByIdAndDelete(req.params.id)
  res.send('成功删除')
})
/**
 * tag: 一个标签
 * name: 这个标签的名字
 * articles: 所有文章
 * item: 一篇文章
 * tags: 这篇文章的标签
 * i: 这篇文章的其中一个标签
 * 
 * 这个只能用一次，就是强制让其变为正确的
 */
app.get('/api/tags/:id', async (req, res) => {  //确定每个标签的selectTags
  let tag = await Tags.findById(req.params.id)
  let name = tag.tagName
  const articles = await Articles.find()
  articles.forEach(item => {
    let tags = item.selectTags
    let itemHasTag = false
    for(let i of tags) {
      if(i.tagName === name) {
        itemHasTag = true
      }
    }
    if(itemHasTag) {
      tag.selectArticles.push(item._id)
    }
  })
  await tag.save()
  res.send('okok')
})
app.get('/api/tags/:id/articles', async (req, res) => {  //拿到一个标签的文章
  const tag = await Tags.findById(req.params.id)
  const selectArticlesId = tag.selectArticles
  var articles = []
  //确保等map中的所有异步操作都弄完以后再赋值给articles
  articles = await Promise.all(selectArticlesId.map(async item => {
    const article = await Articles.findById(item)
    return article
  }))
  articles = articles.reverse()
  const total = articles.length
  const page = req.query.page  //拿到传入的page,要用query拿
  articles = articles.slice((page-1)*10, page*10)  //分页处理 
  articles.push(total)  //传出文章总数 
  res.send(articles)
})

/*
  关于页面 
*/
app.get('/api/about', async (req, res) => {  //拿到数据
  const about = await About.find()
  res.send(about)
})
app.post('/api/about', async (req, res) => {  //更新
  await About.remove()
  await About.insertMany(req.body)
  res.send('ok')
})

/**
 * 友链相关
 */
app.get('/api/friendshiplinks', async (req, res) => {
  const links = await FriendshipLinks.find()
  res.send(links)
})
app.post('/api/friendshiplinks', async (req, res) => {  //编辑/删除/添加
  await FriendshipLinks.remove()
  await FriendshipLinks.insertMany(req.body)
  res.send('更新成功')
})


app.listen(3000, () => {
  console.log('服务器已启动 http://localhost:3000')
})