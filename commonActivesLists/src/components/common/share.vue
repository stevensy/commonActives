/*
 * @Author: steven.xulishi
 * @Date: 2018-01-04 
 * @active: 公共分享
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-15 17:17:29
 */
 
<template>
     <a href="javascript:;" v-if="isApp&&!isShowShareBtn"  class="shareGuide" @click="share"></a>
</template>

<script type="text/ecmascript-6">
import {checkAppversionIsGt35, isApp, isWeixin, wxShare, appShare} from "../../../../utils/common"
    export default {
        props: [],
        data() {
            return {
                shareObj: {
                    friend: {
                        title: '',
                        desc: '',
                        link: '',
                        imgUrl: ''
                    },
                    friendQuan: {
                        title: '',
                        desc: '',
                        link: '',
                        imgUrl: ''
                    }
                },//分享数据       
                isShowShareBtn: checkAppversionIsGt35() || false, //是否显示分享按钮， 3.5及以下显示       
                isApp: isApp(),//当前是否是app
                isWx: isWeixin(),//当前是否是微信
                fn: null
            };
        },
        methods: {
            //分享数据获取
            getShareInfo(obj, domain) {
                let info = this.$tpo[obj],                    
                    path = this.$tpo.imgPath(obj),routerPath = this.$route.path;
                for(let item in info){
                    this.shareObj.friend[item] = info[item];
                    this.shareObj.friendQuan[item] = info[item];
                }               
                let url = this.shareObj.friend.link, 
                    Qurl = this.shareObj.friendQuan.link,
                    img = this.shareObj.friend.imgUrl,
                    Qimg = this.shareObj.friendQuan.imgUrl;
                if(!url || url ==''){
                    url = this.testENV(domain) + this.$tpo.siteUrl.replace('#', '') + '?a=a#' + routerPath;
                }
                if(!Qurl || Qurl ==''){
                    Qurl = this.testENV(domain) + this.$tpo.siteUrl.replace('#', '') + '?a=a#' + routerPath;
                }          
                if(!img || img==''){
                   img = path +"share.jpg";
                }else{                   
                    img = path + img;
                }
                if(!Qimg || Qimg==''){
                   Qimg = path +"share.jpg";
                }else{
                    Qimg = path + Qimg;
                }
                this.shareObj.friend.link = url;
                this.shareObj.friendQuan.link=Qurl;
                this.shareObj.friend.imgUrl = img;
                this.shareObj.friendQuan.imgUrl=Qimg;
                console.log(this.shareObj)
                return this.shareObj;
            },
            //要据url,返回对应线上域名
            testENV(domain){
                const url = window.location.href;
                const ENV = {			   
                    "pre" :".chexiangpre.com",
                    "sit" : ".chexiangsit.com"
                }
                for(var i in ENV){
                    if(url.indexOf(i)> -1){				   
                        return `https://${domain}.chexiang${i}.com`;
                    }
                }
                if(url.indexOf("chexiang.com")) {
                    return `https://${domain}.chexiang.com`;
                }
                
            },
            //初始化分享
            initShare(obj, domain, fn) {
                let shareData = this.getShareInfo(obj, domain);
                this.shareObj = shareData;
                this.fn = fn;
                if(this.isWx) { 
                    wxShare(this.shareObj, _ => {
                        this.fn&&this.fn();
                        this.noticeShare();
                    });
                }else if(this.isApp){
                    setTimeout(() => {
                        // 延迟调用 lb的展示分享按钮，不然android和ios下有一定概率无法显示，具体原因未明
                        this.share();
                    }, 1000);
                }
            },
            //app分享
            share() {
                appShare(this.shareObj).then( res => {
                    this.fn&&this.fn();
                    this.noticeShare();
                });             
            },            
            //分享回调通知其他组件分享过了
            noticeShare(){
                this.$emit("listenShare", true)
            }
        }
    };
</script>

<style lang="scss" scoped>
@function rem($px){
  @return $px / 37.5 * 1rem;
}
.shareGuide {
  width:rem(43);
  height:rem(43);
  background:transparent url("../../assets/images/common/share-icon.png") no-repeat top left;
  background-size:100% 100%;
  position:fixed;
  right:rem(10);
  bottom:29%;
  z-index:3;
  &:active {
      -webkit-tap-highlight-color: transparent;
  }
}
</style>
