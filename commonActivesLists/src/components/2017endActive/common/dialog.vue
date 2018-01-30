<template>
    <div v-if="dialogInfo.isShow">
        <div class="shadow"></div>
                <div class="dialog">
                    <h2>{{ dialogInfo.title }}</h2>
                    <div class="content">
                        <h5>{{ dialogInfo.des }}</h5>
                        <p class="tips">{{ dialogInfo.tips }}</p>
                        <a href="javascript:;" @click="btnFn(dialogInfo)" class="btn">{{ dialogInfo.btnTxt }}</a>
                    </div>
                </div>
    </div>    
</template>

<script>
export default {
    props:["dialogInfo"],
    name:"dialog",
    data() {
        return {           
            
        }
    },
    mounted(){
         //console.log("dialogInfo===>",this.dialogInfo);
    },

    methods:{
        //弹窗按钮事件
       btnFn(obj){    
            if(obj.btnUrl && obj.btnUrl != ''){
                //是否是函数，是执行，不是就跳转
                if(typeof(obj.btnUrl)=="function"){
                      obj.btnUrl();
                }else{
                   window.location.href =  obj.btnUrl;                   
                }   
                obj.isShow = false;//弹窗消失             
            }else{
                obj.isShow = false;//弹窗消失                
            }
       }  
    }
}
</script>

<style lang="scss" scoped>
.shadow{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,.7);
    z-index:3;
}
.dialog{
    width:rem(320);
    border-radius:rem(10);
    box-sizing: border-box;
    background:#fff;
    position: fixed;
    z-index:5;
    top:50%;
    left: 50%;
    transform:translate(-50%, -50%);
    padding:rem(15) rem(35);
    h2{
        text-align:center;
        font-size:rem(21);
        margin-bottom:rem(8);
    }
    .content{
        .btn{
            width:rem(133);
            height:rem(30);
            line-height:rem(30);
            margin:0 auto;
            font-size:rem(15);
        }
        h5{
           font-size:rem(18);
        }
        .tips{
            color:#666;
            font-size:rem(14);
            line-height:1.5;
            margin:rem(5) 0 rem(15);
        }
    }
    @at-root .btn{
         width: rem(85.5);
              height: rem(25.5);
              line-height:rem(25.5);
              display:block;
              border-radius: rem(4);
              color:#fff;
              font-size:rem(12.5);
              text-align:center;
              background-color: #fe3636;
              box-shadow: rem(-1) rem(3) rem(3.5) rem(1) rgba(0,18,30,.11), inset 0 0 7px rgba(255,255,255,.35);
    }
}
</style>