import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import layout from '@/views/layout/layout'
import user from "@/views/user"; // 用户管理
import dashbord from "@/views/dashbord"; // 首页

import postmanagenment from "@/views/postManagement/postList"; // 帖子管理

const operational = () => import("@/views/user/userlist/operational");
const web = () => import("@/views/user/userlist/web");
const applets = () => import("@/views/user/userlist/applets");
const users = () => import("@/views/user/users/");
const addusers = () => import("@/views/user/users/adduser");

// const postList = () => import("@/views/postManagement/postList/index");




import role from "@/views/role"; // 角色管理

import commodity from "@/views/commodity"; // 商品管理

import order from "@/views/order"; // 订单管理

import advertisingspace from "@/views/advertisingspace"; // 广告位管理
import spacedetal from "@/views/advertisingspace/spacedetal"; // 广告位管理


import channel from "@/views/channel"; // 渠道管理

import datastatistics from "@/views/datastatistics"; // 数据统计

import log from "@/views/log"; // 日志管理

import message from "@/views/message"; // 留言管理

import expenditure from "@/views/expenditure"; // 收支明细

// import postmanagenment from "@/views/postManagenment"; // 帖子管理



export const constantRouterMap = [{
    path: '/login',
    component: () =>
        import('@/views/login/index'),
    hidden: true
},]

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})

export const asyncRouterMap = [{
    path: '',
    component: layout,
    redirect: 'index',
    children: [{
        path: 'index',
        component: () =>
            import('@/views/dashbord/index'),
        name: 'dashbord',
        meta: {
            title: 'dashbord',
            icon: 'el-icon-apple'
        }
    }]
},
{
    path: "/user",
    component: layout,
    name: '用户管理',
    meta: {
        title: '用户管理',
        icon: 'el-icon-user'
    },
    children: [{
        path: "/operational",
        component: operational,
        name: "operational",
        meta: {
            title: "运营后台",
            icon: 'el-icon-s-opportunity'
        }
    },
    {
        path: "/web",
        component: web,
        name: "web",
        meta: {
            title: "web后端",
            icon: 'el-icon-monitor'
        }
    },
    {
        path: "/applets",
        component: applets,
        name: "applets",
        meta: {
            title: "小程序后端",
            icon: 'el-icon-magic-stick'
        }
    },
    {
        path: "/users",
        component: users,
        name: "users",
        meta: {
            title: "用户列表",
            icon: 'el-icon-magic-stick'
        }
    },
    {
        path: "/addusers/:key/",
        component: addusers,
        name: "addusers",
        hidden: true,
        meta: {
            title: "新增用户",
            icon: 'el-icon-magic-stick'
        }
    },
    {
        path: "/editusers/:key/:id",
        component: addusers,
        name: "editusers",
        hidden: true,
        meta: {
            title: "编辑用户",
            icon: 'el-icon-magic-stick'
        }
    }
    ]
},
{
    path: '/postManagement',
    component: layout,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/postManagement/postList/index'),
        name: '帖子管理',
        meta: {
            title: '帖子管理',
            icon: 'el-icon-shopping-bag-1'
        }
    }]
},
{
    path: '/role',
    component: layout,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/role/index'),
        name: '角色管理',
        meta: {
            title: '角色管理',
            icon: 'el-icon-female'
        }
    }]
},
{
    path: '/commodity',
    component: layout,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/commodity/index'),
        name: '商品管理',
        meta: {
            title: '商品管理',
            icon: 'el-icon-shopping-bag-1'
        }
    }]
},
{
    path: '/order',
    component: layout,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/order/index'),
        name: '订单管理',
        meta: {
            title: '订单管理',
            icon: 'el-icon-set-up'
        }
    }]
},
{
    path: '/advertisingspace',
    component: layout,
    name: '广告位管理',
    meta: {
        title: '广告位管理',
        icon: 'el-icon-crop'
    },
    children: [
        {
            path: 'index',
            component: () =>
                import('@/views/advertisingspace/index'),
            name: '广告位管理',
            meta: {
                title: '广告位管理',
                icon: 'el-icon-crop'
            }
        },
        {
            path: '/spacedetal/:key/:id',
            component: () =>
                import('@/views/advertisingspace/spacedetal'),
            name: 'spacedetal',
            hidden: true,
            meta: {
                title: '广告位处理',
                icon: 'el-icon-crop'
            }
        },
    ]
},
{
    path: '/channel',
    component: layout,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/channel/index'),
        name: '渠道管理',
        meta: {
            title: '渠道管理',
            icon: 'el-icon-wind-power'
        }
    }]
},

{
    path: '/datastatistics',
    component: layout,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/datastatistics/index'),
        name: '数据统计',
        meta: {
            title: '数据统计',
            icon: 'el-icon-coin'
        }
    }]
},
{
    path: '/log',
    component: layout,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/log/index'),
        name: '日志管理',
        meta: {
            title: '日志管理',
            icon: 'el-icon-document'
        }
    }]
},
{
    path: '/message',
    component: layout,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/message/index'),
        name: '留言管理',
        meta: {
            title: '留言管理',
            icon: 'el-icon-edit-outline'
        }
    }]
},
{
    path: '/expenditure',
    component: layout,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/expenditure/index'),
        name: '收支明细',
        meta: {
            title: '收支明细',
            icon: 'el-icon-pie-chart'
        }
    }]
},

{
    path: '/error',
    component: layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
        title: 'errorPages',
        icon: 'el-icon-delete'
    },
    children: [{
        path: '401',
        component: () =>
            import('@/views/errorPage/401'),
        name: 'Page401',
        meta: {
            title: 'page401',
            noCache: true
        }
    },
    {
        path: '404',
        component: () =>
            import('@/views/errorPage/404'),
        name: 'Page404',
        meta: {
            title: 'page404',
            noCache: true
        }
    }
    ]
},


]