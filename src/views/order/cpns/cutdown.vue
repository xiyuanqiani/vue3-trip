<template>
  <div class="cutdown-box">
    <!-- 为了让已取消的订单按钮靠右 -->
    <div class="empty" v-if="countdown === 0"></div>
    <div class="left" v-if="countdown !== 0">
      <img src="@/assets/img/order/icon-time.png" alt="" />
      <span>{{ cutTime }}分后订单自动取消</span>
    </div>
    <div class="right">
      <div class="wait" v-if="countdown !== 0">
        <button class="connect">联系房东</button>
        <button class="pay">去支付</button>
      </div>
      <div class="paid" v-else>
        <button class="delete connect">删除</button>
        <button class="again">再次预订</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
const props = defineProps({
  countdown: {
    type: String,
    default: "",
  },
});

// 订单取消倒计时
let cutTime = ref(0)
const timer = ref(null)
let counter = 1

const countdownFn = ()=>{
  timer.value = setInterval(()=>{
    cutTime.value = parseInt((props.countdown - counter) / 60)
    counter++
    if(cutTime.value == 0){
      clearInterval(timer.value)
      return
    } 
  },1000)
}

onMounted(()=>{
  countdownFn()
})
</script>

<style lang="less" scoped>
.cutdown-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  .empty{
    width: 50px;
  }
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 11px;
    img {
      width: 11px;
      height: 11px;
      margin-right: 3px;
    }
  }
  .right{
    display: flex;
    .wait,.paid {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .connect {
      display: inline-block;
      text-align: center;
      line-height: 30px;
      margin-left: 10px;
      font-size: 14px;
      min-width: 75px;
      color: #666;
      background: #fff;
      border: 1px solid #e9e9e9;
      border-radius: 6px;
    }
    .pay {
        color: white;
        background-color: var(--primary-color, #ff9645);
        border: 1px solid var(--primary-color, #ff9645);
        border-radius: 6px;
        text-align: center;
        line-height: 30px;
        margin-left: 10px;
        font-size: 14px;
        min-width: 75px;
      }
      .again{
        color: var(--primary-color, #ff9645);
        background-color: #fff;
        border: 1px solid var(--primary-color, #ff9645);
        border-radius: 6px;
        text-align: center;
        line-height: 30px;
        margin-left: 10px;
        font-size: 14px;
        min-width: 75px;
      }
  }
  }
}
</style>
