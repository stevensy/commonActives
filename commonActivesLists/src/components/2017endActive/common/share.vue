<template>
     <a href="javascript:;" v-if="isApp"  class="shareGuide" @click="share"></a>
</template>

<script type="text/ecmascript-6">
import {isApp, isWeixin, wxShare} from "../../../../../utils/common"
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
                isApp: isApp(),//当前是否是app
                isWx: isWeixin(),//当前是否是微信
                fn: null
               
            };
        },
        mounted() {
           // console.log(this.$tpo)
           // this.noticeShare();

        },
        methods: {
            //分享数据获取
            getShareInfo(obj) {
                let info = this.$tpo.endActive2017[obj],                    
                    path = this.$tpo.imgPath(),routerPath = this.$route.path;
                for(let item in info){
                    this.shareObj.friend[item] = info[item];
                    this.shareObj.friendQuan[item] = info[item];
                }               
                let url = this.shareObj.friend.link, 
                    Qurl = this.shareObj.friendQuan.link,
                    img = this.shareObj.friend.imgUrl,
                    Qimg = this.shareObj.friendQuan.imgUrl;
                if(!url || url ==''){
                    url = this.testENV("cxj.activity") + this.$tpo.siteUrl + routerPath + "?source=share";
                }
                if(!Qurl || Qurl ==''){
                    Qurl = this.testENV("cxj.activity") + this.$tpo.siteUrl + routerPath + "?source=share";
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
            initShare(obj, fn) {
                console.log("shareInfo",obj)
                let vm = this, shareData = vm.getShareInfo(obj);
                vm.shareObj = shareData;
                this.fn = fn;
                if(vm.isWx){ 
                    wxShare(vm.shareObj, fn);
                }
            },
            //app分享
            share() {
                this.appShare(this.shareObj).then( res => {
                    this.fn&&this.fn();
                });             
            },            
            //分享回调通知其他组件分享过了
            noticeShare(){
                this.$emit("listenShare", true)
            },
            //app分享
            appShare(shareObj) {
                let promise,
                    _this = this,
                    _friend = {
                        title: shareObj.friend.title,
                        url: shareObj.friend.link,
                        content: shareObj.friend.desc,
                        imgUrl: shareObj.friend.imgUrl
                    };                    
                  //app统一调3.5的分享方法（规避3.5以上右上角不能回调的问题）
                    promise = new Promise(function(resolve, reject){
                        lb.shareInfo({
                            title: _friend.title,
                            url: _friend.url,
                            content: _friend.content,
                            imgUrl: _friend.imgUrl
                        }, function(data) {
                            //errorCode:0 成功 1：失败
                            if(data.result.errorCode == 0) {
                                resolve(data);   
                            }else{
                                reject(data);
                            }                            
                        });
                    });

                return promise;
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
  background:transparent url("../../../assets/images/common/share-icon.png") no-repeat top left;
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
