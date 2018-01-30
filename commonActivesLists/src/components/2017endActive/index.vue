<template>
  <div id="index" class="app-page">
      <header class="app-head">         
         <img :src="path + topImg" />
      </header>
      <main class="app-main">
        <h2 class="txt"><img :src="path + topImg2" /></h2>         
        <section class="section" v-for="(item,index) in dataArr" :key="item" :class="{top25: !index}">
          <h3 :class="index | bgClass"></h3>
          <div class="content sec02">
            <h4>{{ item.txt }}</h4>
            <h5>{{ item.ftxt }}</h5>
            <div class="proDetail flex">
               <div class="simg">
                  <i class="tag">{{ item.tag }}</i>
                  <img :src="path + item.img" />
               </div>
               <div class="infos">
                  <ul class="clearfix">
                    <li v-for="items in item.liArr" :key="items">{{ items.li}}<i>x{{ items.num }}</i></li>
                  </ul>
                  <p class="price">
                    <del>价值:{{ item.oldPrice }}元</del>
                    <span>现价:<i><b>{{ item.newPrice }}</b>元</i></span>
                    <a :href="item.url" class="btn" :ca="index | addbuyCa">立刻购买</a>
                  </p>
               </div>
            </div>
          </div>
        </section>
         
        <section class="gift">
          <h5>四季关爱礼包</h5>
          <p class="txt2">换季时节 “内外兼修” 呵护爱车</p>
          <p class="sale"><img :src="path + gift.gitftImg" /></p>
          <div class="tableBg">
            <table class="table">
              <tr>
                <th width="10%"></th>
                <th>礼包权益</th>
                <th width="10%">数量</th>
                <th>检测服务</th>
                <th width="14%">价格</th>
              </tr>
              <tr v-for="item in gift.gitBg" :key="item">
                <td>{{ item[0] }}</td>
                <td>{{ item[1] }}</td>
                <td>{{ item[2] }}</td>
                <td>{{ item[3] }}</td>
                <td>{{ item[4] }}</td>
              </tr>
              
            </table>
          </div>
          <a :href="gift.url" class="btn" ca="2017sgzz_cxj_tck8buy_all$上海四季关爱礼包立刻购买套餐">立刻购买</a>
        </section>
        <p v-for ="(item,index) in lastImg" :key="item" :class="index | lastCss"><a :href="item.url" :ca="item.ca"><img :src="path + item.img" /></a></p>
        <section class="rule">
            <h5 class="rule-txt">活动规则</h5>
            <div class="content">
                <p>轮胎活动：<br />
                    赠品获得方式：<br />
                    活动期间，用户购买活动轮胎后，将于支付成功且活动结束后10个工作日内推送2张免费补胎券（蘑菇钉）至用户车享家APP账户；<br />
                    赠品使用方式：<br />
                    *活动赠品可在车享家APP下单选择补胎（蘑菇钉）服务时抵扣使用，每个订单限用一张； <br />
                    *免费补胎政策仅限活动期间在车享家购买的轮胎使用；<br />
                    赠品可使用有效期：<br />
                    *免费补胎券（蘑菇钉）：自发券之日起2年内有效；<br />
                    车享家轮胎意外保说明：<br />
                    活动期间购买车享家定牌轮胎，享:<br />
                    半年内意外鼓包，享5折换购轮胎；<br />
                    一年内意外鼓包，享7折换购轮胎；<br /><br />

                    活动如有问题可咨询车享家客服热线：4008020666<br />
                    车享家在法律允许的范围内拥有对本次活动的最终解释权。
                </p>
            </div>
        </section>
      </main>
      <a class="changePage" v-if="!isApp" :href="cHref" ca="2017sgzz_cxj_tabBtn_alltosh$全国跳转到上海"></a>
      <Share ref="share"></Share>
      <Gotop></Gotop> 
  </div>  
</template>

