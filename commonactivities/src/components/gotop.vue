<template>
     <a href="javascript:void(0)" @click="goTop" class="gotop" ca="commonactivities_Top$返回顶层" ref="goTop"></a>
</template>

<script type="text/ecmascript-6">
    export default {
        props: [],
        data() {
            return {};
        },
        mounted() {
            //监控返回顶部按钮是否显示
            this.isShowTopBtn(); 
        },
        methods: {
            //返回顶部
            goTop() {                
                //获取当前scrollTop的位置
                var curScroll = document.documentElement.scrollTop || document.body.scrollTop;
                //上升的位移
                
                var speed = 5;
                if(curScroll>0){
                        setInterval(timer,1);
                }
                function timer(){
                    if(curScroll>0){
                        curScroll = curScroll-speed;
                        if(document.body.scrollTop) {
                            document.body.scrollTop = curScroll
                        }else if(document.documentElement.scrollTop) {
                            document.documentElement.scrollTop = curScroll;
                        }                        
                        if(curScroll<=0){
                            if(document.body.scrollTop) {
                                document.body.scrollTop = 0
                            }else if(document.documentElement.scrollTop) {
                                document.documentElement.scrollTop = 0;
                            }
                            clearInterval(timer);
                        }
                    }
                }
            },
            //返回顶部按钮是否显示
            isShowTopBtn() {
                window.onscroll = () =>{
                    let top = document.documentElement.scrollTop || document.body.scrollTop;
                    if(top >= 30) {
                       this.$refs.goTop.classList.remove("dishow");
                       this.$refs.goTop.classList.add("show");
                    }
                    else {
                       this.$refs.goTop.classList.remove("show");
                       this.$refs.goTop.classList.add("dishow");
                    }
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
@function rem($px){
  @return $px / 37.5 * 1rem;
}
.gotop {
    position:fixed;
    bottom:rem(50);
    right:rem(10);
    z-index:3;
    height:rem(41);
    width:rem(41);
    margin-bottom:rem(12);
    border-radius: 50%;
    box-shadow: 0 1px 1px #555;
    display:none;
    background:url(../assets/image/icon-gotop.png) no-repeat;
    background-size:100% 100%;
    &:active {
        -webkit-tap-highlight-color: transparent;
    }
}
.show {display:block}
.dishow {display:none;}
</style>
