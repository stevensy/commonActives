import ajax from "./axios";
import { isdev } from "./common";
const thisHost = window.location.host;
const hrefUrl = window.location.href;
export const checkUserInfo = (forceLogin) => {
    // if(thisHost.indexOf('activity') > -1){
    //     window.location.href = "/user/toLogin.htm?targetUrl=" + encodeURIComponent(window.location.href);
    //     return;
    // }
    return new Promise((resolve, reject) => {

        let ajaxUrl = "/user/checkLogin.htm"; //登录接口
        if (thisHost.indexOf("h.jia") || thisHost.indexOf("local")) {
            let userInfoExist = hrefUrl.indexOf("userInfo=") > -1;
            let carInfoExist = hrefUrl.indexOf("carInfo=") > -1;
            if (userInfoExist) {
                ajaxUrl = ajaxUrl + "?" + decodeURIComponent(hrefUrl.substring(hrefUrl.indexOf("userInfo=")));
            }
            else if (carInfoExist) {
                ajaxUrl = ajaxUrl + "?" +decodeURIComponent(hrefUrl.substring(hrefUrl.indexOf("carInfo=")));
            }

            if (userInfoExist || carInfoExist || forceLogin) {
                ajax.get(ajaxUrl).then(function (res) {
                    if (forceLogin && res.result == 0) {
                            window.location.href = "/user/toLogin.htm?targetUrl=" + encodeURIComponent(window.location.href);
                    } else {
                    	resolve()
                    }
                }, function (error) {
                    resolve()

                });
            }else{
                resolve()
            }
        }
    })

}

