<!-- 动态导入 -->
<template>
    <div class="tab-bar">
        <template v-for="(item,index) in tabbar_img">
        <div 
            class="tab-bar-item" 
            :class="{active:currentIndex === index}"
            @click="clickItem(index,item)"
            >
            <!-- 本地资源 vite 导入 -->
            <img v-if="currentIndex !== index" :src="getAssetUrl(item.image)" >
            <img v-else :src="getAssetUrl(item.imageActive)" alt="">
            <span class="text">{{ item.text }}</span>
        </div>
        </template>
    </div>
</template>

<script setup>
    import tabbar_img from '@/assets/data/tabbar_img'
    import {getAssetUrl} from '@/utils/get_asset.js'
    import {ref} from 'vue'
    import {useRouter} from 'vue-router'

    const currentIndex = ref(0);
    const router = useRouter()
    const clickItem= (index,item)=>{
        currentIndex.value = index;
        router.push(item.path)
    }
</script>

<style lang="less" scoped>
    .tab-bar{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        display: flex;
        border-top: 1px solid #f3f3f3;
        .tab-bar-item{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &.active{
                // 封装
                color: var(--primary--color);
            }
            .text{
                font-size: 16px;
            }
            img{
                width: 36px;
            }
        }
    }
</style>