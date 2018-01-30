<template>
	<div  class="app-page"> 
        <div class="topImg"></div>
        <ul class="lists">
            <li v-for="item in list" :key="item">{{ item }}</li>            
        </ul>
        <Lottery @listenMsg="listenDialog" :initApi="initApi" :prizeApi="prizeApi" :isShare="isShare" :fn="shareFn"></Lottery>	
        <section class="result">
            <h5>获奖名单</h5>
            <div class="content">
                <div class="scroll">
                    <Marqueen ref="marqueen" :datalist="prizeList"></Marqueen>
                </div>                
            </div>
        </section>
        <div class="rules">
            <h5>活动规则</h5>
            <div class="content">
                <p v-html="rule"></p>
            </div>
        </div>
        <a class="changePage" v-if="!isApp" :href="cHref" ca="2017sgzz_cxj_dzp_tabBtn_sh$切换上海站"></a>
        <Loading ref="loading"></Loading>
        <Share ref="share" @listenShare="shareBack"></Share>  
        <Gotop></Gotop>  
        <Dialogs :dialogInfo="dialogInfo"></Dialogs>
	</div>  
</template>

<script>
import Lottery from "./lottery"
import Share from "./common/share"
import Gotop from "../common/gotop"
import Dialogs from "./common/dialog"
import Loading from "../common/loading"
import Marqueen from "./common/marqueen"
import {isApp} from "../../../../utils/common"
export default {
    name: 'getprize',
    data() {
        return {
            isApp:isApp(), //是否是app
            list:['•一等奖：1000元旅游现金卡', '•二等奖：500元旅游现金卡', '•三等奖：100元旅游现金卡'],//奖项列表说明
            rule:"<b>1.活动时间：</b><br/>2017年12月6日-2018年1月7日；<br/><b>2.参与方式：</b><br/>1)用户登陆车享网，点击“抽奖”即可参与； 每位用户限抽1次，分享朋友圈可额外获得1次抽奖机会（活动期间每位用户至多可享2次抽奖机会）；<br/>2)用户中奖后且成功购买活动页面保养套餐卡即可获得相应金额旅游现金卡，活动结束后将有客服人员致电联系快递地址及收件人等信息，请确保手机畅通；或登陆车享家APP在“我的／更多／我的地址”自助完善收件信息；<br/>3)用户中奖后，需在3日之内完成保养套餐下单，否则中奖名额将作废；<br/>4)本旅游现金卡为车享与去哪儿旅游网联名卡，须在2019年4月17日前使用（过期失效），具体使用规则及更多帮助请关注card.qunar.com网址公示；<br />5)<b>如发生用户退保养套餐卡情况，则赠送的旅游现金卡需原额退还；如旅游现金卡已使用，则车享家将在退卡时扣除相应旅游卡面值金额；</b><br />6)活动如有任何问题可咨询车享家客服热线400-802-0666；<br/>7)车享家在法律允许的范围内拥有对本次活动的最终解释权。",//活动规则说明
            drawListApi:'/service/sgzz/getLotteryRecords', //中奖信息api
            initApi:'/service/sgzz/initHomePage',//初始化api 
            prizeApi: "/service/sgzz/draw",//后端抽奖接口
            getLotteryApi: '/service/sgzz/shared',//分享回调api
            dialogInfo:{},//弹窗信息需传入组件common/dialog
            isShare:false,//是否已分享
            prizeList:[
                "145****4402  抽中洗车券1","145****4402  抽中洗车券2","145****4402  抽中洗车券3", "145****4402  抽中洗车券4", "145****4402  抽中洗车券5", "145****4402  抽中洗车券6", "145****4402  抽中洗车券7",  "145****4402  抽中洗车券8", "145****4402  抽中洗车券9", "145****4402  抽中洗车券10"
            ],//活动当前中奖信息列表 
            shareFn:false, //分享回调传入转盘的子组件 
            cHref:''//去上海页面
        }
    },
    created(){
        document.title = '车享换新节';
        this.cHref_change();
        //获取中奖信息，有则显示
        //this.getList()
        //把分享的回调传入转盘的子组件
        this.shareFn = this.addLotteryTime;        
    },
    mounted(){
      //获取大转盘分享信息
      this.share('lottery');
       this.$refs.marqueen.marqueen();
    },
 
    methods:{
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
        
       //分享
        share(obj){
            //调用子组件initShare方法
            this.$refs.share.initShare(obj, this.addLotteryTime);
        },
        //分享回调增加抽奖次数
        addLotteryTime(){
            this.$ajax.get(this.getLotteryApi, {}, {
				timeout:5000
			}).then(res => {           
                console.log("分享成功")
            })
        },
        //获取中奖信息
        getList(){
            this.$ajax.get(this.drawListApi, {}, {
				timeout:5000
			}).then(res => {
                //res.result 是数字1
                if(res.result){
                    let data = res.obj;
                    data.forEach( (item, index) => {
                        this.prizeList.push(item.prizeName)
                    })
                }
                //中奖信息大于4条滚屏
                this.marqueen();
            })
        
        },
        //监听弹窗方法
        listenDialog(data){
            this.dialogInfo = data;
        },
        //监听分享回调
        shareBack(data){
            console.log("isShare", data)
            this.isShare = data;
        }        
    },
    components: {
      Lottery,
      Share,
      Gotop,
      Dialogs,
      Loading,
      Marqueen
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
.app-page{
    background:#089ae8;
    // background-image: -webkit-linear-gradient(left, #88bce9, #83c4ee 26%, #6da9dc 91%);
	// background-image: -moz-linear-gradient(left, #88bce9, #83c4ee 26%, #6da9dc 91%);
	// background-image: -o-linear-gradient(left, #88bce9, #83c4ee 26%, #6da9dc 91%);
	// background-image: -ms-linear-gradient(left, #88bce9, #83c4ee 26%, #6da9dc 91%);
	// background-image: linear-gradient(to right, #88bce9, #83c4ee 26%, #6da9dc 91%);
    .changePage{position:fixed;top:45%;right:0;z-index:3;width:rem(66.5);height:rem(66.5);background:url(../../assets/images/2017endActive/back.png) no-repeat;background-size:100%;}
    .topImg{       
        height:rem(280);
        background:url(../../assets/images/2017endActive/draw_top.png) no-repeat;
        background-size:100%;
    }
    .lists{
        position: absolute;
        top:rem(140);
        left:50%;
        transform:translateX(-50%);
       li{
           color:#fff;
           font-size:rem(14.5);
           white-space: nowrap;
           line-height:1.8;
       }
    }
    .result{
        width:80%;
        margin:rem(-50) auto rem(60);
        padding:rem(15);
        position: relative;
        &:before{
            content:"";
            border:1px solid #fff;
            width:100%;
            height:100%;
            position: absolute;
            top:0;
            left:0;
            border-radius:rem(12);
        }
        h5{
           position: absolute;
           width:rem(100);
           font-size:rem(20);
           color:#fff;
           top:0;
           left:50%;
           transform:translate(-50%, -50%);
           background:#089ae8;  
           text-align:center;     
        }
        .content{
            border-radius: rem(12);
            background:#fff;            
            box-shadow:inset 0 0 rem(20) #0886e1;
            padding:rem(25) rem(23) rem(22); 
            height:rem(120);          
            overflow:hidden;
            color:#333;
            position:relative;
            .scroll{
                position: absolute;
                top:rem(15);
                left:rem(23);   
                width:85%;             
                overflow:hidden;
                   
            } 
               
        }
    }
    .rules{
        background:#fff;
        padding:rem(10) rem(10) rem(35);
        position:relative;
        &:before{
            content:"";
            width:100%;
            height:rem(69);
            position: absolute;
            top:rem(-65);
            left:0;
            background:url(../../assets/images/2017endActive/bg5.png) no-repeat;
            background-size:100%;
        }
        h5{
            padding-left:rem(15);
            position:relative;
            font-size:rem(16);
            border-bottom:rem(1) solid #ccc;
            padding-bottom:rem(10);
            &:before{
                content:"";
                position: absolute;
                left:rem(5);
                height:60%;
                top:0;
                border-left:rem(4) solid #0d8ee3;
                
            }
        }
        .content{
            padding:rem(7) 0;
            color:#666;
            font-size:rem(13);
            line-height:1.8;
            b{
                margin-bottom:rem(10)
            }
        }
    }
}
.loadtxt{color:#fff;}

</style>
