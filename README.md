## 介绍

基于 vue + node.js 的博客后台管理系统，由于自己还没做前台，所以很多功能现在都还没做完，后续会持续更新，2333 ~~

## 技术栈

#### 前端

vue全家桶（vue.js、vue-x、vue-router）、element-ui、axios、mavon-editor（markdown编辑器）

#### 后端

node.js（express）、cors（允许跨域）、jsonwebtoken（token）

#### 数据库

mongodb、mongoose（管理工具）、robo3t（可视化）

## 预览

文章列表

![文章列表.PNG](https://i.loli.net/2020/04/02/fTkneBUZNHq95PS.png)

新建/编辑文章

![articlesEdit1.PNG](https://i.loli.net/2020/03/30/voDH871fWq2NCgF.png)
![articlesEdit2.PNG](https://i.loli.net/2020/03/30/Q9OusCFin1pfWGj.png)

标签管理

![tagsmanage.PNG](https://i.loli.net/2020/03/22/f4AWFhik9uCI6Z2.png)

用户管理

![usermanage.PNG](https://i.loli.net/2020/03/22/pt12hbVWIqKQNAJ.png)

文章评论管理/留言管理

![评论.PNG](https://i.loli.net/2020/04/02/QyovYJTK54GFaUV.png)

## 已完成

- [x] 用户切换
- [x] 文章列表显示
- [x] 文章的浏览量/喜欢/评论量记录
- [x] 新建文章
- [x] 编辑文章
- [x] 删除文章
- [x] 标签管理（新建、删除）
- [x] 文章评论管理
- [x] 留言管理

## 未完成

主要是因为前台还没做，所以很多功能还没做

- [ ] 登录日志
- [ ] 博客主题管理
- [ ] 实时预览

## 细节说明

- 前后端分别放在两个文件夹下面
- 因为该博客后台服务对象只是自己，所以暂未打算添加注册用户功能
- 游客身份下，新建、编辑、删除等一系列功能都无法操作