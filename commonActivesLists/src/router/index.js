import Vue from 'vue'
import Router from 'vue-router'
import { checkUserInfo } from "../../../utils/checkLogin"
const index = resolve => require(['../components/2017endActive/index'], resolve);
const sh = resolve => require(['../components/2017endActive/sh'], resolve);
const rule = resolve => require(['../components/2017endActive/rule'], resolve);
const prize = resolve => require(['../components/2017endActive/getPrize'], resolve);
const michelin = resolve => require(['../components/michelin/index'], resolve);
const tyrelist = resolve => require(['../components/michelin/tyrelist'], resolve);
Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'index',
        forceLogin: false,
        component: index
    }, {
        path: '/sh',
        name: 'sh',
        forceLogin: false,
        component: sh
    }, {
        path: '/rule',
        name: 'rule',
        forceLogin: false,
        component: rule
    }, {
        path: '/prize',
        name: 'prize',
        forceLogin: false,
        component: prize
    }, {
        path: '/michelin',
        name: 'michelin',
        forceLogin: false,
        component: michelin
    }, {
        path: '/tyrelist',
        name: 'tyrelist',
        forceLogin: false,
        component: tyrelist
    }]
})

router.beforeEach((to, from, next) => {
    router.options.routes.forEach(function(element) {
        if (element.forceLogin && element.path === to.path) {
            checkUserInfo(true).then(() => {
                next();
            })

        } else {
            next();
        }
    });
})

export default router;