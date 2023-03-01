<template>
    <div class="home">
        <home-nav-bar/>
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box/>
    </div>
</template>

<script setup>
import HomeNavBar from './cpns/home_nav_bar.vue'
import HomeSearchBox from './cpns/home_search_box.vue'
import useHome from '@/stores/modules/home.js'

const homeStore = useHome()
homeStore.getSuggest()

</script>

<style lang="less" scoped>
.banner{
    img{
        width: 100%;
    }
}

</style>