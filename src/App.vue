<template>
    <div class="app">
        <router-view></router-view>
        <!-- 页面留白，防止被tabbar遮挡内容 -->
        <!-- <div style="height: 5rem;"></div> -->
        <!-- <TabBar v-if="!route.meta.hideTabbar"/> -->
        <TabBar v-if="!route.meta.hideTabbar"/>
    </div>
</template>

<script setup>
    import TabBar from '@/components/tab-bar/tab-bar.vue'
    import { useRoute } from 'vue-router';
    const route = useRoute()
</script>

<style lang="less" scoped>

</style>
