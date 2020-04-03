const express = require('express')
const app = express()
const { Users, Visitors, Articles, Tags, Timeline, Categories, LeaveMessages } = require('./mongodb')
app.use(require('cors')())  //允许跨域
app.use(express.json())  //允许处理json数据
const jwt = require('jsonwebtoken') //token的包
const SECRET = 'F651AF1A6VA1C6AC65A1' //密钥


/*
  用户相关
*/
app.post('/login', async (req, res) => {  //登录
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
app.post('/visitors', async (req, res) => {
  await Visitors.insertMany(req.body)
  res.send('111')
})
/*
  文章相关
*/
Articles.find({ id: { $gt: 0 } }).sort({ id: -1 })  //自增长id
.then(([first, ...others]) => {
    if (first)
        counter = first.id + 1;
});
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

app.get('/articlesList', authentic, async (req, res) => {  //获取文章列表
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
app.get('/articlesList/:id', async (req, res) => {  //获取一篇文章
  const article = await Articles.findOne({ id: req.params.id })
  res.send(article)
})
app.post('/articlesList', async (req, res) => {  //增加一篇文章
  await Articles.create(req.body)
  res.send('成功增加一篇文章')
})
app.put('/articlesList/:id', async (req, res) => {  //更新一篇文章
  //{ new: true }使得返回的article是修改后的值
  const article = await Articles.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
  res.send(article)
})
app.delete('/articlesList/:id', async (req, res) => {  //删除一篇文章 
  await Articles.findOneAndDelete({ id: req.params.id })
  res.send('成功删除')
})

/*
  评论相关
*/

app.get('/articleComments/:id', async (req, res) => {  //获取一篇文章的评论
  const article = await Articles.findOne({ id: req.params.id })
  let comment = article.comments
  comment.reverse()
  if(req.query.page) {  //前端传入了page则做分页处理，不传就不做分页处理
    const page = req.query.page  //拿到传入的page,要用query拿
    comment = comment.slice((page-1)*20, page*20)  //分页处理 
  }
  comment = comment.map((item, index) => {  //给每一个评论加个commentId，便于操作
    item.commentId = index 
    return item
  })
  comment.push(article.title)  //把文章标题页传出去
  res.send(comment)
})
app.put('/articleComments/:id', async (req, res) => {  //更新评论（回复/删除）
  let article = await Articles.findOne({ id: req.params.id })
  req.body.reverse()  //拿的时候对评论反序了的，那么更新评论的时候要掰过来
  article.comments = req.body
  await article.save()  //将改动保存到数据库中
  res.send('更新成功')
})
app.post('/articleComments/:id', async (req, res) => {  //向一篇文章增加一个评论
  let article = await Articles.findOne({ id: req.params.id })
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
  article.comments.push(req.body)  //将评论加进文章评论
  await article.save()  //保存改动
  //评论的昵称在visitors中没有就不添加，有就添加
  if(visitors.findIndex(item => item.name === req.body.nickName) === -1) {
    await Visitors.insertMany({ name: req.body.nickName })
  } 
  res.send(req.body.loginNum) 
})

/*
  留言相关
*/
app.get('/leaveMessages', async (req, res) => {  //获得所有留言
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
app.put('/leaveMessages', async (req, res) => {  //更新留言（回复/删除）
  req.body.reverse()  //拿的时候对留言反序了的，那么更新留言的时候要掰过来
  await LeaveMessages.remove()
  await LeaveMessages.insertMany(req.body)
  res.send('更新成功')
})
app.post('/leaveMessages', async (req, res) => {  //增加留言
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
  //评论的昵称在visitors中没有就不添加，有就添加
  if(visitors.findIndex(item => item.name === req.body.nickName) === -1) {
    await Visitors.insertMany({ name: req.body.nickName })
  } 
  res.send(req.body.loginNum) 
})

/**
 * 时间线相关 
 */
app.get('/timeline', async (req, res) => {
  const things = await Timeline.find()
  things.reverse()
  res.send(things)
})
app.put('/timeline/:id', async (req, res) => {  //编辑
  const thing = await Timeline.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.send(thing)
}) 
app.delete('/timeline/:id', async (req, res) => {  //删除
  await Timeline.findByIdAndDelete(req.params.id)
  res.send('成功删除')
})
app.post('/timeline', async (req, res) => {  //增加时间线
  await Timeline.create(req.body)
  res.send('成功添加')
})

/*
  标签相关
*/
app.get('/tagsList', async (req, res) => {  //获取所有标签
  const tags = await Tags.find()
  res.send(tags)
})
app.post('/tagsList', async (req, res) => {  //新增标签
  await Tags.insertMany(req.body)            //需要是个数组
  res.send('成功添加')                        //数组里面每一项是对象 
})
app.delete('/tagsList/:id', async (req, res) => {  //删除一个标签
  await Tags.findByIdAndDelete(req.params.id)
  res.send('成功删除')
})
app.put('/tagsList/:id', async (req, res) => {  //修改一个标签
  const tag = await Tags.findByIdAndUpdate(req.params.id, req.body)
  res.send(tag)
})


/*
  分类相关
*/
Categories.find({ id: { $gt: 0 } }).sort({ id: -1 }) 
.then(([first, ...others]) => {
    if (first)
        counter = first.id + 1;
});
app.get('/categoriesList', async (req, res) => {  //获取所有分类
  const categories = await Categories.find()
  res.send(categories)
})
app.post('/categoriesList', async (req, res) => {  //新增分类
  await Categories.insertMany(req.body)            //需要是个数组
  res.send('成功添加')                              //数组里面每一项是对象
})
app.delete('/categoriesList/:id', async (req, res) => {  //删除一个标签
  await Categories.findByIdAndDelete(req.params.id)
  res.send('成功删除')
})
app.put('/categoriesList/:id', async (req, res) => {  //修改一个分类
  const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body)
  res.send(categorie)
})
app.get('/categoriesList/delete', async (req, res) => {  //删除所有分类
  await Categorie.deleteMany()                       //（风险太大，最好别用） 
  res.send('成功删除')
})


app.listen(3000, () => {
  console.log('服务器已启动 http://localhost:3000')
})