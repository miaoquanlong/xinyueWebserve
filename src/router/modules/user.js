
import layout from "@/views/layout/layout";
const operational = () => import("@/views/user/userlist/operational");
const web = () => import("@/views/user/userlist/web");
const applets = () => import("@/views/user/userlist/applets");
const clientRouter = {
    path: "/user",
    component: layout,
    redirect: "/user/operational",
    name: "client",
    meta: {
        title: "用户管理",
        icon: "peoples",
        Sequence: 1
    },
    children: [
        {
            path: "/user/operational",
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
};

export default clientRouter;
