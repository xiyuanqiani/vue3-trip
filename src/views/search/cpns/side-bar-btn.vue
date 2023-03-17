<template>
    <div class="side-bar-btn">
        <div class="clear" @click="handleClear">清空</div>
        <div class="view-house" @click="handleViewHouse">查看房屋(220套)</div>
    </div>
</template>

<script setup>
const emit = defineEmits(['clear','view-house'])

const handleClear = ()=>{
    emit('clear')
}
const handleViewHouse = ()=>{
    emit('view-house')
}
</script>

<style lang="less" scoped>
.side-bar-btn {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: white;
  .clear {
    display: inline-block;
    margin-left: 20px;
    width: 85px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #f3f4f6;
    border-radius: 20px;
    font-size: 15px;
    color: #dadada;
  }
  .view-house {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 40px;

    margin-left: 10px;
    border-radius: 20px;
    font-size: 15px;
    color: #fff;
    background: var(--primary--color);
  }
}
</style>