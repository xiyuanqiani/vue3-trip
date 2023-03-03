<template>
    <div class="house-item">
        <div class="item-inner">
            <div class="cover">
                <img :src="houseData.image.url" />
            </div>
            <div class="infos">
                <div class="summary">{{ houseData.summaryText }}</div>
                <div class="name">{{ houseData.houseName }}</div>
                <div class="price">
                    <van-rate  v-model="houseRate" readonly allow-half color="#fff" :size="15"/>
                    <div >￥{{ houseData.finalPrice }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed} from 'vue'
const props = defineProps({
    houseData:{
        type:Object,
        default:()=>({})
    }
})

// ???????评分不显示
const houseRate = computed(()=>{
    return Number(props.houseData?.commentScore)
})
</script>

<style lang="less" scoped>
  .house-item {
    width: 50%;

    .item-inner {
      position: relative;
      margin: 5px;
      background: #fff;
      border-radius: 6px;
      overflow: hidden;

      .cover {
        img {
          width: 100%;
        }
      }

      .infos {
        position: absolute;
        bottom: 0;
        padding: 8px 10px;
        color: #fff;

        .summary {
          font-size: 12px;
        }

        .name {
          margin: 5px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .price {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
      }
    }
  }
</style>