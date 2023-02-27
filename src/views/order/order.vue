<template>
    <div class="order">
        <h2>order</h2>
        <van-rate v-model="rateValue" />
        <button @click="increment">评分加1</button>
    </div>
</template>

<script setup>
import {ref} from 'vue'
    const rateValue = ref(0)
    const increment = () =>{
        rateValue.value++
    }
</script>

<style lang="less" scoped>

</style>