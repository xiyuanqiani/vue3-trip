<template>
    <div class="section">
        <div class="header">
            <h2 class="title">{{ title }}</h2>
        </div>
        <div class="content">
            <slot>
                我是默认内容
            </slot>
        </div>
        <div class="footer">
            <div class="more" v-if="moreText.length">
                <span>{{ moreText }}</span>
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title:{
        type:String,
        default:"默认标题"
    },
    moreText:{
        type:String,
        default:""
    }

})
</script>

<style lang="less" scoped>
  .section {
    padding: 0 15px;
    margin-top: 12px;
    background-color: #fff;
    border-top: 2px solid #ccc;

    .header {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eee;

      .title {
        font-size: 20px;
        color: #333;
      }
    }

    .content {
      padding: 8px 0;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
    //   flex-end不生效：宽度没有进行设置时，属于灵活延展的，所以无法进行计算
      width: 90vw;
      height: 44px;
      line-height: 44px;
      color: #ff9645;
      font-size: 14px;
      font-weight: 600;
    }
  }
</style>