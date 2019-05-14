import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);


import layout from "@/views/layout/layout";

import login from '../views/login/index'
import regest from '../views/regests/index'
import user from "@/views/user"; // 用户管理
const operational = () => import("@/views/user/userlist/operational");
const web = () => import("@/views/user/userlist/web");
const applets = () => import("@/views/user/userlist/applets");

import role from "./modules/role"; // 角色管理

import commodity from "./modules/commodity"; // 商品管理

import order from "./modules/order"; // 订单管理

import advertisingspace from "./modules/advertisingspace"; // 广告位管理

import channel from "./modules/channel"; // 渠道管理

import datastatistics from "./modules/datastatistics"; // 数据统计

import log from "./modules/log"; // 日志管理

import message from "./modules/message"; // 留言管理

import expenditure from "./modules/expenditure"; // 收支明细




export const constantRouterMap = [
    {
        path: "/login",
        component: login,
        name: '登陆'
    },
    {
        path: "/regest",
        component: regest,
        name: '注册'
    },
    {
        path: "/user",
        component: user,
        name: '用户管理',
        children: [
            {
                path: "/operational",
                component: operational,
                name: "运营后台",
                meta: {
                    title: "运营后台",
                }
            },
            {
                path: "/web",
                component: web,
                name: "web后端",
                meta: {
                    title: "web后端",
                }
            },
            {
                path: "/applets",
                component: applets,
                name: "小程序后端",
                meta: {
                    title: "小程序后端",
                }
            },
        ]
    },
    {
        path: "/role",
        component: role,
        name: '角色管理'
    },
    {
        path: "/commodity",
        component: commodity,
        name: '商品管理'
    },
    {
        path: "/order",
        component: order,
        name: '订单管理'
    },
    {
        path: "/advertisingspace",
        component: advertisingspace,
        name: '广告位管理'
    },
    {
        path: "/channel",
        component: channel,
        name: '渠道管理'
    },
    {
        path: "/datastatistics",
        component: datastatistics,
        name: '数据统计'
    },
    {
        path: "/log",
        component: log,
        name: '日志管理'
    },
    {
        path: "/message",
        component: message,
        name: '留言管理'
    },
    {
        path: "/expenditure",
        component: expenditure,
        name: '收支明细'
    },
]



export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});

export const asyncRouterMap = [{ path: "*", redirect: "/404", hidden: true }];
