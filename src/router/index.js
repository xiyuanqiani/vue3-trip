import {createRouter,createWebHashHistory} from 'vue-router'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/",
            redirect:"/home"
        },
        {
            path:"/home",
            component:()=>import("@/views/home/home.vue")
        },
        {
            path:"/favor",
            component:()=>import("@/views/favor/favor.vue")
        },
        {
            path:"/message",
            component:()=>import("@/views/message/message.vue")
        },
        {
            path:"/order",
            component:()=>import("@/views/order/order.vue")
        },
        {
            path:"/city",
            component:()=>import("@/views/city/city.vue"),
            // 转到city时隐藏tabbar
            meta:{
                hideTabbar:true
            }
        },
        {
            path:"/search",
            component:()=>import("@/views/search/search.vue"),
            // 转到search时隐藏tabbar
            meta:{
                hideTabbar:true
            }
        },
    ]
})

export default router