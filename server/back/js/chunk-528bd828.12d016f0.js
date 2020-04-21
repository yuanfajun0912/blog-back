(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-528bd828"],{ab7c:function(t,e,a){"use strict";var i=a("ebd0"),s=a.n(i);s.a},b07f:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{ref:"article",attrs:{model:t.article,"label-width":"80px"},nativeOn:{submit:function(e){return e.preventDefault(),t.updateArticle(e)}}},[a("el-form-item",{attrs:{label:"标题"}},[a("el-input",{attrs:{placeholder:"请填写标题",clearable:""},model:{value:t.article.title,callback:function(e){t.$set(t.article,"title",e)},expression:"article.title"}})],1),a("el-form-item",{attrs:{label:"描述"}},[a("el-input",{attrs:{placeholder:"请输入文章描述",type:"textarea",autosize:{minRows:3,maxRows:6}},model:{value:t.article.discription,callback:function(e){t.$set(t.article,"discription",e)},expression:"article.discription"}})],1),a("el-form-item",{attrs:{label:"顶部图"}},[a("el-input",{attrs:{placeholder:"请填写顶部图的外部链接",clearable:""},model:{value:t.article.topicImage,callback:function(e){t.$set(t.article,"topicImage",e)},expression:"article.topicImage"}}),a("el-image",{attrs:{src:t.article.topicImage,"preview-src-list":t.previewImage,fit:"cover"}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("el-image",{attrs:{src:t.article.topicImage,lazy:!0,fit:"cover","preview-src-list":t.previewImage}})],1)]),a("span",[t._v(" (点击图片可预览)")])],1),a("el-form-item",{staticClass:"tagsContainer",attrs:{label:"标签"}},t._l(t.article.selectTags,(function(e,i){return a("el-tag",{key:i,staticClass:"tag",attrs:{closable:"",color:t.getTagColor(e.i),"disable-transitions":!0},on:{close:function(e){return t.removeTag(i)}}},[t._v(t._s(e.tagName)+" ")])})),1),a("el-form-item",{staticClass:"tagsContainer",attrs:{label:""}},[a("el-tag",{staticClass:"tagControl tC-1",attrs:{effect:"dark"},on:{click:function(e){return t.selectAllTags()}}},[t._v("全选标签")]),a("el-tag",{staticClass:"tagControl tC-2",attrs:{effect:"dark"},on:{click:function(e){return t.removeAllTags()}}},[t._v("取消已选")]),a("el-tag",{staticClass:"tagControl tC-3",attrs:{effect:"dark"},on:{click:function(e){return t.reverseTags()}}},[t._v("标签倒序")]),a("br"),t._l(t.tags,(function(e,i){return a("el-tag",{key:i,staticClass:"tag",attrs:{color:t.getTagColor(i)},on:{click:function(a){return t.selectTag(e,i)}}},[t._v(t._s(e))])}))],2),a("el-form-item",{staticClass:"formButton"},[a("span",[t._v("（提交之前请先点击下方的保存按钮）")]),a("el-button",{staticClass:"submitBtn",attrs:{type:"primary","native-type":"submit"}},[t._v("更新文章")]),a("el-button",{on:{click:t.cancelUpdate}},[t._v("取消")])],1)],1),a("mavon-editor",{attrs:{fontSize:"18px"},on:{save:t.getHtml},model:{value:t.article.value,callback:function(e){t.$set(t.article,"value",e)},expression:"article.value"}})],1)},s=[],c=(a("c740"),a("4160"),a("d81d"),a("a434"),a("159b"),a("90b9")),r={name:"ArticlesEdit",data:function(){return{article:{title:"",selectTags:[],time:"",value:"",discription:"",topicImage:""},tags:[],body:"",value:""}},computed:{previewImage:function(){var t=[];return t.push(this.article.topicImage),t}},methods:{getTags:function(){var t=this;this.$http.get("/tagsList").then((function(e){t.tags=e.data.map((function(t){return t.tagName}))}))},getEditPageDate:function(){var t=this,e=this.$store.state.editArticleId;this.$http.get("articlesList/".concat(e)).then((function(e){t.article=e.data}))},cancelUpdate:function(){var t=this;this.$confirm("您已修改的内容将不会保存，并且返回文章列表页面","提示",{cancelButtonText:"取消",confirmButtonText:"确定",type:"warning"}).then((function(){t.$message("取消编辑"),t.$router.push("/articles/list"),t.article={title:"",selectTags:[],time:"",value:""},t.body=""})).catch((function(){}))},updateArticle:function(){var t=this;if("visitor"===this.$store.state.user)return this.$message({message:"游客身份禁止操作",type:"error"});var e=this.$store.state.editArticleId;this.$confirm("您是否已经保存了内容？未保存请点击取消去保存，已经保存请点击确定","提示",{cancelButtonText:"取消",confirmButtonText:"确定",type:"warning"}).then((function(){t.$http.put("articlesList/".concat(e),t.article).then((function(){t.$message({message:"更新文章成功",type:"success"}),t.$router.push("/articles/list")}))})).catch((function(){t.$message({type:"info",message:"已取消"})}))},getTagColor:function(t){return Object(c["b"])(t)},selectTag:function(t,e){if(this.article.selectTags.length&&this.article.selectTags.findIndex((function(e){return e.tagName===t}))>-1)return this.$message({message:"该标签已存在，请勿重复添加",type:"warning"});this.article.selectTags.push({tagName:t,i:e})},removeTag:function(t){this.article.selectTags.splice(t,1)},selectAllTags:function(){var t=this;this.tags.forEach((function(e,a){-1===t.article.selectTags.findIndex((function(t){return t.tagName===e}))&&t.article.selectTags.push({tagName:e,i:a})}))},removeAllTags:function(){this.article.selectTags=[]},reverseTags:function(){this.article.selectTags.reverse()},getHtml:function(t,e){var a=this;this.$confirm("此操作将替换掉原有的文本内容，是否继续？","提示",{cancelButtonText:"取消",confirmButtonText:"确定",type:"warning"}).then((function(){a.body=e,a.$message({type:"success",message:"已保存"})})).catch((function(){a.$message({type:"info",message:"已取消保存"})}))}},created:function(){this.getEditPageDate(),this.getTags()}},n=r,l=(a("ab7c"),a("2877")),o=Object(l["a"])(n,i,s,!1,null,"5cbd6102",null);e["default"]=o.exports},ebd0:function(t,e,a){}}]);
//# sourceMappingURL=chunk-528bd828.12d016f0.js.map