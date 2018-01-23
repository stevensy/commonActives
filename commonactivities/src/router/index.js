import Vue from 'vue'
import Router from 'vue-router'
import { checkUserInfo } from "../../../utils/checkLogin"
const commonactives = resolve => require(['../components/index'], resolve);

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [{
        path: '/',
        name: 'commonactives',
        component: commonactives
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