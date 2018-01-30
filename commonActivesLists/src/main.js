// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Toast } from 'tpo/src/index'
import App from './App';
import router from './router';
import 'tpo/lib/index.css';
import { tpostore, vuext } from "./vuext";
import tpodata from "./tpodata"
import ajax from "../../utils/axios";
import { checkUserInfo } from "../../utils/checkLogin"
import 'es6-promise/auto'
/**
 * 如果想要单独引入TPO组件的某一个组件 做法如下(首先修改package.json 至少"tpo":"1.0.6" )
 * 1 import {Switch} from 'tpo/src/index'
 * 2 Vue.component(Switch.name, Switch);如果是属性插件  
 *  Vue.$Picker = Vue.prototype.$Picker = Picker;
    Vue.$Toast = Vue.prototype.$Toast = Toast;
 * 3 删除原来的tpo引入
 * 4 去除 Vue.use(Tpo)
 * 5 修改 webpack.base.conf.js  19 行 useAllTpo: false
 * 
 * 
 */

Vue.$Toast = Vue.prototype.$Toast = Toast;
//Vue.component(Loading.name, Loading);
Vue.use(vuext);

/* eslint-disable no-new */
checkUserInfo().then(() => {
    new Vue({
        el: '#app',
        router,
        tpostore: tpodata,
        template: '<App/>',
        components: { App }
    });
})