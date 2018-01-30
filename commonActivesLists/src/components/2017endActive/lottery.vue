<template>
	<div id="lottery" class="lottery">
        <div class="out"></div>
        <div class="in" @click="bindRotate" ca="2017sgzz_dzp_cj$大转盘抽奖"></div>
	</div>  
</template>

<script>
import {isApp, isWeixin, getQueryString} from "../../../../utils/common";
import Vue from "vue"
export default {
	props:["initApi", "prizeApi", "isShare", "fn"],
	name: 'lottery',
	data() {
		return {
			isLogin: false,//当前是否登录			 
			prize: '', //去后端拿到的奖项 
			isPc: !(isApp()||isWeixin()),//是否是pc 
			queryString: {                     
					userInfo: JSON.stringify(getQueryString('userInfo')) != "{}" ? getQueryString('userInfo') : '',//app中userInfo信息
					carInfo:JSON.stringify(getQueryString('carInfo')) != "{}" ? getQueryString('carInfo') : ''//app中carInfo信息
                },
			//抽奖相关参数
			lottery:{
				len: 4, //几等分
				msgArr: [{
					//未抽中未分享第一次
					isShow:true,
					txt: "很遗憾！",
					des: "奖品与您擦肩而过。",
					tips: "分享多赢一次抽奖机会",
					btnTxt: "我知道了",
					btnUrl: ""
				}, {
					//未抽中未分享或分享第二次
					isShow:true,
					title: "很遗憾！",
					des: "奖品与您擦肩而过。",
					tips: "",
					btnTxt:"我知道了",
					btnUrl:""
				}, {
					//抽中
					isShow:true,
					title: "恭喜您！",
					des: "抽中",
					tips: "友情提示：需要购买车享家冬季保养套餐才能得到这个奖品哦！",
					btnTxt: "填写收货地址",
					btnUrl:"/m/address/index.htm"
				}, {
					//抽中过了没有分享
					isShow:true,
					title: "不要贪心哦！",
					des: "您已抽过奖了哦！",
					tips: "分享多赢一次抽奖机会",
					btnTxt: "我知道了",
					btnUrl:""
				}, {
					//抽中过了也分享了
					isShow:true,
					title: "不要贪心哦！",
					des: "您已抽过奖了哦，把机会留给别人吧！",
					tips: "",
					btnTxt: "我知道了",
					btnUrl:""
				},{
					//活动未开始
					isShow:true,
					title: "抱歉",
					des: "活动暂未开始",
					tips: "",
					btnTxt: "我知道了",
					btnUrl:""
				},{
					//活动已结束
					isShow:true,
					title: "抱歉",
					des: "活动已结束",
					tips: "",
					btnTxt: "我知道了",
					btnUrl:""
				},{
					//系统异常
					isShow: true,
					title:"抱歉",
					des:"活动太火爆了，稍后试试",
					tips:"",
					btnTxt:"我知道了",
					btnUrl:""

				}], //提示
				turns: 3, //转几圈
				isCenter: true, //指针是否指在某一奖项的中间位置
				isTrue: true, //运行开关
				index: 0, //当前运行次数
				less: 0, //偏差
				limit: 50, //抽奖次数
				myPirze: [], //中奖的奖项
				//btn: document.querySelector(".in"), //执行抽奖的btn
				turnRound: '', //需要旋转的dom
				timer: "",
				duration: 3000,
				mapDeg: "", //奖项的角度
				noPrizeDeg:[],//不中的角度
				ycMsg:"抱歉，活动太火爆了，稍后试试",//异常toast
				isStarted:0,//是否开始 0：不是 1：是
				isEnded:0//是否结束 0：不是 1：是
			}
		}
    },
    created(){
		//置顶
		window.scrollTo(0,0);
		//中奖之后需要进入个人中心修改地址页面
	   let changeAddUrl = this.lottery.msgArr[2].btnUrl;
	   this.lottery.msgArr[2].btnUrl = this.testENV("member") + changeAddUrl;

    },
    mounted(){
		//打点
        (new Analytics).scan(); 
		//转盘初始化
		this.init();  
    },
	methods:{	
		//如果是pc,弹窗处理
		changeMsg(n, flag){
			if(flag){
				this.lottery.msgArr[n].btnTxt = "去分享";
                this.lottery.msgArr[n].btnUrl = this.fn;
			}else{
				this.lottery.msgArr[n].btnTxt = "我知道了";
                this.lottery.msgArr[n].btnUrl = "";
			}
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
		//去登录
		toLogin(){          	 
			let backUrl = window.location.href,
				userInfoExist = backUrl.indexOf("userInfo=") > -1,
				carInfoExist = backUrl.indexOf("carInfo=") > -1;
			if (userInfoExist) {
				backUrl = backUrl.substring(0, backUrl.indexOf("userInfo=")-1) + "?userInfo=" + this.queryString.userInfo.userInfo
			}else if (carInfoExist) {
				backUrl = backUrl.substring(0, backUrl.indexOf("carInfo=")-1) + "?carInfo=" + this.queryString.carInfo.carInfo
			}					
			window.location.href = this.testENV("cxj.activity") + "/service/error/user_not_logined?backUrl=" + encodeURIComponent(backUrl);          
		},
		//初始化：1.参数指定 2.奖项对应角度 3.按钮绑定旋转相关事件
        init() {
			//登录请求抽奖接口 
			this.lotteryInit();
			let btn = document.querySelector(".in"); //需要旋转的btn
			this.changeOps({turnRound:btn});
			this.getcCircleCenter();            
        },
		//改变默认参数
        changeOps(ops) {
            for (var i in ops) {
                this.lottery[i] = ops[i]
            }
		},
		//请求后端初始化转盘
		lotteryInit(){
			console.log("init...")
			this.$ajax.get(this.initApi, {}, {
				timeout:5000
			}).then(res => {
				//接回返回loading消失
				this.isShowLoading("none");
				//res.resutl 是数字1	
				console.log("init lottery:====>", res)			
               if(res.result){
				   //是否开始
				    let t = this.lottery;
				    if(res.errorCode == '0006'){
					   t.isStarted = 1;
				    }else if(res.errorCode == '0007'){
                       t.isEnded = 1;
				    }else{						 
						let data = res.obj;					
						//奖项角度映射
						this.toDep(data);
						console.log("ready...")
				    }
			   }else{
                  this.$Toast({
					  content:this.ycMsg
				  })
			   }
			}, err => {
				//接口异常处理				
				this.isShowLoading("none");
				this.$Toast({
                    content:this.ycMsg
                })
			});
		},
        //奖项对应度数
        toDep(data) {
            let t=this.lottery, per = 360 / t.len,
                perDeg = 0,
                degArr = [];
            for (let i = 0, len = t.len; i < len; i++) {
                if (t.isCenter) {
                    perDeg = per * (i + 1) - per;
                } else {
                    perDeg = per * (i + 1) - per / 2;
				}
				//每一份奖项的度数
                degArr.push(perDeg);
			}
			//中奖与不中奖度数确定
			t.mapDeg = new Map();
			let newDegArr = degArr;
			data.forEach((item, index) => {	
				//设置的奖项写入map
				t.mapDeg.set(index, parseInt(item.location));			
                degArr.forEach((li, i) => {	                 
                    if(parseInt(item.location) == li) {                       
					   newDegArr.splice(i, 1);
					} 
			    })
			})
			let size = t.mapDeg.size;
			//剩下的不中奖的度数
			for(let i=0;  i<newDegArr.length; i++){	
			  t.noPrizeDeg.push(newDegArr[i]);
              t.mapDeg.set(size+i, newDegArr[i]);	 
			}
			
            //自定义图中奖项与对应度数
            console.log("mapDeg:", t.mapDeg);
		},
        //返回奖项
        returnmyPirze() {
            return this.lottery.myPirze;
        },        
        //后端请求返回奖项
        getPrize() {         
			//登录成功请求后端抽奖接口		 
			this.isShowLoading("block");
			this.$ajax.get(this.prizeApi, {}, {
				timeout:5000
			}).then(res => {
				this.isShowLoading("none");
				console.log("data:==>",res)
				if(res.result){
					
					if(res.errorCode=="-99"){
						//没有登录，去登录
                        this.toLogin();
					}else{
						this.isLogin = true;

						let t = this.lottery, code =res.obj.code, prizetoMsg = this.mapArrtoMsg(code), obj = res.obj.msg, 
						    ops={
                                startTime: +new Date,
								startAngle: 0
							};					
						t.index++;
						console.log("点击次数：", t.index);			          

						if (t.timer) clearTimeout(t.timer);

						if(code=="0000"){//中奖
                            ops.toAngle = parseInt(obj.location),//奖项的角度
							ops.msg = t.msgArr[prizetoMsg]//奖项角度对应的msg
							 
							//抽中把奖项名称放入msgArr中	
							ops.msg.des = "抽中" + obj.prizeName;
							//中奖的奖项push到myPrize
							t.myPirze.push(obj.prizeName);

						}else{//没有中奖
                            ops.toAngle = t.noPrizeDeg[this.randomnum(0, t.noPrizeDeg.length)],//随机一个不中奖的角度
							ops.msg = t.msgArr[prizetoMsg]//奖项角度对应的msg	
							//第一次未中，按钮改成去分享							 
							if( (code=="0002" || code=="0005") && this.isPc){
                                this.changeMsg(prizetoMsg, true);
							}else{
								this.changeMsg(prizetoMsg, false);
							}												 
						}
						console.log("中奖参数：", ops);					
						this.animate(ops, this.result); 
					}
				}else{
					this.isShowLoading("none");
					this.$Toast({
						content:this.ycMsg
					})
				}
			}, err =>{
				this.isShowLoading("none");
				this.$Toast({
					content:this.ycMsg
				})
			})
		},
		//奖项与msg映射
		mapArrtoMsg(code){
           switch(code){
			   case  '0000': //中奖
						return 2;
						break;
				case  '0002': //第一次未中
						return 0;
						break;
				case  '0003'://第二次未中
						return 1;
						break;
				case  '0004'://已中过已分享
						return 4;
						break;
				case  '0005'://已中过未分享
						return 3;
						break;
			    case  '0006'://活动未开始
						return 5;
						break;
				case  '0007'://活动已结束
						return 6;
						break;
				default ://系统异常
				        return 7;
		   } 
		},
		//loading显示与隐藏
		isShowLoading(str){
           this.$parent.$refs.loading.$el.style['display'] = str;
		},
        //奖项提示，并把运行开关开启
        result(t, ops) {
            t.tips(ops.msg)
            t.lottery.isTrue = true;
        },
        bindRotate() {				
			let t = this.lottery;
            if (t.isTrue) {
				if (t.index >= t.limit) {
					console.log("您已经没有次数抽奖了,抽到奖品个数：", t.myPirze.length);	
					// if(t.myPirze.length){//已经抽到奖
					//  // console.log('您已中过：', t.msgArr[3])
					//    t.msgArr[3].isShow = true,
                    //    this.tips(t.msgArr[3]);
					// }else{//没有抽到奖
					//    let num = this.isShare ? 1:0;
					//    t.msgArr[num].isShow = true,
                    //    this.tips(t.msgArr[num]);
					// }				 
				} else {
					if(t.isStarted){
						//未开始提示
						this.tips(t.msgArr[5])
					}else if(t.isEnded){						
						//结束提示
                        this.tips(t.msgArr[6])
					}else{
                        this.getPrize();
					}
									
				}
			}else{
				console.log("您好贪心哦")
			}
			
        },
        //旋转动画
        animate(ops, fn) {
            let t = this.lottery, nowTime = +new Date,
                toAngle = ops.toAngle + t.turns * 360,
				isEnd = nowTime - ops.startTime > t.duration;				
            if (isEnd) {
                //旋转结束
                clearTimeout(this.timer);
                fn && fn(this, ops);
            } else {
				let _t = this;
                _t.timer = setTimeout(function() {
                    let angle = _t.easing(0, nowTime - ops.startTime, ops.startAngle, toAngle - ops.startAngle, t.duration); 
				   _t.rotate(angle);
                    _t.animate(ops, fn);
                }, 10);
            }
        },
        //dom旋转,回调
        rotate(angle) {			
            if (Array.isArray(this.lottery.turnRound)) {
                for (var i in this.lottery.turnRound) {
					let deg = "rotate(" + angle + "deg)";
					css3PostCss(this.lottery.turnRound[i], "Transform", deg);
                }
            } else {				
				let deg = "rotate(" + angle + "deg)";
				this.css3PostCss(this.lottery.turnRound, "Transform", deg);
            }
            this.lottery.isTrue = false;
		},
		//css3属性加前缀
		css3PostCss(obj, proto, val){
			let webkitPro = 'webkit'+proto,
				mozPro = 'moz' + proto,
				msPro = 'ms' + proto,
				oPro = 'o' + proto;
			obj.style[webkitPro] = val;
			obj.style[mozPro] = val;
			obj.style[oPro] = val;
			obj.style[msPro] = val;
		},
        //随机两个数
        randomnum(min, max) { // 获取2个值之间的随机数
            return Math.floor(Math.random() * (max - min) + min)
        },

        //旋转缓冲公式
        easing(x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        //弹窗提示
        tips(msg) {
			//显示弹窗
			msg.isShow = true;
			this.$emit("listenMsg", msg);
        },
        //寻找旋转的圆心
        getcCircleCenter() {
            let w = parseInt(getComputedStyle(this.lottery.turnRound).width),
                h = parseInt(getComputedStyle(this.lottery.turnRound).height),
                min = Math.min(w, h),
                max = Math.max(w, h),
				rate = ((max - min) + min / 2) / max * 100 + "%",
				ori = "50% " + rate;
			this.css3PostCss(this.lottery.turnRound, 'TransformOrigin', ori)
        }
		
	}
	 
}
</script>
<style lang="scss" scoped>
ul,li,div{padding:0;margin:0;}    
ul,li{list-style: none;}
img{width:100%;max-width:100%;height:auto;}
/*转盘*/

.lottery {
	width:rem(349);
	height:rem(349);
	margin:0 auto;
	position: relative;
	top:rem(-70);
    .out {
		width: 100%;
		height: 100%;
		background: url(../../assets/images/2017endActive/draw.png) no-repeat;
		background-size:100%;
 
	}
	.in {
		width: rem(91);
		height: rem(103);
		position: absolute;
		background: url(../../assets/images/2017endActive/start.png) no-repeat;
		background-size:100%;
		top: rem(123);
		left: rem(130);
	}
}
.disabled {pointer-events: none;}
</style>
