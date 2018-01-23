<template>
     <a href="javascript:;"  v-if="isApp&&!isShowShareBtn" class="shareGuide" @click="share"></a>
</template>

<script type="text/ecmascript-6">
import {checkAppversionIsGt35, isApp, isWeixin, appShare, wxShare} from "../../../utils/common"
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
            };
        },
        mounted() {
             
        },
        methods: {
            //初始化分享
            initShare(shareData) {
                let vm = this;
                vm.shareObj = shareData;
                if(vm.isWx){
                    wxShare(vm.shareObj);
                }else if(vm.isApp){
                    setTimeout(() => {
                        // 延迟调用 lb的展示分享按钮，不然android和ios下有一定概率无法显示，具体原因未明
                        appShare(vm.shareObj);
                    }, 1000);
                }
            },
            //app分享
            share() {
                appShare(this.shareObj);
            },
        }
    };
</script>

<style lang="scss" scoped>
@function rem($px){
  @return $px / 37.5 * 1rem;
}
.shareGuide {
  width:rem(50);
  height:rem(50);
  line-height:rem(50);
  text-align:center;
  color:#fff;
  background:transparent url("../assets/image/share-icon.png") no-repeat top left;
  background-size:100% 100%;
  position:fixed;
  right:rem(5);
  top:50%;
  z-index:3;
  &:active {
      -webkit-tap-highlight-color: transparent;
  }
}
</style>
