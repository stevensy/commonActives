<template>
  <div class="rule">
     <div v-if="!isApp" class="rule-head">
        <i class="icon-back" @click="back"></i>
         活动规则
     </div>
     <div class="main">
        <div class="content" v-html="rule"></div>
        <a href="javascript:;" class="btn" @click="back">我知道了</a>
     </div>
     <Gotop></Gotop>      
  </div>
</template>

<script>
import Gotop from "../common/gotop"
import {isApp, getQueryString} from "../../../../utils/common"
export default {
    name:"rule",
    data() {
        return {
            isApp:isApp(),
            rule:'<p>一、活动保养套餐：<br/><strong>赠品获得方式：</strong><br/>活动期间，用户购买活动保养套餐后，将于支付成功且活动结束后10个工作日内推送2张免费补胎券（蘑菇钉）+四季关爱礼包服务券+补液券（仅限赛倍飒品牌）至用户车享家APP账户；<br/><strong>赠品使用方式：</strong><br/>*活动赠品可通过车享家APP下单选择相应服务时抵扣使用，每个订单限用一张；<br/>*赛倍飒品牌补液券至多添加1L机油，机油不可外带，补液券仅限门店补充机油使用（1L内），所有机油保养套餐不可抵扣使用；<br/>*更换防冻液至多添加4L，如有超出，需单独进行价格补差；<br/>*赠品不可兑换现金，不找零，不与其他活动共享；<br/><strong>赠品可使用有效期：</strong><br/>*免费补胎券（蘑菇钉）：自发券之日起2年内有效；<br/>*赛倍飒品牌补液券：自发券之日起6个月内有效；<br/>*四季关爱礼包服务券：<br/>车内空气净化（春）：2018年3月1日-2018年5月31日<br/>冷媒添加（夏）：2018年6月1日-2018年8月31日<br/>车内空气净化（秋）：2018年9月1日-2018年11月30日<br/>更换防冻液（冬）：2018年1月17日-2019年2月28日<br/>用户须在券有效期内到店完成服务并核销券码，过期未到店完成服务将自动取消订单；</p><p>二、轮胎活动：<br/><strong>赠品获得方式：</strong><br/>活动期间，用户购买活动轮胎后，将于支付成功且活动结束后10个工作日内推送2张免费补胎券（蘑菇钉）至用户车享家APP账户；<br/><strong>赠品使用方式：</strong><br/>*活动赠品可在车享家APP下单选择补胎（蘑菇钉）服务时抵扣使用，每个订单限用一张；<br/>*免费补胎政策仅限活动期间在车享家购买的轮胎使用；<br/><strong>赠品可使用有效期：</strong><br/>*免费补胎券（蘑菇钉）：自发券之日起2年内有效；<br/><strong>车享家轮胎意外保说明：</strong><br/>活动期间购买车享家定牌轮胎<br/>在保障期限（半年内）内发生爆胎、鼓包事故时，按轮胎原价享5折换购新车享家定牌轮胎；<br/>在保障期限（1年内）内发生爆胎、鼓包事故时，按轮胎原价享7折换购新车享家定牌轮胎；</p><p>活动如有问题可咨询车享家客服热线：4008020666<br/>车享家在法律允许的范围内拥有对本次活动的最终解释权。<br/></p>'
        }
    },
    created(){
		//置顶
        window.scrollTo(0,0);
    },
    methods: {
        //back
        back() {
            window.history.go(-1);
            return false;
        }
    },
    components: {
        Gotop
    }
}
</script>

<style lang="scss" scoped>
@function rem($px){
    @return $px/37.5*1.04*1rem;
} 
 
.rule {
    .rule-head{
        text-align:center;
        font-size:rem(20);
        border-bottom:1px solid #d0d1d1;
        padding:rem(16) rem(10);
        position:relative;
        .icon-back{
            width:rem(15);
            height:rem(15);
            border-top: rem(2) solid #d0d1d1;
            border-right: rem(2) solid #d0d1d1;
            transform: rotate(-135deg);
            position: absolute;
            top:rem(22);
            left:rem(20);
        }
    }
    .main{
        padding: rem(20) rem(15);
        .content{
            padding-bottom:rem(20);
            line-height:1.5;
        }
        .btn{
            width: 100%;
            height: rem(35);
            line-height:rem(35);
            display:block;
            border-radius: rem(4);
            color:#fff;
            font-size:rem(20);
            text-align:center;
            background-color: #fe3636;
            box-shadow: rem(-1) rem(3) rem(3.5) rem(1) rgba(0,18,30,.11), inset 0 0 7px rgba(255,255,255,.35);
        }
    }
    
}

</style>