<script>
import Share from "./common/share"
import Gotop from "../common/gotop"
import getCity from "./common/getCity"
import decodeBase64 from "../../assets/js/decodeBase64"
import {isApp, getQueryString} from "../../../../utils/common"
export default {
    name: 'index', 
    data() {
      return {
           path:"",//资源路径
           cHref: "",//上海跳转的url(变个是否需要定位的变量和有userInfo就带userInfo)
           sesstionCity: sessionStorage.getItem('city') || false,//取session中的city
           isApp: isApp(),
           topImg:'top.jpg?v=2',
           topImg2:'txt1.png',
           serImg: "serlist.png?v=1",
           dataArr:[
                    {
                        txt:"冬季定制全合成保养清洁套餐",
                        ftxt:"新年远行 一路护航",
                        tag:"赛倍飒银赛",
                        img:"pro1.png",
                        liArr:[
                        {
                            li:"全合成保养清洁套餐(4L+机滤)",
                            num:2
                        },
                        {
                            li:"空调内部可视化深度清洗",
                            num:1
                        },
                        {
                            li:"发动机深度清洗",
                            num:1
                        },
                        {
                            li:"节气门清洁",
                            num:1
                        },
                        {
                            li:"全车抛光封釉",
                            num:1
                        }                         
                        ],
                        oldPrice:"3114",
                        newPrice:"1588",
                        url: process.env.NODE_ENV =="prod" ? {
                            spuCode:"1083300",
                            skuCode:"1066744"
                        } :  {
                            spuCode:"1068058",
                            skuCode:"1064799"
                        },
                    },
                    {
                        txt:"冬季定制全合成保养清洁套餐",
                        ftxt:"新年走亲访友  爱车体面过人",
                        tag:"嘉实多",
                        img:"pro2.png", 
                        liArr:[
                        {
                            li:"全合成保养清洁套餐(4L+机滤)",
                            num:2
                        },
                        {
                            li:"空调内部可视化深度清洗",
                            num:1
                        },
                        {
                            li:"发动机深度清洗",
                            num:1
                        },
                        {
                            li:"节气门清洁",
                            num:1
                        },
                        {
                            li:"全车抛光封釉",
                            num:1
                        }],
                        oldPrice:"3054",
                        newPrice:"1588",
                        url: process.env.NODE_ENV =="prod" ? {
                                spuCode:"1083302",
                                skuCode:"1066746"
                            } : {
                                spuCode:"1068062",
                                skuCode:"1064802"
                            }
                    },
                    {
                        txt:"冬季定制半合成保养清洁套餐",
                        ftxt:"爱车清洁焕新  一招搞定丈母娘",
                        tag:"赛倍飒红赛",
                        img:"pro3.png", 
                        liArr:[
                        {
                            li:"半合成保养清洁套餐(4L+机滤)",
                            num:2
                        },
                        {
                            li:"5座机器打蜡",
                            num:2
                        },
                        {
                            li:"发动机润滑系统内部清洗",
                            num:1
                        },
                        {
                            li:"节气门清洁",
                            num:1
                        },
                        {
                            li:"空调系统内循环清洗",
                            num:1
                        }],
                        oldPrice:"2013",
                        newPrice:"1088",
                        url: process.env.NODE_ENV =="prod" ?  {
                                spuCode:"1083299",
                                skuCode:"1066743"
                            } : {
                                spuCode:"1068030",
                                skuCode:"1064787"
                            }
                    },
                    {
                        txt:"冬季定制半合成保养清洁套餐",
                        ftxt:"新年郊游正当时 爱车养护了没？",
                        tag:"嘉实多",
                        img:"pro4.png", 
                        liArr:[
                        {
                            li:"半合成保养清洁套餐(4L+机滤)",
                            num:2
                        },
                        {
                            li:"5座机器打蜡",
                            num:2
                        },
                        {
                            li:"发动机润滑系统内部清洗",
                            num:1
                        },
                        {
                            li:"节气门清洁",
                            num:1
                        },
                        {
                            li:"空调系统内循环清洗",
                            num:1
                        }],
                        oldPrice:"1953",
                        newPrice:"1088",
                        url: process.env.NODE_ENV =="prod" ? {
                                spuCode:"1083301",
                                skuCode:"1066745"
                            } : {
                                spuCode:"1066356",
                                skuCode:"1063598"
                            }
                    },
                ],
           gift:{
                   gitftImg: "sale_car.png",
                   gitBg:[
                    {
                        0: "春季",
                        1:"车内空气净化",
                        2:"1次",
                        3:"空滤+轮胎+雨刮",
                        4:" 160元"
                    },
                    {
                        0: "夏季",
                        1:"添加冷媒",
                        2:"1瓶",
                        3:"冷媒+空调+电瓶",
                        4:"48元"
                    },
                    {
                        0: "秋季",
                        1:"车内空气净化",
                        2:"1次",
                        3:"机油+刹车+轮胎",
                        4:"160元"
                    },
                     {
                        0: "冬季",
                        1:"更换防冻液",
                        2:"1瓶",
                        3:"防冻液+怠速+电瓶",
                        4:"168元"
                    }
                ],

                url: process.env.NODE_ENV =="prod" ? {
                            spuCode:"1083353",
                            skuCode:"1066766"
                        } : {
                            spuCode:"1066356",
                            skuCode:"1063598"
                        }
                },
                lastImg:[
                    {
                        ca:"",
                        img:"txt2.png",
                        url:"javascript:;"
                    },
                    {
                        ca:"2017sgzz_cxj_lt_all$全国轮胎",
                        img:"banner1.png?v=1",
                        url:"/tyre/index.htm"
                    }
                ],
           rule:"<p>一、活动保养套餐：<br/>*活动保养套餐包含4L机油+1个机滤，如超出升数，需额外补差；<br/>*参与活动机油型号限5W-40，红赛保养套餐机油型号为10W-40；<br/><strong>赠品获得方式：</strong><br/>活动期间，用户购买活动保养套餐后，将于支付成功且活动结束后<strong>10个工作日内</strong>推送2张免费补胎券（蘑菇钉）+四季关爱礼包一份（含4张服务券）+补液券1张（仅限购买赛倍飒机油品牌）至用户车享家APP账户；<br/><strong>赠品使用方式：</strong><br/>*活动赠品可通过车享家APP下单选择相应服务时抵扣使用，每个订单限用一张；<br/>*赛倍飒品牌补液券至多添加1L机油，机油不可外带，补液券仅限门店补充机油使用（1L内），所有机油保养套餐不可抵扣使用；<br/>*赛倍飒补液券1L机油型号及品牌与购买套餐的机油品牌与型号一致<br/>*更换防冻液至多添加4L，如有超出，需单独进行价格补差；<br/>*赠品不可兑换现金，不找零，不与其他活动共享；<br/><strong>赠品可使用有效期：</strong><br/>*免费补胎券（蘑菇钉）：自发券之日起2年内有效；<br/>*赛倍飒品牌补液券：自发券之日起6个月内有效；<br/>*四季关爱礼包服务券：<br/>车内空气净化（春）：2018年3月1日-2018年5月31日<br/>冷媒添加（夏）：2018年6月1日-2018年8月31日<br/>车内空气净化（秋）：2018年9月1日-2018年11月30日<br/>更换防冻液（冬）：2018年12月1日-2019年2月28日<br/>用户须在券有效期内到店完成服务并核销券码，过期未到店完成服务将自动取消订单；<br/>二、轮胎活动：<br/><strong>赠品获得方式：</strong><br/>*活动期间，用户购买活动轮胎后（仅限2条及以上参与活动），将于支付成功且活动结束后10<strong>个工作日内</strong>推送2张免费补胎券（蘑菇钉）至用户车享家APP账户；<br/>*活动期间，购车享家定牌轮胎赠送铝制气门嘴，买2条送2个，买4条送4个，至线下门店进行赠送；<br/><strong>赠品使用方式：</strong><br/>*活动赠品可在车享家APP下单选择补胎（蘑菇钉）服务时抵扣使用，每个订单限用一张；<br/>*免费补胎政策仅限活动期间在车享家购买的轮胎使用,仅限本人单车牌使用，仅限该轮胎生命周期使用；<br/><strong>赠品可使用有效期：</strong><br/>*免费补胎券（蘑菇钉）：自发券之日起2年内有效；<br/><strong>车享家轮胎意外保说明：</strong><br/>活动期间购买车享家定牌轮胎，享:<br/>在保障期限（半年内）内发生爆胎、鼓包事故时，按轮胎原价享5折换购新车享家定牌轮胎；<br/>在保障期限（1年内）内发生爆胎、鼓包事故时，按轮胎原价享7折换购新车享家定牌轮胎；<br/>活动如有问题可咨询车享家客服热线：4008020666<br/>车享家在法律允许的范围内拥有对本次活动的最终解释权。</p>",
           query: JSON.stringify(getQueryString("isReset"))!="{}" ?  getQueryString("isReset").isReset : 1,//根据url中的isRest是否要进行城市定位     
           userInfo: getQueryString("userInfo").userInfo || "",//APP中userInfo
           channel: getQueryString("channel").channel || ""//url中的channel
      }
    },
    created(){
        document.title = '车享换新节';
        //把userInfo写入localStorage
        this.writeLocalStrorage();
        //跳转全国页面的链接
        this.cHref_change();
        //根据城市显示不同页面
        getCity(this, "/");
        //页面url配置
        this.initUrl();    
    },
    mounted(){
      //打点
      (new Analytics).scan(); 
      //获取全国分享信息
      this.share('all'); 
    },
    filters:{
        //返回每个对应class
        bgClass(i){
          return `bg${++i}`;
        },
        lastCss(i){
            return i!=0 ? `img${i}` : 'img'
        },
        //购买按钮添加ca
        addbuyCa(i){
           return `2017sgzz_cxj_tck${++i}buy_all$全国购买套餐` 
        }
    },
    methods:{
        //把userInfo写入localStorage
        writeLocalStrorage(){
            if( this.isApp && this.userInfo ){    
                if(localStorage && localStorage.getItem('position')){
                     localStorage.setItem('position', JSON.stringify(JSON.parse(decodeURIComponent(decodeBase64(this.userInfo)))));
                }      
            }   
        },
        //跳转url拼接
        cHref_change(){
            if(this.isApp){
                if(process.env.USER_ENV == "dev"){
                    if(this.channel){
                        this.cHref = window.location.origin + "#/sh?isReset=0&userInfo=" + this.userInfo + "&channel=" + this.channel;
                    }else{
                        this.cHref = window.location.origin + "#/sh?isReset=0&userInfo=" + this.userInfo;
                    }
                }else{
                    if(this.channel){
                        this.cHref = window.location.origin + "/cx/cxj/cxjappweb/commonActivesLists/index.shtml#/sh?isReset=0&userInfo=" + this.userInfo + "&channel=" + this.channel;
                    }else{
                        this.cHref = window.location.origin + "/cx/cxj/cxjappweb/commonActivesLists/index.shtml#/sh?isReset=0&userInfo=" + this.userInfo;
                    }
                  
                }
            }else{
                console.log(process.env.USER_ENV)
                if(process.env.USER_ENV == "dev"){
                    if(this.channel){
                        this.cHref = window.location.origin + "#/sh?isReset=0&channel=" + this.channel;
                    }else{
                        this.cHref = window.location.origin + "#/sh?isReset=0";
                    }
                  
                }else{
                    if(this.channel){
                        this.cHref = window.location.origin + "/cx/cxj/cxjappweb/commonActivesLists/index.shtml#/sh?isReset=0&channel=" + this.channel;
                    }else{
                        this.cHref = window.location.origin + "/cx/cxj/cxjappweb/commonActivesLists/index.shtml#/sh?isReset=0";
                    }
                  
                }
            }            
        },
        //url初始化   
        initUrl(){
            //设置静态资源路径
            this.path = this.$tpo.imgPath();
            //设置四季礼包url
            this.gift.url = this.testENV("h.jia") + "/cx/cxj/cxjappweb/buyMealCard/#/cardDetail?spuCode=" + this.gift.url.spuCode + "&skuCode=" + this.gift.url.skuCode;
            //设置轮胎url
            this.lastImg[1].url = this.testENV("h.jia") +  this.lastImg[1].url;    
            //设置套餐卡链接
            this.setCardUrl();
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
        //分享
        share(obj){
            //调用子组件initShare方法
            this.$refs.share.initShare(obj);
        },
        //设置套餐卡链接
        setCardUrl(){
            let comPath = "/cx/cxj/cxjappweb/buyMealCard/#/cardDetail?spuCode=";
            for(let i of this.dataArr){
                if(this.isApp){      
                    i.url = this.testENV("h.jia") + comPath + i.url.spuCode +"&skuCode=" + i.url.skuCode + "&userInfo=" + this.userInfo;
                }else {
                    
                    i.url = this.testENV("h.jia") + comPath + i.url.spuCode +"&skuCode=" + i.url.skuCode
                }
            }
        }         
    },
    components: {
        Share,
        Gotop
    }
  }
</script>
<style lang="scss" scoped>
@function rem($px){
    @return $px/37.5*1.04*1rem;
} 
*{
    -webkit-tap-highlight-color: transparent;
} 
img{width:100%;max-width:100%;height:auto;}
.app-page{
  background-color: #17bff7;
  .changePage{position:fixed;bottom:rem(125);right:rem(10);z-index:3;width:rem(40.5);height:rem(40.5);background:url(../../assets/images/2017endActive/tosh_btn.png) no-repeat;background-size:100%;}
  .app-head{
    img{display:block;}
  }
  .app-main{
     background:url(../../assets/images/2017endActive/circlebg.jpg) no-repeat;
     background-size:100%;
     padding:0 rem(10);
     position: relative;
     top:rem(-4);
     .txt{
       width:rem(263.5);
       height:rem(61);
       margin:0 auto;
     } 
     .section{
       margin:rem(10) 0 rem(15);       
       h2{
         color:#fff;
         text-align:center;
         position:relative;
         font-size:rem(17);
         font-weight:bold;
         z-index:2;
         &:before{
           content:"";            
           position: absolute;            
           left:rem(96);
           top:rem(10);
           transform:rotate(45deg);
           background:#eee;
           box-shadow:0 0 0 rem(4) #eee, rem(12) rem(-12) 0 rem(4) #dcdcdc, rem(92) rem(-92) 0 rem(4) #dcdcdc, rem(104) rem(-104) 0 rem(4) #eee;
         }
       }
        @for $i from 1 through 4 {
            .bg#{$i}{
                background:url(../../assets/images/2017endActive/bg#{$i}.png) center top no-repeat;
                height:rem(77.5);
                background-size: 100%;
                position: relative;
                z-index:2;
                padding-bottom:rem(3);
                
                @if($i==2){
                   height:rem(71);
                }
                @if($i==3){
                   height:rem(53);
                }
                @if($i==4){
                   height:rem(63.5);
                }
            }
        }
     
       .content{
         background:#fff;
         position:relative;
         padding:rem(15) rem(12.5) rem(5);
         border-radius:0 0 rem(10) rem(10);
         &:before{
           width:100%;
           height:rem(11.5);
           background:#0d8ee3;
           content:"";
           transform:skew(-20deg);
           position: absolute;
           top:rem(-10);
           left:0;
         }
         h4{
               height:rem(34);
               background:url(../../assets/images/2017endActive/h4_txt.png) no-repeat;
               background-size:100%;
               line-height:rem(24);
               color:#fff;
               font-weight:bold;
               text-align:center;
             }
       }
       .sec01{
         padding:rem(30) rem(14);
         height:rem(85);
         background:#fff url(../../assets/images/2017endActive/circle.jpg) right rem(15) no-repeat;
         background-size:100%;
         .btn{
             position: absolute;
             bottom:rem(20);
             left:rem(35);
         }
       }
       h5{
         font-size:rem(12.5);
         text-align:center;
         color:#333;
         font-weight: bold;
         margin-bottom:rem(10);
       }
       @at-root .flex{
          display:flex;
          .infos{
            flex:1;
          }
       }
       .proDetail {
         .simg{
           position: relative;
           background:url(../../assets/images/2017endActive/pro-bg.png) right top no-repeat;
           background-size: 100%;
           width:rem(134);
           padding-top:rem(32.5);
           margin-right:rem(5);
           .tag{
             position: absolute;
             top:rem(-20);
             left:0;
             color:#ff0000;
             padding:rem(1) rem(3);
             border:rem(1) solid currentColor;

           }
         }
         .infos{
            li{
              line-height:1.5;
              color:#666;
              position:relative;
            
              i{
                position: absolute;
                top:0;
                right:0;
              }
            }
            .price{
              color:#666;
              font-size:rem(8);
              span{
                font-size:rem(10);
                i{
                   color:#ff0606;
                  b{
                    font-size:rem(16);
                  }
                }
              }
            }
            .btn{
              margin-top:rem(7);
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
       }
     }
     .top25{
            margin-top:rem(0);
        } 
     .serlist{
        margin:rem(10) 0 rem(15);
        padding:0 rem(10);
        text-align:center;        
     }
     .gift{
       margin:rem(30) 0 0;
       padding:rem(20) 0;
       position:relative;
       text-align:center;
       th,td{
           text-align:left;
           &:last-child{
               text-align:right;
           }
       }
       h5{
         position: absolute;
         background:#57d2fe;
         padding:0 rem(20);
         font-weight: bold;
         top:0;
         left:50%;
         font-size:rem(17.5);
         color:#fff;
         transform:translate(-50%, -50%);
       }
       .txt2{
           color:#fff;
           font-size:rem(12.5);
       }
       .sale{
         padding:rem(20)  rem(54) rem(15) rem(54);
       }
       .tableBg{
         background:#fff;
         box-shadow: inset 0 0 rem(4) rgba(0,0,0,.83);
         border-radius:rem(5);
         position: relative;
         margin-bottom:rem(20);
         padding:rem(10) 0.2rem;
         z-index:2;
         .table{
           width:100%;
           border-collapse: collapse;
            tr{
              border-bottom:1px solid #abe6ff;
              line-height:2;
              }
          }
       }       
       .btn{
         width:rem(127.5);
         height:rem(30);
         line-height:rem(30);
         font-size:rem(15);
         color:#fff;
         display:inline-block;
         position: relative;
         z-index:2;
         border-radius: rem(4);
         background-color: #fe3636;
         box-shadow: rem(1) rem(3) rem(3.5) rem(1) rgba(0,18,30,.11), inset 0 0 rem(3.5) rgba(255,255,255,.35);
       }
       &:before{
         width:rem(305);
         height:91.5%;
         display:block;
         position: absolute;
         top:0;
         left:50%;
         transform:translateX(-50%);
         content:"";
         border:rem(2) solid #00a0f0;
         border-radius:rem(15);
       }
     }
     .rule{
         margin-top:rem(10);
         color:#fff;
         padding-bottom:rem(35);
         h5{
             text-align:center;
             background:#17bff7;
             font-size:rem(13);
             position:relative;
             margin-bottom:rem(10);
             &:before, &:after{
                 content:"";
                 border-top:1px solid #fff;
                 width:37%;
                 height: 1px;
                 position: absolute;
                 top:50%;
                 transform:translateY(-50%);
             }
             &:before{
                 left:0;
             }
             &:after{
                 right:0;
             }
         }
     }
  }
}
</style>
