<template>
  <div class="order">
    <van-nav-bar
      title="订单列表"
      left-arrow
      @click-left="onClickLeft"
    >
    <template #right>
    <van-icon name="manager-o" size="18" />
  </template>
    </van-nav-bar>
    <van-tabs v-model:active="activeName">
        <van-tab title="全部订单" name="all"></van-tab>
        <van-tab title="近期订单" name="recent"></van-tab>
        <van-tab title="待支付" name="pend"></van-tab>
    </van-tabs>
    <div class="all" v-if="activeName==='all'">
        <house-order :orderData="allOrder"></house-order>
    </div>
    <div class="recent" v-if="activeName === 'recent'">
        <house-order :orderData="recentOrder"></house-order>
    </div>
    <div class="pend" v-if="activeName === 'pend'">
        <house-order :orderData="pendOrder"></house-order>
    </div>
  </div>
</template>

<script setup>
import houseOrder from './cpns/house-order.vue'
import { useRouter } from 'vue-router';
import {ref} from 'vue'
import useOrder from '@/stores/modules/order.js'
import { storeToRefs } from 'pinia';
const router = useRouter()

const onClickLeft = ()=>{
    router.back()
}

const orderStore = useOrder()
// 全部订单
orderStore.getAllOrder()
const {allOrder} = storeToRefs(orderStore)

// 最近订单
orderStore.getRecentOrder()
const {recentOrder} = storeToRefs(orderStore)

// 未支付订单
orderStore.getPendOrder()
const {pendOrder} = storeToRefs(orderStore)


const activeName = ref('all')
</script>

<style lang="less" scoped>
.order{
        padding-bottom:55px;
    }
</style>
