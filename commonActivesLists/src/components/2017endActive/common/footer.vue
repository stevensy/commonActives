<template>
    <div class="footer">
        <ul class="footLi">
            <li v-for="(item,index) in footLi" :key="item">
               <a :href="item.url" :ca="item.ca | addC"></a>
            </li>
        </ul> 
    </div>    
</template>

<script>
export default {
    name:"footer",
    data() {
        return {           
           footLi:[{
               ca:"2017sgzz_cxj_dhl_zc_sh$整车",
               url: process.env.NODE_ENV == "sit" ? "/promotion/newcar.htm?channel=cx_zc_2017sgzz_cxjh5_20171121" : process.env.NODE_ENV == "pre" ? "/promotion/104.htm?channel=cx_zc_2017sgzz_cxjh5_20171128" :  "/promotion/1212xinche.htm?channel=cx_zc_2017sgzz_cxjh5_20171206",
           },{
               ca:"",
               url:"javascript:;",
           },{
               ca:"2017sgzz_cxj_dhl_esc_sh$二手车",
               url:"/activity/20171206.htm?utm_source=2017CxjCar",
           }] 
        }
    },
    created(){
       //根据环境导航添加域名
      this.addUrl("m.2");
    },
    mounted(){
      //给父级div 添加样式
      this.$parent.$el.classList.add("pb10");
    },
    filters:{
        addC(str){
           let path = window.location.href.indexOf("/sh");
           if(path>-1){
               return str;
           }else{
               return str.replace("_sh", "");
           }
        }
    },
    methods:{
       addUrl(str){
           for(let i in this.footLi){
              if(this.footLi[i].url!="javascript:;" && this.footLi[i].url!=""){
                let v = this.footLi[i].url;
                if(i==0){
                    this.footLi[i].url = this.testENV("c") + v;
                }else this.footLi[i].url = this.testENV(str) + v;           
                
              }
              
           }
       },
       //要据url,返回对应线上域名
        testENV(domain){
            const url = window.location.href;
            const ENV = {			   
            "pre" :".chexiangpre.com",
            "sit" : ".chexiangsit.com",
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
    }
}
</script>

<style lang="scss">
.pb10{
    padding-bottom:rem(35);
}
.footer{
   width:100%;
   position: fixed;
   bottom:0;
   z-index:10;
   background:#17bff7;
   padding:rem(10) 0 rem(10);   
   .footLi{
        background:url(../../../assets/images/2017endActive/foot-nav.png) center no-repeat;
        background-size:100%;
        width:rem(345);
        height:rem(48);
        margin: 0 auto;
        display: flex;        
        li{
            flex:1;
            position: relative;
            a{
                width:100%;
                height:100%;
                display:block;
                position: absolute;
                top:0;
                left:0;
            }
        }
   }
}
</style>