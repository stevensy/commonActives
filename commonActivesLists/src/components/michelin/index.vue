/*
 * @Author: steven.xulishi
 * @Date: 2018-01-04 
 * @active: 米其林活动
 * @Last Modified by: steven.xulishi
 * @Last Modified time: 2018-01-15 17:15:51
 */
<template>
   <div class="app-page">
        <img src="../../assets/images/michelin/img1.jpg" />
        <img src="../../assets/images/michelin/img2.jpg" />
        <ul class="lists">
           <li v-for="(item, index) in lists" :key="index">
               <div class="proInfo flex">
                   <div class="simg"><a :href="buyUrl(index)"><img :src="item.img!=''? item.img : '../../assets/images/michelin/normal.jpg'" /></a></div>
                   <div class="info">
                       <h2 class="txt"><a :href="buyUrl(index)">{{ item.title }}</a></h2>
                       <p class="des">{{ item.des }}</p>
                       <div class="priceInfo">
                           <span class="price">¥<b>{{ item.price }}</b>起</span>
                           <a :href="buyUrl(index)" class="btn">去购买</a>
                       </div>
                   </div>
               </div>
           </li>
        </ul>
        <section class="rule">
            <h5>活动说明</h5>
            <div class="content">
                <dl>
                    <dt>活动时间</dt>
                    <dd>即日起-2018.1.31</dd>
                    <dt>活动范围</dt>
                    <dd>仅限江浙沪地区车享家门店参与；（除罗秀店、华阳店、淞宝店、上海钣喷中心店以及黄帽子门店）</dd>
                    <dt>抽奖说明</dt>
                    <dd>
                        <ul class="rule-lists">
                            <li>车享家为抽奖活动组织方,抽奖过程将在公证处监督下完成。中奖名单将在2018年2月12日于“上汽车享家”微信服务号进行公布，米其林方将安排旅行社联系中奖者安排米其林星级餐厅体验活动。</li>
                            <li>此次活动只适用于在江浙沪和马鞍山地区车享家服务中心购买米林高性能轮胎。</li>
                            <li>米其林定制限量版围裙餐布套装礼品数量有限,先到先得,赠完即止。</li>
                            <li>米其林星级餐厅体验中奖名额共20个,中奖者可携带家属一名,奖品总价值人民币5000元以内。</li>
                            <li>包含上海市区五星级酒店住宿一晚,米其林星级餐厅晚餐一顿,江浙沪和马鞍山地区往返上海市区交通费报销(仅限火车/汽车二等座,需提供报销凭证)。旅行社将联系中奖人安排整个餐厅体验。星级餐厅体验兑奖时间为2018年3月1日至2018年4月30日(国家法定公共假期除外)。</li>
                            <li>参加活动中遇到任何问题,消费者可咨询车享家各门店(江浙沪和马鞍山地区)。</li>
                            <li>非指定门店购买的米其林轮胎不能参加此次促销活动。</li>
                        </ul>
                    </dd>
                </dl>
            </div>
        </section>
        <Gotop></Gotop>
        <Share ref="share" @listenShare="callBackShare"></Share>
   </div>
</template>

<script>
import Gotop from "../common/gotop"
import Share from "../common/share"
export default {
    name:'michelin_index',
    data() {
        return {
           lists:[
               {title:'Energy XM 2 韧悦, 16款轮胎', des:'专为中国路况特别设计', price:'360', img:'//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/c4dd49205ff0435c8f4770d7127d0316.png'},
               {title:'Pilot Sport 3 竞驰, 4款轮胎', des:'专为入门级跑车及高性能轿车设计', price:'836', img:'//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/90cf622a66474e38907ec47b4a684778.png'},
               {title:'Primacy 3 ST 浩悦, 26款轮胎', des:'舒适静音，完美驾乘体验', price:'510', img:'//i1.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/143a278782034af7b3d21d884ca6e816.png'},
               {title:'Primacy LC 博悦, 4款轮胎', des:'更省油，更宁静，更长里程', price:'670', img:'//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/6fb15c28d2314850b47b4d695f21336f.png'},
               {title:'Primacy SUV 旅悦, 5款轮胎', des:'专为SUV消费者设计', price:'730', img:'//i3.cximg.com/img2/6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/93e07b86b74c4822972dbcf8c152766d.png'} 
           ],
           path: process.env.USER_ENV == "dev" ? '#' : this.$tpo.siteUrl
        }
    },
    created() {
        document.title = "米其林轮胎月";
    },
    mounted() {
        //打点
        (new Analytics).scan(); 
        //获取分享信息
        this.share(); 
    },
    methods: {
        //分享成功后执行
        callBackShare(){
            console.log('share success!')
        },
        //分享
        share(){
            //调用子组件initShare方法
            this.$refs.share.initShare('michelin', 'h.jia');
        },
        buyUrl(i){
           return window.location.origin + this.path + `/tyrelist?type=${i}`; 
        }
    },
    components: {
        Gotop,
        Share
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
$baseColor: #1b1bb6;
img{width:100%;max-width:100%;height:auto;}
.app-page {
    background: $baseColor;
    img {
        display:block;
    }
    .lists {
        padding: rem(10);
        li{
            background: #fff;
            border-radius: rem(4);
            padding: rem(10);
            margin-bottom: rem(10);
            &:last-child {
                margin-bottom: 0;
            }
            @at-root .flex {
                display: flex;
            }
            .simg {
                width: rem(100);
                height: rem(100);
                overflow: hidden; 
                margin-right: rem(15); 
                img {
                   max-height: 100%;
                }
            }
            .info {
                flex: 1;
                position: relative;
                width: 64%;
                .txt {
                    font-size: rem(15);
                    font-weight: normal;
                    color: $baseColor;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .des {
                    font-size: rem(13);
                    color: $baseColor;
                    opacity: .5;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .priceInfo {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    font-size: rem(11);
                    width: 100%;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    .price {                        
                        color: #FF0000;
                        font-weight: bold;
                        b {
                            font-size: rem(19);
                            padding: 0 rem(5);
                        }
                        @at-root .btn {
                            background: #1B1BB6;
                            border-radius: rem(4);
                            color: #fff;
                            width: rem(70);
                            height: rem(26);
                            line-height: rem(26);
                            display: inline-block;
                            text-align: center;
                        }
                        
                    }
                }
            }
        }
    }
    .rule {
        padding: rem(19);
        color: #fff;
        h5 {
            font-size: rem(17);
            text-align: center;
            width: rem(70);
            margin: 0 auto;
            position: relative;
            &:before, &:after {
                position: absolute;
                content: "";
                border-top: 1px solid currentColor;
                top: 50%;
                transform: translateY(-50%);
                width: rem(21);
            }
            &:before {
                left: -45%;
            }
            &:after {
                right: -45%;
            }
        }
        dl {
            line-height: 1.8;
            dt {
                font-size: rem(15);
            }
            dd {
                font-size: rem(13);
                opacity: .7;
                margin-bottom: rem(25);
                &:last-child {
                    margin-bottom: 0;
                }
                .rule-lists {
                    counter-reset: lino;
                    li{
                        padding-left: rem(10);
                        position: relative;
                        &:before {
                            counter-increment: lino;
                            content: counter(lino);
                            
                            position: absolute;
                            top:0;
                            left:0;
                        }  
                    }
                }
            }
        }
    }
}
</style>