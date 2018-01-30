import { myPostion } from "../../../../../utils/common"
import decodeBase64 from "../../../assets/js/decodeBase64"
const toUrl = (source, position, t) => {
    //因为有区，临时用areaCode判断
    let cityName = position.selectedCityName||position.cityName;
    let condition = (source == "/") ? /^3101/.test(position.areaCode) || cityName.indexOf("上海") > -1 : !(/^3101/.test(position.areaCode) || cityName.indexOf("上海") > -1);
    if (condition) { 
        window.location.replace(t.cHref)
    }
}

//获取城市定位
const getCity = (t, source) => {
    if (t.query == 1) {
        if (t.isApp) {
            if (t.userInfo) {
                //app取UserInfo中的定位
                let position = JSON.parse(decodeURIComponent(decodeBase64(t.userInfo)));
                toUrl(source, position, t);
            } else {
                if (localStorage.getItem("position")) {
                    let position = JSON.parse(localStorage.getItem("position"));
                    toUrl(source, position, t);
                } else if (window.lb) {
                    //没有userInfo，就取lb中的定位
                    lb.geolocation(data => {
                        if (data.result.errorCode == '0') {
                            toUrl(source, data.result.text, t);
                        }

                    })
                }

            }

        } else {
            let condition = source == "/" ? t.sesstionCity ? t.sesstionCity == "上海市" : null : t.sesstionCity ? t.sesstionCity != "上海市" : null;
            if (condition) {
                window.location.href = t.cHref;
            } else {
                //h5定位
                myPostion().then(data => {
                    let position = data.addressComponent.province;
                    //城市写入sesstion
                    if (window.sessionStorage) {
                        sessionStorage.setItem("city", position)
                    }
                    let condition1 = source == "/" ? position == "上海市" : position != "上海市"
                    if (condition1) {
                        window.location.href = t.cHref
                    }
                })
            }
        }
    }
}

export default getCity;