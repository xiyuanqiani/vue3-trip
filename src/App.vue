<template>
    <div class="app">
        <router-view v-slot="props">
            <keep-alive include="home">
                <component :is="props.Component"></component>
            </keep-alive>
        </router-view>
        <!-- 页面留白，防止被tabbar遮挡内容 -->
        <!-- <div style="height: 5rem;"></div> -->
        <!-- <TabBar v-if="!route.meta.hideTabbar"/> -->
        <TabBar v-show="!route.meta.hideTabbar"/>
        <loading v-if="mainStore.isLoading"/>
    </div>
</template>

<script setup>
    import TabBar from '@/components/tab-bar/tab-bar.vue'
    import loading from '@/components/loading/loading.vue'
    import { useRoute } from 'vue-router';
    import useMain from './stores/modules/main';
    const route = useRoute()

    const mainStore = useMain()
</script>

<style lang="less" scoped>

</style>
