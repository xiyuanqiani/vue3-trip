<template>
  <div class="house-order">
    <template v-for="(item, index) in orderData" :key="index">
      <div class="content">
        <div class="header">
          <div class="title">{{ item.unitName }}</div>
          <div class="status1" v-if="item.orderStatusDesc === '待支付'">
            {{ item.orderStatusDesc }}
          </div>
          <div class="status2" v-else>
            {{ item.orderStatusDesc + item.cancelReasonDesc }}
          </div>
        </div>
        <div class="main">
          <img :src="item.unitPicture" alt="" />
          <div class="infos">
            <div class="infos-left">
              <div class="startTime">
                <div class="day">
                  {{ formatMonthDay(item.checkInDate, "M月DD日") }}
                </div>
                <div class="hour">
                  <span>{{ formatDay(item.checkInDate) }}</span>
                  <span>{{ item.checkInLatestTime }}</span>
                </div>
              </div>
              <div class="arrow">
                <img src="@/assets/img/order/icon_right_orderlist.png" alt="" />
              </div>
              <div class="endTime">
                <div class="day">
                  {{ formatMonthDay(item.checkOutDate, "M月DD日") }}
                </div>
                <div class="hour">
                  <span>{{ formatDay(item.checkOutDate) }}</span>
                  <span>{{ item.checkOutLatestTime }}</span>
                </div>
              </div>
            </div>
            <div class="infos-right">
              <span>支付总价</span>
              <div class="price">￥{{ item.prepayAmount }}</div>
            </div>
          </div>
        </div>
        <cutdown :countdown="item.countdown"/>
      </div>
    </template>
  </div>
</template>

<script setup>
import { formatMonthDay, formatDay } from "@/utils/format_date.js";
import cutdown from './cutdown.vue'
const props = defineProps({
  orderData: {
    type: Array,
    default: () => [],
  },
});

// 处理拿到的数据中的时间。
// const day = formatMonthDay(props.orderData.checkInDate,"M月DD日")
// console.log(a);

// 星期几
// const week = formatDay(props.orderData.checkInDate)
// console.log(b);
</script>

<style lang="less" scoped>
.content {
  padding: 0 20px;
  margin-top: 10px;
  background-color: #f7f8fa;
  .header {
    padding: 20px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      max-width: 204px;
      font-size: 12px;
      color: #333;
      line-height: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .status1 {
      font-size: 18px;
      color: var(--primary--color);
      letter-spacing: 0;
    }
    .status2 {
      color: rgb(178, 178, 178);
      font-size: 15px;
    }
  }
  .main {
    position: relative;
    height: 223px;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    .infos {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      background: rgba(9, 10, 14, 0.7);
      border-radius: 0 0 6px 6px;
      .infos-left {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: white;
        justify-content: space-around;
        border-right: 1px solid #fff;
        .arrow{
            img{
                width: 16px;
                height: 12px;
            }
        }
        .day{
            font-size: 16px;
            line-height: 16px;
            margin-bottom: 6px;
        }
        .hour{
            font-size: 12px;
            text-align: center;
            line-height: 12px;
            color: #c8c5c3;
        }
      }
      .infos-right {
        position: relative;
        width: 105px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span{
            color: #fff;
            text-align: center;
            line-height: 12px;
            opacity: 0.8;
            margin: 0;
            transform: scale(0.9);
        }
        .price{
            margin-top: 5px;
            font-size: 16px;
            color: var(--primary, #ff9645);
            letter-spacing: 0;
            text-align: right;
            line-height: 16px;
        }
      }
    }
  }
}
</style>
