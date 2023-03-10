<template>
  <div class="message">
    <van-nav-bar title="消息中心"  left-arrow  @click-left="onClickLeft">
      <template #right>
        <van-icon name="manager-o" size="18"/>
      </template>
    </van-nav-bar>
    <div class="noMessage">
        <img src="@/assets/img/message/icon_message.png" alt="">
        <span>暂无聊天信息</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const onClickLeft = ()=>{
    router.back()
}
</script>

<style lang="less" scoped>
.noMessage{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    img{
        width: 88%;
    }
}
</style>
