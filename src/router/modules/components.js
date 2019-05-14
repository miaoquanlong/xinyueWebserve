/** When your routing table is too long, you can split it into small modules**/

import layout from '@/views/layout/layout'

const componentsRouter = {
    //   path: '/components',
    //   component: layout,
    //   redirect: 'noredirect',
    //   name: 'ComponentDemo',
    //   meta: {
    //     title: 'components',
    //     icon: 'component'
    //   },
    //   children: [
    //     {
    //       path: 'tinymce',
    //       component: () => import('@/views/components-demo/tinymce'),
    //       name: 'TinymceDemo',
    //       meta: { title: 'tinymce' }
    //     },
    //   ]

    path: '/user',
    component: layout,
    redirect: '/user/userList/operational',
    name: '用户管理',
    meta: {
        title: '用户管理',
        icon: 'user'
    },
    children: [
        {
            path: "/operational",
            component: () => import("@/views/user/userlist/operational"),
            name: "运营后台",
            meta: {
                title: "运营后台",
            }
        },
        {
            path: "/web",
            component: () => import("@/views/user/userlist/web"),
            name: "web后端",
            meta: {
                title: "web后端",
            }
        },
        {
            path: "/applets",
            component: () => import("@/views/user/userlist/applets"),
            name: "小程序后端",
            meta: {
                title: "小程序后端",
            }
        },

    ]
}

export default componentsRouter
