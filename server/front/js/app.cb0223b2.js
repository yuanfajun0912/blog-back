(function(e){function t(t){for(var s,o,i=t[0],c=t[1],u=t[2],h=0,l=[];h<i.length;h++)o=i[h],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&l.push(r[o][0]),r[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);f&&f(t);while(l.length)l.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],s=!0,o=1;o<n.length;o++){var i=n[o];0!==r[i]&&(s=!1)}s&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var s={},o={app:0},r={app:0},a=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-352df33a":"529eba28","chunk-4bdf717e":"19464ff9","chunk-35ae9854":"88e3c88e","chunk-45021452":"708e167d","chunk-4b795c65":"7c2dbe52","chunk-6fc43da4":"359131ce","chunk-11d7c667":"45907d6d","chunk-78ee2bf8":"cf2ccdab"}[e]+".js"}function c(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-352df33a":1,"chunk-4bdf717e":1,"chunk-35ae9854":1,"chunk-45021452":1,"chunk-4b795c65":1,"chunk-6fc43da4":1,"chunk-11d7c667":1,"chunk-78ee2bf8":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var s="css/"+({}[e]||e)+"."+{"chunk-352df33a":"f179b90b","chunk-4bdf717e":"f1799c93","chunk-35ae9854":"a447a17b","chunk-45021452":"6581beb6","chunk-4b795c65":"2619070f","chunk-6fc43da4":"d826a2d4","chunk-11d7c667":"6ea1150d","chunk-78ee2bf8":"f06ba5f0"}[e]+".css",r=c.p+s,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var u=a[i],h=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(h===s||h===r))return t()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){u=l[i],h=u.getAttribute("data-href");if(h===s||h===r)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var s=t&&t.target&&t.target.src||r,a=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=s,delete o[e],f.parentNode.removeChild(f),n(a)},f.href=r;var d=document.getElementsByTagName("head")[0];d.appendChild(f)})).then((function(){o[e]=0})));var s=r[e];if(0!==s)if(s)t.push(s[2]);else{var a=new Promise((function(t,n){s=r[e]=[t,n]}));t.push(s[2]=a);var u,h=document.createElement("script");h.charset="utf-8",h.timeout=120,c.nc&&h.setAttribute("nonce",c.nc),h.src=i(e);var l=new Error;u=function(t){h.onerror=h.onload=null,clearTimeout(f);var n=r[e];if(0!==n){if(n){var s=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+s+": "+o+")",l.name="ChunkLoadError",l.type=s,l.request=o,n[1](l)}r[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:h})}),12e4);h.onerror=h.onload=u,document.head.appendChild(h)}return Promise.all(t)},c.m=e,c.c=s,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)c.d(n,s,function(t){return e[t]}.bind(null,s));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],h=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var f=h;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2721:function(e,t,n){},"41cf":function(e,t,n){},4826:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"app",class:{moon:this.$store.state.isMoon},attrs:{id:"app"}},[e.isShowNav?n("nav-bar",{ref:"nav",style:{position:e.pos,color:e.navColor}}):e._e(),n("transition",{attrs:{name:"fade",mode:"in-out"}},[e._v(" 打包后会抖动，去掉过渡效果 "),n("keep-alive",{attrs:{include:"Home"}},[n("router-view")],1)],1),e.isShowFooter?n("footer-bar"):e._e(),n("el-backtop",{attrs:{target:"#app","visibility-height":1200}},[n("i",{staticClass:"iconfont icon-backtop-sunny"})])],1)},r=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"nav",class:{moon:this.$store.state.isMoon},attrs:{id:"nav-bar"}},[n("div",{staticClass:"logo",on:{click:e.changeTheme}},[n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isSunny,expression:"this.$store.state.isSunny"}],staticClass:"el-icon-moon"}),n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isMoon,expression:"this.$store.state.isMoon"}],staticClass:"el-icon-sunny"}),n("span",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isSunny,expression:"this.$store.state.isSunny"}]},[e._v("Dream")]),n("span",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isMoon,expression:"this.$store.state.isMoon"}]},[e._v("Fighting")])]),n("ul",{staticClass:"nav"},e._l(e.links,(function(t,s){return n("li",{key:s,class:{current:s===e.currentIndex},on:{click:function(n){return e.to(t.route,s)}}},[e._v(e._s(t.name))])})),0),n("el-button",{attrs:{type:"text"},on:{click:e.openDrawer}},[n("i",{staticClass:"el-icon-s-unfold"})]),n("el-drawer",{ref:"drawer",staticStyle:{height:"50vh"},attrs:{visible:e.$store.state.drawer,direction:"rtl",modal:!1,size:"200px"},on:{open:e.openDrawer,close:e.closeDrawer}},[n("ul",{staticClass:"mobile-nav"},e._l(e.links,(function(t,s){return n("li",{key:s,class:{current:s===e.currentIndex},staticStyle:{color:"black"},on:{click:function(n){return e.to(t.route,s)}}},[e._v(e._s(t.name))])})),0)])],1)},i=[],c={name:"NavBar",data:function(){return{links:[{route:"/home",name:"首页"},{route:"/tags",name:"标签"},{route:"/timeline",name:"时间线"},{route:"/leavemessages",name:"留言板"},{route:"/about",name:"关于"}],currentIndex:0}},watch:{$route:function(e){"/home"!=e.path&&"/tags"!=e.path&&"/timeline"!=e.path&&"/leavemessages"!=e.path&&"/about"!=e.path&&(this.currentIndex=-1)}},methods:{to:function(e,t){this.$router.push(e),this.currentIndex=t,this.$refs.drawer.closeDrawer()},openDrawer:function(){this.$store.commit("openDrawer")},closeDrawer:function(){this.$store.commit("closeDrawer")},pcCloseDrawer:function(){window.innerWidth>800&&this.$store.commit("closeDrawer")},changeTheme:function(){this.$store.commit("changeIconTheme")}},created:function(){switch(this.$route.path){case"/home":this.currentIndex=0;break;case"/tags":this.currentIndex=1;break;case"/timeline":this.currentIndex=2;break;case"/leavemessages":this.currentIndex=3;break;case"/about":this.currentIndex=4;break}},mounted:function(){window.addEventListener("resize",this.pcCloseDrawer,!1),"/home"!==this.$route.path&&"/tags"!==this.$route.path&&"/timeline"!==this.$route.path&&"/leavemessages"!==this.$route.path&&"/about"!==this.$route.path&&(this.currentIndex=-1)},destroy:function(){window.removeEventListener("resize",this.pcCloseDrawer)}},u=c,h=(n("a410"),n("2877")),l=Object(h["a"])(u,a,i,!1,null,"7c010502",null),f=l.exports,d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{moon:this.$store.state.isMoon},attrs:{id:"footer"}},[n("div",{staticClass:"info-container"},[n("div",{staticClass:"logo",on:{click:e.changeTheme}},[n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isSunny,expression:"this.$store.state.isSunny"}],staticClass:"el-icon-moon"}),n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isMoon,expression:"this.$store.state.isMoon"}],staticClass:"el-icon-sunny"}),n("span",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isSunny,expression:"this.$store.state.isSunny"}]},[e._v("Dream")]),n("span",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isMoon,expression:"this.$store.state.isMoon"}]},[e._v("Fighting")])]),n("a",{staticStyle:{margin:"0"},attrs:{href:"https://github.com/yuanfajun0912",target:"_blank"}},[n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isSunny,expression:"this.$store.state.isSunny"}],staticClass:"iconfont icon-github"}),n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isMoon,expression:"this.$store.state.isMoon"}],staticClass:"iconfont icon-st-github"})])]),n("p",[e._v(" 友链： "),e._l(e.friendShipLinks,(function(t,s){return n("a",{key:s,attrs:{href:t.url,target:"_blank"}},[e._v(e._s(t.name))])}))],2),n("p",[e._v("© 2020 YFJ. All rights reserved.")]),n("a",{attrs:{href:"http://www.beian.miit.gov.cn",target:"_blank"}},[e._v("渝ICP备20004282号")])])},m=[],p={name:"FooterBar",data:function(){return{friendShipLinks:[]}},methods:{changeTheme:function(){this.$store.commit("changeIconTheme")},getLinks:function(){var e=this;this.$http.get("friendshiplinks").then((function(t){if(!t.data)return e.friendShipLinks=[];e.friendShipLinks=t.data}))}},created:function(){this.getLinks()}},v=p,w=(n("80d3"),Object(h["a"])(v,d,m,!1,null,"75f97e6a",null)),b=w.exports,g={name:"app",components:{NavBar:f,FooterBar:b},data:function(){return{pos:"relative",navColor:"black",drawer:this.$store.state.drawer}},computed:{isShowNav:function(){return"/"!==this.$route.path},isShowFooter:function(){return"/"!==this.$route.path}},methods:{changePos:function(){"/home"===this.$route.path&&window.innerWidth<=800?(this.pos="absolute",this.navColor="white",this.$bus.$emit("closeBtn")):(this.pos="relative",this.navColor="black",this.$bus.$emit("openBtn"))},scrollCloseDrawer:function(){this.$store.commit("closeDrawer")}},watch:{$route:function(e){"/home"!==e.path||window.innerWidth>800?(this.pos="relative",this.navColor="black"):(this.pos="absolute",this.navColor="white")},"$store.state.drawer":function(e){e?this.$refs.app.addEventListener("scroll",this.scrollCloseDrawer,!1):this.$refs.app.removeEventListener("scroll",this.scrollCloseDrawer)}},mounted:function(){window.addEventListener("resize",this.changePos,!1),"/home"===this.$route.path&&window.innerWidth<=800&&(this.pos="absolute",this.navColor="white"),this.$store.commit("getIconTheme")},destroy:function(){window.removeEventListener("resize",this.changePos)}},k=g,y=(n("7c55"),Object(h["a"])(k,o,r,!1,null,null,null)),$=y.exports,S=(n("d3b7"),n("8c4f")),_=S["a"].prototype.push;S["a"].prototype.push=function(e){return _.call(this,e).catch((function(e){return e}))};var C=function(){return n.e("chunk-35ae9854").then(n.bind(null,"bb51"))},x=function(){return n.e("chunk-4b795c65").then(n.bind(null,"1884"))},D=function(){return n.e("chunk-45021452").then(n.bind(null,"f67a"))},L=function(){return Promise.all([n.e("chunk-352df33a"),n.e("chunk-4bdf717e")]).then(n.bind(null,"0b2b"))},M=function(){return Promise.all([n.e("chunk-6fc43da4"),n.e("chunk-11d7c667")]).then(n.bind(null,"f820"))},E=function(){return Promise.all([n.e("chunk-6fc43da4"),n.e("chunk-352df33a"),n.e("chunk-78ee2bf8")]).then(n.bind(null,"c84b"))};s["default"].use(S["a"]);var I=[{path:"/",redirect:"/home",meta:{title:"主页 | 念风"}},{path:"/home",name:"Home",component:C,meta:{title:"主页 | 念风"}},{path:"/tags",name:"Tags",component:x,meta:{title:"标签 | 念风"}},{path:"/timeline",name:"Timeline",component:D,meta:{title:"时间线 | 念风"}},{path:"/leavemessages",name:"LeaveMessages",component:L,meta:{title:"留言板 | 念风"}},{path:"/about",name:"About",component:M,meta:{title:"关于我 | 念风"}},{path:"/detail/:id",name:"Detail",component:E,meta:{title:"文章 | 念风"}}],N=new S["a"]({mode:"history",base:"/",routes:I}),P="念风";N.beforeEach((function(e,t,n){document.title=e.meta.title||P,n()}));var T=N,O=n("2f62");s["default"].use(O["a"]);var j=new O["a"].Store({state:{isSunny:!0,isMoon:!1,drawer:!1,articleLike:{},articleComments:{},articleViews:{}},mutations:{getIconTheme:function(e){switch(sessionStorage.getItem("theme")){case null:e.isSunny=!0,e.isMoon=!1;break;case"suuny":e.isSunny=!0,e.isMoon=!1;break;case"moon":e.isSunny=!1,e.isMoon=!0;break;default:break}},changeIconTheme:function(e){e.isSunny=!e.isSunny,e.isMoon=!e.isMoon,!0===e.isSunny?sessionStorage.setItem("theme","sunny"):sessionStorage.setItem("theme","moon")},openDrawer:function(e){e.drawer=!0},closeDrawer:function(e){e.drawer=!1},changeArticleLike:function(e,t){e.articleLike=t},changeArticleComments:function(e,t){e.articleComments=t},changeArticleViews:function(e,t){e.articleViews=t}},actions:{},modules:{}}),A=n("5c96"),B=n.n(A);n("0fae");s["default"].use(B.a);n("be35"),n("4826");var F=n("bc3a"),z=n.n(F);s["default"].prototype.$http=z.a.create({baseURL:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API_URL||"/api/"}),s["default"].prototype.$bus=new s["default"],s["default"].config.productionTip=!1,new s["default"]({router:T,store:j,render:function(e){return e($)}}).$mount("#app")},"5ba8":function(e,t,n){},"7c55":function(e,t,n){"use strict";var s=n("5ba8"),o=n.n(s);o.a},"80d3":function(e,t,n){"use strict";var s=n("41cf"),o=n.n(s);o.a},a410:function(e,t,n){"use strict";var s=n("2721"),o=n.n(s);o.a},be35:function(e,t,n){}});
//# sourceMappingURL=app.cb0223b2.js.map