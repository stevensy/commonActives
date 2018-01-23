
<template>
	<div id="commonactives" class="app-page" ref = "page">
      <downapp :url="downloadUrl" :ca="downca" v-if="(!isApp)" :position="{bottom:0}" ref="downapp"></downapp>
      <gotop></gotop>
      <share ref="share"></share>    
      <div class="content" v-html="content"></div>       
	</div>  
</template>

<script>
import Vue from 'vue'
import downapp from "./downapp"
import gotop from "./gotop"
import share from "./share"
import {getQueryString, isApp, myPostion, envUrl} from "../../../utils/common"
	export default {
		name: 'commonactives',
		data() {
			return {
                getDataUrl: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev" ? '/api/cxb/appcghd/index.shtml' : '/cxb/appcghd/index.shtml',//cms上配置数据链接
                downloadUrl: '',//获取cms上下载app地址
                downca: '',//获取cms上下载ca的属性
                content: '',//获取cms上配置的页面内容   
                isApp: isApp(),//当前是否是app 
                queryString: {
                    articleId: JSON.stringify(getQueryString('id')) != "{}" ? getQueryString('id') : {id: 1}, //当前活动的id
                    userInfo: JSON.stringify(getQueryString('userInfo')) != "{}" ? getQueryString('userInfo') : ''//app中userInfo信息
                }
		}
    },
    mounted(){
      let vm = this;
      //打点
      (new Analytics).scan(); 
      //获取cms数据
      vm.getData();
      //如有下载悬浮条添加样式
      vm.addStyle();    
    },
	methods:{
      //添加样式
      addStyle() {
        if(this.$refs.downapp) {
            let t = this.$refs.downapp, down = t.$el.clientHeight, pos = t.position;
            if(t){
                if("bottom" in pos){                 
                    this.$refs.page.classList.add("wx-bottom");
                }else if("top" in pos){                
                    this.$refs.page.classList.add("wx-top");
                }
            }
        }        
      },
      //获取数据
      getData() {
        let vm = this;      
        vm.$ajax.get(vm.getDataUrl, {
            params: {
               id: vm.queryString.articleId.id
            }
        }).then(data => {               
            if(data.errorCode == '0') {
              let d = data.pages.result, num=0;
                if(d.length) {
                    for(let item of d) {                
                        if(item.order == vm.queryString.articleId.id) {
                            num++;
                            document.title = item.title;
                            vm.content = item.content;
                            vm.downloadUrl = item.downUrl;
                            vm.downca = item.appCa;
                            //内容中的所有链接均带上定位
                            vm.$nextTick(_ => {
                                let elmA = document.querySelector(".content").querySelectorAll("a");
                                for(let i of elmA) {           
                                    if(vm.queryString.userInfo !== '' && "userInfo" in vm.queryString.userInfo){
                                        if(i.href.toString().indexOf("?") > 0){                                
                                            i.setAttribute("href", i.href + '&userInfo=' + vm.queryString.userInfo.userInfo)
                                        }else{ 
                                            i.setAttribute("href", i.href + '?userInfo=' + vm.queryString.userInfo.userInfo)                               
                                        }
                                    }                        
                                }
                            });
                            let shareData = {
                                    friend: {
                                        title: item.shareFtitle,
                                        desc: item.shareFdes,
                                        link: item.shareFurl,
                                        imgUrl: 'https:' + item.shareFimg
                                    },
                                    friendQuan: {
                                        title: item.shareQtitle,
                                        desc: item.shareQdes,
                                        link: item.shareQurl,
                                        imgUrl: 'https:' + item.shareQimg
                                    }
                            }
                            //调用子组件initShare方法
                            vm.$refs.share.initShare(shareData);
                        }
                    }
                    if(!num) {
                        Vue.$Toast({
                            content: '请求参数错误!'
                        })
                    }
                }else {
                    Vue.$Toast({
                        content: '暂无数据！'
                    })
                }
                                            
            }
        }, err => {
            Vue.$Toast({
                content: '网络错误,请重试!'
            })
        });
      }     
	},
	components: {
      downapp,
      gotop,
      share
	}
}
</script>

<style lang="scss">
@function rem($px){
  @return $px / 37.5 * 1rem;
}
html, body, div, span, 
h1, h2, h3, h4, h5, h6, p, 
dl, dt, dd, ol, ul, li,
 {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    vertical-align:baseline;
    //background:transparent;
}
h1,h2,h3,h4,h5,h6,em,i {
    font-weight: 100;
    font-style: normal
}
ul,ol,li {
    list-style-type: none
}
a {
    color: #666;
    text-decoration: none;
    outline: 0;
    &:hover {
        text-decoration: none
    }
    &:active {
      -webkit-tap-highlight-color: transparent;
    }
}
 
img {
   width: 100%;
   max-width: 100%;
   height: auto;
   display: block;
}
body {
	font-family: "PingFangSC-Regular","PingFang-Medium", "Helvetica", "Helvetica Neue", Arial, "Microsoft YaHei", sans-serif;
	background: #F5F5F5;
}
.flex {display:flex;width: 100%;}
.wx-bottom{
    padding-bottom: rem(48);// 微信底部留空间
}
.wx-top{
    padding-top: rem(48);// 微信顶部留空间
}
</style>
