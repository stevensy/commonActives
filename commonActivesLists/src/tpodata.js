const tpodata = { //公用数据
    siteUrl: "/cx/cxj/cxjappweb/commonActivesLists/index.shtml#",
    endActive2017: { //2017endActive 分享信息
        all: {
            title: "迎新大促，车享家全场进口机油5折起",
            desc: "上汽直营，百城千店，品牌认证，品质保证，1次大保养套餐2次小保养套餐+4项美容养护服务 ，满足你一年四季养车需求",
            link: "",
            imgUrl: "share.jpg"
        },
        sh: {
            title: "迎新大促，车享家全场进口机油5折起",
            desc: "上汽直营，百城千店，品牌认证，品质保证，1次大保养套餐2次小保养套餐+4项美容养护服务 ，满足你一年四季养车需求",
            link: "",
            imgUrl: "share.jpg"
        },
        lottery: {
            title: "车享换新节，买保养套餐卡赢千元旅游金！",
            desc: "全场保养５折起，另送价值536元四季关爱礼包及免费蘑菇钉补胎，满足你一年四季养车需求",
            link: "",
            imgUrl: "share.jpg"
        },
    },
    michelin: {
        title: "购米其林轮胎，赢米其林星级大餐",
        desc: "米其林轮胎月，惊喜好礼送不停",
        link: "",
        imgUrl: ""
    },
    imgPath(oPath = '2017endActive') {
        const domain = window.location.hostname;
        var path = "";
        if (domain.indexOf("sit") > -1) {
            path = "https://s1.chexiangsit.com"
        } else if (domain.indexOf("pre") > -1) {
            path = "https://s1.chexiangpre.com"
        } else {
            path = "https://s1.cximg.com"
        }
        return path += "/cms/wap/resource/chexiangjiaM/active/" + oPath + "/";
    }
}


export default tpodata;