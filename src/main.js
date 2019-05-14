import Vue from 'vue'
import App from './App.vue'
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import Cookies from "js-cookie";
import router from "@/router/index";
import store from "./store";
import * as _ from "lodash";
// import "./icons"; // 图标
import "./permission"; // 权限控制

import "@/styles/index.scss"; // global css
import * as filters from "./filter"; // global filters

Vue.use(Element, {
    size: Cookies.get("size") || "medium", // set element-ui default size
});

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
