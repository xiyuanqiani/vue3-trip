<template>
    <div class="home" ref="homeRef">
        <home-nav-bar/>
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box/>
        <div v-show="isShow" class="search-bar">
        <search-bar/>
        </div>
        <home-category/>
        <home-house/>
        <!-- <button @click="addMore">加载更多</button> -->
    </div>
</template>

<script>
export default{
    name:'home'
}
</script>

<script setup>
import {watch,ref,computed,onActivated} from 'vue'
import HomeNavBar from './cpns/home_nav_bar.vue'
import HomeSearchBox from './cpns/home_search_box.vue'
import HomeCategory from './cpns/home_category.vue'
import HomeHouse from './cpns/home_house.vue'
import SearchBar from '@/components/search-bar/search-bar.vue'
import useHome from '@/stores/modules/home.js'
import scrollListen from '@/hooks/scroll-listen.js'

const homeStore = useHome()
homeStore.getSuggest()
homeStore.getCategory()
homeStore.getHouse()

// const addMore = ()=>{
//     homeStore.getHouse()
// }

// 1.将函数作为参数传递
// scrollListen(()=>{
//     homeStore.getHouse()
// })

const homeRef = ref()
// 2.使用变量
const {isReachBottom,scrollTop} = scrollListen(homeRef)
watch(isReachBottom,(newValue)=>{
    if(newValue){
        homeStore.getHouse().then(()=>{
            isReachBottom.value = false
        })
    }
})

// 监听搜索框
// const isShow = ref(false)
// watch(scrollTop,(newTop)=>{
//     isShow.value = newTop >100
// })

const isShow = computed(()=>{
    return scrollTop.value >= 350
})

// 返回首页时回到浏览的位置
onActivated(()=>{
    homeRef.value.scrollTo({
        top:scrollTop.value
    })
})

</script>

<style lang="less" scoped>
.home{
    // 防止被tabbar遮挡内容
    padding-bottom: 55px;
    height: calc(100vh - 55px);
    overflow-y: auto;
    box-sizing: border-box;
    .banner{
    img{
        width: 100%;
    }
}
.search-bar{
        position: fixed;
        z-index: 9;
        top: 0;
        left: 0;
        right: 0;
        height: 45px;
        padding: 16px 16px 10px;
        background-color: #fff;
    }
}


</style>