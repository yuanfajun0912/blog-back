const express = require('express')
const app = express()
const { Users, Articles, Tags, Categories, leaveMessages } = require('./mongodb')
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
/*
  文章相关
*/
Categories.find({ id: { $gt: 0 } }).sort({ id: -1 })  //自增长id
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
  var articles = await Articles.find()       
  articles.push('manager') 
  if(req.user.userName === '111') {  //拿到的用户名是111，说明就是游客
    articles.splice(articles.length-1, 1, 'visitor')
    return res.send(articles)
  }
  res.send(articles)
})
app.get('/articlesList/:id', async (req, res) => {  //获取一篇文章
  const article = await Articles.findOne({ id: req.params.id})
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
  留言相关
*/
app.get('/leaveMessages', async (req, res) => {
  const messages = await leaveMessages.find()
  res.send(messages)
})
app.post('/leaveMessages', async (req, res) => {
  await leaveMessages.insertMany(req.body)                                                                                                                                             
  res.send('成功添加')
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