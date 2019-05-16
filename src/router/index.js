import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import layout from '@/views/layout/layout'
// import regest from '../views/regests/index'
import user from "@/views/user"; // 用户管理
import dashbord from "@/views/dashbord"; // 首页

const operational = () =>
    import ("@/views/user/userlist/operational");
const web = () =>
    import ("@/views/user/userlist/web");
const applets = () =>
    import ("@/views/user/userlist/applets");

import role from "@/views/role"; // 角色管理

import commodity from "@/views/commodity"; // 商品管理

import order from "@/views/order"; // 订单管理

import advertisingspace from "@/views/advertisingspace"; // 广告位管理

import channel from "@/views/channel"; // 渠道管理

import datastatistics from "@/views/datastatistics"; // 数据统计

import log from "@/views/log"; // 日志管理

import message from "@/views/message"; // 留言管理

import expenditure from "@/views/expenditure"; // 收支明细


export const constantRouterMap = [{
    path: '/login',
    component: () =>
        import ('@/views/login/index'),
    hidden: true
}, ]

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
                import ('@/views/dashbord/index'),
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
        ]
    },
    {
        path: '/role',
        component: layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/role/index'),
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
                import ('@/views/commodity/index'),
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
                import ('@/views/order/index'),
            name: '订单管理',
            meta: {
                title: '订单管理',
                icon: 'el-icon-s-order'
            }
        }]
    },
    {
        path: '/advertisingspace',
        component: layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/advertisingspace/index'),
            name: '广告位管理',
            meta: {
                title: '广告位管理',
                icon: 'el-icon-crop'
            }
        }]
    },
    {
        path: '/channel',
        component: layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/channel/index'),
            name: '渠道管理',
            meta: {
                title: '渠道管理',
                icon: 'el-icon-umbrella'
            }
        }]
    },

    {
        path: '/datastatistics',
        component: layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/datastatistics/index'),
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
                import ('@/views/log/index'),
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
                import ('@/views/message/index'),
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
                import ('@/views/expenditure/index'),
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
                    import ('@/views/errorPage/401'),
                name: 'Page401',
                meta: {
                    title: 'page401',
                    noCache: true
                }
            },
            {
                path: '404',
                component: () =>
                    import ('@/views/errorPage/404'),
                name: 'Page404',
                meta: {
                    title: 'page404',
                    noCache: true
                }
            }
        ]
    },


]