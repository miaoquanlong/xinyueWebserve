
import layout from "@/views/layout/layout";
const operational = () => import("@/views/user/userlist/operational");
const web = () => import("@/views/user/userlist/web");
const applets = () => import("@/views/user/userlist/applets");


// const hospital = () => import("@/views/client/hospital/hospital");
// const hospitalNew = () => import("@/views/client/hospital/hospitalNew");
// const hospitalEdit = () => import("@/views/client/hospital/hospitalEdit");
// const doctors = () => import("@/views/client/doctors/list");
// const doctorsNew = () => import("@/views/client/doctors/new");
// const doctorsEdit = () => import("@/views/client/doctors/edit");
// const dealer = () => import("@/views/client/dealer/list");
// const dealerNew = () => import("@/views/client/dealer/new");
// const dealerEdit = () => import("@/views/client/dealer/edit");
// const dealerassociation = () => import("@/views/client/dealerassociation/list");
// const dealerassociationNew = () => import("@/views/client/dealerassociation/new");
// const star = () => import("@/views/client/star/list");
const clientRouter = {
    path: "/user",
    component: layout,
    redirect: "/user/userlist",
    name: "client",
    meta: {
        title: "用户管理",
        icon: "peoples",
        Sequence: 1
    },
    children: [
        {
            path: "operational",
            component: operational,
            name: "运营后台",
            meta: {
                title: "运营后台",
            }
        },
        {
            path: "web",
            component: web,
            name: "web后端",
            meta: {
                title: "web后端",
            }
        },
        {
            path: "applets",
            component: applets,
            name: "小程序后端",
            meta: {
                title: "小程序后端",
            }
        },
        // {
        //     path: "hospital/new",
        //     component: hospitalNew,
        //     name: "hospitalNew",
        //     meta: { title: "新增医院", Sequence: 9 },
        //     hidden: true
        // },
        // {
        //     path: "hospital/edit/:id",
        //     component: hospitalEdit,
        //     name: "hospitalEdit",
        //     meta: {
        //         title: "编辑医院",
        //         Sequence: 818
        //     },
        //     hidden: true
        // },
        // {
        //     path: "doctors",
        //     component: doctors,
        //     name: "doctors",
        //     meta: {
        //         title: "医生",
        //         Sequence: 2
        //     }
        // },
        // {
        //     path: "doctors/new",
        //     component: doctorsNew,
        //     name: "doctorsNew",
        //     meta: {
        //         title: "新增医生",
        //         Sequence: 3
        //     },
        //     hidden: true
        // },
        // {
        //     path: "doctors/edit/:id",
        //     component: doctorsEdit,
        //     name: "doctorsEdit",
        //     meta: {
        //         title: "编辑医生",
        //         Sequence: 4
        //     },
        //     hidden: true
        // },
        // {
        //     path: "dealer",
        //     component: dealer,
        //     name: "dealer",
        //     meta: {
        //         title: "经销商",
        //         Sequence: 15
        //     }
        // },
        // {
        //     path: "dealer/new",
        //     component: dealerNew,
        //     name: "dealerNew",
        //     meta: {
        //         title: "经销商新增",
        //         Sequence: 16
        //     },
        //     hidden: true
        // },
        // {
        //     path: "dealer/edit/:id",
        //     component: dealerEdit,
        //     name: "dealerEdit",
        //     meta: {
        //         title: "经销商编辑",
        //         Sequence: 19
        //     },
        //     hidden: true
        // },
        // {
        //     path: "dealerassociation",
        //     component: dealerassociation,
        //     name: "dealerassociation",
        //     meta: {
        //         title: "经销商关联",
        //         Sequence: 20
        //     }
        // },
        // {
        //     path: "dealerassociation/:id",
        //     component: dealerassociationNew,
        //     name: "dealerassociationNew",
        //     meta: {
        //         title: "经销商关联子页面",
        //         Sequence: 22
        //     },
        //     hidden: true
        // },
        // {
        //     path: "star",
        //     component: star,
        //     name: "star",
        //     meta: {
        //         title: "星级管理",
        //         Sequence: 23
        //     }
        // }
    ]
};

export default clientRouter;
