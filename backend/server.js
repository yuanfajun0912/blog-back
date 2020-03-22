const express = require('express')
const app = express()
const { Users, Articles, Tags, Categories } = require('./mongodb')
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
const authentic = async (req, res, next) => {  //验证token的中间件
  try {
    const token = req.headers.authorization.split(' ').pop()
    var { id } = jwt.verify(token, SECRET)  //解析token拿到用户的id
  } catch(err) {
    req.errmessage = '请重新登陆'
  }
  req.user = await Users.findById(id)
  next()
}
app.get('/articlesList', authentic, async (req, res) => {  //获取文章列表
  var articles = await Articles.find()
  articles.push('manager')
  if(req.user.userName === '111') {
    articles.splice(articles.length-1, 1, 'visitor')
    return res.send(articles)
  }
  res.send(articles)
})
app.get('/articlesList/:id', async (req, res) => {  //获取一篇文章
  const article = await Articles.findById(req.params.id)
  res.send(article)
})
app.post('/articlesList', async (req, res) => {  //增加一篇文章
  await Articles.create(req.body)
  res.send('成功增加一篇文章')
})
app.put('/articlesList/:id', async (req, res) => {  //更新一篇文章
  const article = await Articles.findByIdAndUpdate(req.params.id, req.body)  //找到并更新数据
  res.send(article)
})
app.delete('/articlesList/:id', async (req, res) => {  //删除一篇文章
  await Articles.findByIdAndDelete(req.params.id)
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
  分类相关
*/
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