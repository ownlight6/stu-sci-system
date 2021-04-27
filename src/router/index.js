import Vue from "vue"
import Router from "vue-router"

import layout from "../layout/index.vue"
import login from "../view/student/login.vue"
import about from "../view/common/about.vue"

import stuAdd from "../view/student/add.vue"
import stuList from "../view/student/list.vue"
import couAdd from "../view/counselor/add.vue"
import couList from "../view/counselor/list.vue"
import couCheck from "../view/counselor/check.vue"
import couSort from "../view/counselor/sort.vue"
import couStu from "../view/counselor/student.vue"

Vue.use(Router)

const router = new Router({
    mode: "history",
    base: "/stuSciSystem/",
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            name: login,
            component: login,
            meta: {
                title: "登录 | 大学生课外科技活动成果管理系统"
            }
        },
        {
            path: "/student",
            redirect: "/student/add"
        },
        {
            path: "/counselor",
            redirect: "/counselor/add"
        },
        {
            path: "",
            component: layout,
            children: [
                {
                    path: "/student/add",
                    name: stuAdd,
                    component: stuAdd,
                    meta: {
                        title: "添加成果 | 大学生课外科技活动成果管理系统"
                    }
                },
                {
                    path: "/student/list",
                    name: stuList,
                    component: stuList,
                    meta: {
                        title: "成果列表 | 大学生课外科技活动成果管理系统"
                    }
                },
                {
                    path: "/counselor/add",
                    name: couAdd,
                    component: couAdd,
                    meta: {
                        title: "添加属性 | 大学生课外科技活动成果管理系统"
                    }
                },
                {
                    path: "/counselor/list",
                    name: couList,
                    component: couList,
                    meta: {
                        title: "成果列表 | 大学生课外科技活动成果管理系统"
                    }
                },
                {
                    path: "/counselor/check",
                    name: couCheck,
                    component: couCheck,
                    meta: {
                        title: "成果审核 | 大学生课外科技活动成果管理系统"
                    }
                },
                {
                    path: "/counselor/sort",
                    name: couSort,
                    component: couSort,
                    meta: {
                        title: "成果排序 | 大学生课外科技活动成果管理系统"
                    }
                },
                {
                    path: "/counselor/stu",
                    name: couStu,
                    component: couStu,
                    meta: {
                        title: "学生列表 | 大学生课外科技活动成果管理系统"
                    }
                },
                {
                    path: "/about",
                    name: about,
                    component: about,
                    meta: {
                        title: "关于 | 大学生课外科技活动成果管理系统"
                    }
                }
            ]
        }
    ]
})


//动态网页title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router;
