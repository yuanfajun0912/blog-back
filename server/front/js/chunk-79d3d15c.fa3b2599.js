(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79d3d15c"],{"385f":function(t,e,n){"use strict";var i=n("6dc2"),s=n.n(i);s.a},"6dc2":function(t,e,n){},f67a:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-timeline",{attrs:{reverse:!1}},t._l(t.things,(function(e,i){return n("el-timeline-item",{key:i,attrs:{timestamp:e.time,placement:"top",size:"large"}},[n("el-card",[n("h4",[t._v(t._s(e.title))]),n("p",{domProps:{innerHTML:t._s(e.body)}})])],1)})),1)],1)},s=[],r={name:"Timeline",data:function(){return{things:[]}},methods:{getThings:function(){var t=this;this.$http.get("timeline").then((function(e){t.things=e.data}))}},created:function(){this.getThings()}},a=r,c=(n("385f"),n("2877")),o=Object(c["a"])(a,i,s,!1,null,"06056650",null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-79d3d15c.fa3b2599.js.map