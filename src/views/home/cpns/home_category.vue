<template>
    <div class="category">
        <template v-for="(item,index) in categories">
        <div class="item">
            <img :src="item.pictureUrl" alt="">
            <div class="text">{{ item.title }}</div>
        </div>   
        </template>
    </div>
</template>

<script setup>
import useHome from '@/stores/modules/home.js'
import { storeToRefs } from 'pinia';
const homeStore = useHome()
const {categories} = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.category{
    display: flex;
    overflow-x: auto;
    height: 80px;
    padding: 0 10px;
    // 隐藏滚动条
    &::-webkit-scrollbar{
        display: none;
    }
    .item{
        width: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        text-align: center;

        img{
            width: 32px;
            height: 32px;
        }
        .text{
            font-size: 12px;
            margin-top: 8px;
        }
    }
}
</style>