(function(e){function t(t){for(var o,s,i=t[0],c=t[1],u=t[2],h=0,l=[];h<i.length;h++)s=i[h],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&l.push(r[s][0]),r[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);m&&m(t);while(l.length)l.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,s=1;s<n.length;s++){var i=n[s];0!==r[i]&&(o=!1)}o&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},s={app:0},r={app:0},a=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-048b5886":"84598265","chunk-15fb9348":"7b7636ac","chunk-7af5b7ac":"44b5bec7","chunk-53f95b4d":"a1d6e392","chunk-5ecacc1e":"0d91e62c","chunk-2e322c20":"0f9a7a91","chunk-9de41656":"216e1277","chunk-79d3d15c":"1703fe8c"}[e]+".js"}function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-048b5886":1,"chunk-15fb9348":1,"chunk-7af5b7ac":1,"chunk-53f95b4d":1,"chunk-5ecacc1e":1,"chunk-2e322c20":1,"chunk-9de41656":1,"chunk-79d3d15c":1};s[e]?t.push(s[e]):0!==s[e]&&n[e]&&t.push(s[e]=new Promise((function(t,n){for(var o="css/"+({}[e]||e)+"."+{"chunk-048b5886":"6378d776","chunk-15fb9348":"2cb14bb6","chunk-7af5b7ac":"61c52fc3","chunk-53f95b4d":"9d7ff65b","chunk-5ecacc1e":"d826a2d4","chunk-2e322c20":"ece41497","chunk-9de41656":"8b470eaf","chunk-79d3d15c":"6e499d77"}[e]+".css",r=c.p+o,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var u=a[i],h=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(h===o||h===r))return t()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){u=l[i],h=u.getAttribute("data-href");if(h===o||h===r)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var o=t&&t.target&&t.target.src||r,a=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=o,delete s[e],m.parentNode.removeChild(m),n(a)},m.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){s[e]=0})));var o=r[e];if(0!==o)if(o)t.push(o[2]);else{var a=new Promise((function(t,n){o=r[e]=[t,n]}));t.push(o[2]=a);var u,h=document.createElement("script");h.charset="utf-8",h.timeout=120,c.nc&&h.setAttribute("nonce",c.nc),h.src=i(e);var l=new Error;u=function(t){h.onerror=h.onload=null,clearTimeout(m);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+o+": "+s+")",l.name="ChunkLoadError",l.type=o,l.request=s,n[1](l)}r[e]=void 0}};var m=setTimeout((function(){u({type:"timeout",target:h})}),12e4);h.onerror=h.onload=u,document.head.appendChild(h)}return Promise.all(t)},c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],h=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var m=h;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2721:function(e,t,n){},"41cf":function(e,t,n){},4826:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("8bbf"),s=n.n(o),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"app",class:{moon:this.$store.state.isMoon},attrs:{id:"app"}},[e.isShowNav?n("nav-bar",{ref:"nav",style:{position:e.pos,color:e.navColor}}):e._e(),n("transition",{attrs:{name:"fade",mode:"in-out"}},[e._v(" 打包后会抖动，去掉过渡效果 "),n("keep-alive",{attrs:{include:"Home"}},[n("router-view")],1)],1),e.isShowFooter?n("footer-bar"):e._e(),n("el-backtop",{attrs:{target:"#app","visibility-height":1200}},[n("i",{staticClass:"iconfont icon-backtop-sunny"})])],1)},a=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"nav",class:{moon:this.$store.state.isMoon},attrs:{id:"nav-bar"}},[n("div",{staticClass:"logo",on:{click:e.changeTheme}},[n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isSunny,expression:"this.$store.state.isSunny"}],staticClass:"el-icon-moon"}),n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isMoon,expression:"this.$store.state.isMoon"}],staticClass:"el-icon-sunny"}),n("span",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isSunny,expression:"this.$store.state.isSunny"}]},[e._v("Dream")]),n("span",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isMoon,expression:"this.$store.state.isMoon"}]},[e._v("Fighting")])]),n("ul",{staticClass:"nav"},e._l(e.links,(function(t,o){return n("li",{key:o,class:{current:o===e.currentIndex},on:{click:function(n){return e.to(t.route,o)}}},[e._v(e._s(t.name))])})),0),n("el-button",{attrs:{type:"text"},on:{click:e.openDrawer}},[n("i",{staticClass:"el-icon-s-unfold"})]),n("el-drawer",{ref:"drawer",staticStyle:{height:"50vh"},attrs:{visible:e.$store.state.drawer,direction:"rtl",modal:!1,size:"200px"},on:{open:e.openDrawer,close:e.closeDrawer}},[n("ul",{staticClass:"mobile-nav"},e._l(e.links,(function(t,o){return n("li",{key:o,class:{current:o===e.currentIndex},staticStyle:{color:"black"},on:{click:function(n){return e.to(t.route,o)}}},[e._v(e._s(t.name))])})),0)])],1)},c=[],u={name:"NavBar",data:function(){return{links:[{route:"/home",name:"首页"},{route:"/tags",name:"标签"},{route:"/timeline",name:"时间线"},{route:"/leavemessages",name:"留言板"},{route:"/about",name:"关于"}],currentIndex:0}},watch:{$route:function(e){"/home"!=e.path&&"/tags"!=e.path&&"/timeline"!=e.path&&"/leavemessages"!=e.path&&"/about"!=e.path&&(this.currentIndex=-1)}},methods:{to:function(e,t){this.$router.push(e),this.currentIndex=t,this.$refs.drawer.closeDrawer()},openDrawer:function(){this.$store.commit("openDrawer")},closeDrawer:function(){this.$store.commit("closeDrawer")},pcCloseDrawer:function(){window.innerWidth>800&&this.$store.commit("closeDrawer")},changeTheme:function(){this.$store.commit("changeIconTheme")}},created:function(){switch(this.$route.path){case"/home":this.currentIndex=0;break;case"/tags":this.currentIndex=1;break;case"/timeline":this.currentIndex=2;break;case"/leavemessages":this.currentIndex=3;break;case"/about":this.currentIndex=4;break}},mounted:function(){window.addEventListener("resize",this.pcCloseDrawer,!1),"/home"!==this.$route.path&&"/tags"!==this.$route.path&&"/timeline"!==this.$route.path&&"/leavemessages"!==this.$route.path&&"/about"!==this.$route.path&&(this.currentIndex=-1)},destroy:function(){window.removeEventListener("resize",this.pcCloseDrawer)}},h=u,l=(n("a410"),n("2877")),m=Object(l["a"])(h,i,c,!1,null,"7c010502",null),f=m.exports,d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{moon:this.$store.state.isMoon},attrs:{id:"footer"}},[n("div",{staticClass:"info-container"},[n("div",{staticClass:"logo",on:{click:e.changeTheme}},[n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isSunny,expression:"this.$store.state.isSunny"}],staticClass:"el-icon-moon"}),n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isMoon,expression:"this.$store.state.isMoon"}],staticClass:"el-icon-sunny"}),n("span",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isSunny,expression:"this.$store.state.isSunny"}]},[e._v("Dream")]),n("span",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isMoon,expression:"this.$store.state.isMoon"}]},[e._v("Fighting")])]),n("a",{staticStyle:{margin:"0"},attrs:{href:"https://github.com/yuanfajun0912",target:"_blank"}},[n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isSunny,expression:"this.$store.state.isSunny"}],staticClass:"iconfont icon-github"}),n("i",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isMoon,expression:"this.$store.state.isMoon"}],staticClass:"iconfont icon-st-github"})])]),n("p",[e._v(" 友链： "),e._l(e.friendShipLinks,(function(t,o){return n("a",{key:o,attrs:{href:t.url,target:"_blank"}},[e._v(e._s(t.name))])}))],2),n("p",[e._v("© 2020 YFJ. All rights reserved.")]),n("a",{attrs:{href:"http://www.beian.miit.gov.cn",target:"_blank"}},[e._v("渝ICP备20004282号")])])},p=[],v={name:"FooterBar",data:function(){return{friendShipLinks:[]}},methods:{changeTheme:function(){this.$store.commit("changeIconTheme")},getLinks:function(){var e=this;this.$http.get("friendshiplinks").then((function(t){if(!t.data)return e.friendShipLinks=[];e.friendShipLinks=t.data}))}},created:function(){this.getLinks()}},b=v,w=(n("80d3"),Object(l["a"])(b,d,p,!1,null,"75f97e6a",null)),g=w.exports,k={name:"app",components:{NavBar:f,FooterBar:g},data:function(){return{pos:"relative",navColor:"black",drawer:this.$store.state.drawer}},computed:{isShowNav:function(){return"/"!==this.$route.path},isShowFooter:function(){return"/"!==this.$route.path}},methods:{changePos:function(){"/home"===this.$route.path&&window.innerWidth<=800?(this.pos="absolute",this.navColor="white",this.$bus.$emit("closeBtn")):(this.pos="relative",this.navColor="black",this.$bus.$emit("openBtn"))},scrollCloseDrawer:function(){this.$store.commit("closeDrawer")}},watch:{$route:function(e,t){var n=/detail/gm,o=n.test(e.path);if(o&&"/home"===t.path){var s=window.getComputedStyle(document.getElementById("home"),null).height;s=parseInt(s),this.$store.commit("sureHomeToDetail",s)}if(o&&"/tags"===t.path){var r=window.getComputedStyle(document.getElementById("tags"),null).height;r=parseInt(r),this.$store.commit("sureTagsToDetail",r)}(n.test(t.path)||"/"===t.path&&o)&&this.$store.commit("notChangeHeight"),"/home"!==e.path||window.innerWidth>800?(this.pos="relative",this.navColor="black"):(this.pos="absolute",this.navColor="white")},"$store.state.drawer":function(e){e?this.$refs.app.addEventListener("scroll",this.scrollCloseDrawer,!1):this.$refs.app.removeEventListener("scroll",this.scrollCloseDrawer)}},mounted:function(){window.addEventListener("resize",this.changePos,!1),"/home"===this.$route.path&&window.innerWidth<=800&&(this.pos="absolute",this.navColor="white"),this.$store.commit("getIconTheme")},destroy:function(){window.removeEventListener("resize",this.changePos)}},y=k,$=(n("7c55"),Object(l["a"])(y,r,a,!1,null,null,null)),x=$.exports,S=(n("d3b7"),n("6389")),_=n.n(S),C=n("323e"),D=n.n(C),T=(n("a5d8"),_.a.prototype.push);_.a.prototype.push=function(e){return T.call(this,e).catch((function(e){return e}))};var E=function(){return n.e("chunk-53f95b4d").then(n.bind(null,"bb51"))},I=function(){return n.e("chunk-048b5886").then(n.bind(null,"1884"))},L=function(){return n.e("chunk-79d3d15c").then(n.bind(null,"f67a"))},M=function(){return Promise.all([n.e("chunk-15fb9348"),n.e("chunk-7af5b7ac")]).then(n.bind(null,"0b2b"))},N=function(){return Promise.all([n.e("chunk-5ecacc1e"),n.e("chunk-9de41656")]).then(n.bind(null,"f820"))},P=function(){return Promise.all([n.e("chunk-5ecacc1e"),n.e("chunk-15fb9348"),n.e("chunk-2e322c20")]).then(n.bind(null,"c84b"))};s.a.use(_.a);var j=[{path:"/",redirect:"/home",meta:{title:"主页 | 念风"}},{path:"/home",name:"Home",component:E,meta:{title:"主页 | 念风"}},{path:"/tags",name:"Tags",component:I,meta:{title:"标签 | 念风"}},{path:"/timeline",name:"Timeline",component:L,meta:{title:"时间线 | 念风"}},{path:"/leavemessages",name:"LeaveMessages",component:M,meta:{title:"留言板 | 念风"}},{path:"/about",name:"About",component:N,meta:{title:"关于我 | 念风"}},{path:"/detail/:id",name:"Detail",component:P,meta:{title:"文章 | 念风"}}],O=new _.a({mode:"history",base:"/",routes:j}),A="念风";O.beforeEach((function(e,t,n){document.title=e.meta.title||A,D.a.start(),n()})),O.afterEach((function(){D.a.done()}));var B=O,V=n("5880"),H=n.n(V);s.a.use(H.a);var F=new H.a.Store({state:{isSunny:!0,isMoon:!1,drawer:!1,articleLike:{},articleComments:{},articleViews:{},isHomeToDetail:!1,isTagsToDetail:!1,fixValue:0},mutations:{getIconTheme:function(e){switch(sessionStorage.getItem("theme")){case null:e.isSunny=!0,e.isMoon=!1;break;case"suuny":e.isSunny=!0,e.isMoon=!1;break;case"moon":e.isSunny=!1,e.isMoon=!0;break;default:break}},changeIconTheme:function(e){e.isSunny=!e.isSunny,e.isMoon=!e.isMoon,!0===e.isSunny?sessionStorage.setItem("theme","sunny"):sessionStorage.setItem("theme","moon")},openDrawer:function(e){e.drawer=!0},closeDrawer:function(e){e.drawer=!1},changeArticleLike:function(e,t){e.articleLike=t},changeArticleComments:function(e,t){e.articleComments=t},changeArticleViews:function(e,t){e.articleViews=t},sureHomeToDetail:function(e,t){e.isHomeToDetail=!0,e.fixValue=t},sureTagsToDetail:function(e,t){e.isTagsToDetail=!0,e.fixValue=t},notChangeHeight:function(e){e.isHomeToDetail=!1,e.isTagsToDetail=!1,e.fixValue=0}},actions:{},modules:{}}),z=(n("be35"),n("4826"),n("cebe")),U=n.n(z);s.a.prototype.$http=U.a.create({baseURL:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API_URL||"/api/"}),s.a.prototype.$bus=new s.a,s.a.config.productionTip=!1,new s.a({router:B,store:F,render:function(e){return e(x)}}).$mount("#app")},5880:function(e,t){e.exports=Vuex},"5ba8":function(e,t,n){},6389:function(e,t){e.exports=VueRouter},"7c55":function(e,t,n){"use strict";var o=n("5ba8"),s=n.n(o);s.a},"80d3":function(e,t,n){"use strict";var o=n("41cf"),s=n.n(o);s.a},"8bbf":function(e,t){e.exports=Vue},a410:function(e,t,n){"use strict";var o=n("2721"),s=n.n(o);s.a},be35:function(e,t,n){},cebe:function(e,t){e.exports=axios},f4e8:function(e,t){e.exports=hljs}});
//# sourceMappingURL=app.35c630bd.js.map