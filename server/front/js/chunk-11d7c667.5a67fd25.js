(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11d7c667"],{4798:function(t,a,e){},"60e2":function(t,a,e){"use strict";var o=e("680e"),n=e.n(o);n.a},"680e":function(t,a,e){},f820:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{class:{moon:this.$store.state.isMoon},attrs:{id:"about"}},[e("el-card",{staticClass:"body"},[e("div",{staticClass:"markdown-body",domProps:{innerHTML:t._s(t.about.body)}})]),e("el-card",{staticClass:"info"},[e("el-avatar",{attrs:{src:t.about.avatar,size:120}}),e("h3",[t._v(t._s(t.about.nickName))]),e("p",[t._v(t._s(t.about.motto))]),t.about.contactWays?e("div",{staticClass:"link-container"},[e("a",{staticStyle:{margin:"0",color:"black"},attrs:{href:t.about.contactWays[0],target:"_blank"}},[e("i",{staticClass:"iconfont icon-github"})]),e("a",{staticStyle:{margin:"0",color:"black"},attrs:{href:t.about.contactWays[1],target:"_blank"}},[e("i",{staticClass:"iconfont icon-csdnlogo"})]),e("el-popover",{attrs:{placement:"bottom",width:"150",trigger:"click",content:t.about.contactWays[2]}},[e("el-button",{staticStyle:{color:"black"},attrs:{slot:"reference",type:"text"},slot:"reference"},[e("i",{staticClass:"iconfont icon-icon-email"})])],1),e("el-popover",{attrs:{placement:"bottom",width:"150",trigger:"click",content:t.about.contactWays[3]}},[e("el-button",{staticStyle:{color:"black"},attrs:{slot:"reference",type:"text"},slot:"reference"},[e("i",{staticClass:"iconfont icon-weixin"})])],1)],1):t._e()],1)],1)},n=[],c=e("e0c1"),s=e.n(c),i=e("1487"),r=e.n(i),l=(e("4798"),e("e4cb"),{name:"About",data:function(){return{about:{}}},methods:{getAbout:function(){var t=this;this.$http.get("about").then((function(a){t.about=a.data[0]}))}},created:function(){this.getAbout()},mounted:function(){s.a.setOptions({renderer:new s.a.Renderer,highlight:function(t){return r.a.highlightAuto(t).value},pedantic:!1,gfm:!0,tables:!0,breaks:!1,sanitize:!1,smartLists:!0,smartypants:!1,xhtml:!1})}}),u=l,b=(e("60e2"),e("2877")),f=Object(b["a"])(u,o,n,!1,null,"5ecfa142",null);a["default"]=f.exports}}]);
//# sourceMappingURL=chunk-11d7c667.5a67fd25.js.map