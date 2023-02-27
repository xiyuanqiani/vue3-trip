<!-- 动态导入 -->
<template>
  <div class="tab-bar">
      <van-tabbar v-model="currentIndex" active-color="#ff9845">
        <template v-for="(item,index) in tabbar_img">
            <van-tabbar-item  :to="item.path" icon="home-o" >
            <!-- <span class="text">{{ item.text }}</span>
                <template #icon>
                    <img v-if="currentIndex !== index" :src="getAssetUrl(item.image)" >
                    <img v-else :src="getAssetUrl(item.imageActive)" alt="">
                </template> -->
        </van-tabbar-item>
        </template>  
      </van-tabbar>
  </div>
</template>

<script setup>
import tabbar_img from "@/assets/data/tabbar_img";
import { getAssetUrl } from "@/utils/get_asset.js";
import { ref } from "vue";

const currentIndex = ref(0);

</script>

<style lang="less" scoped>
.tab-bar {
    // 局部定义一个变量 
    // --van-tabbar-item-icon-size:30px;

    // 找到类，对类中的css进行重写
    :deep(.van-tabbar-item__icon){
        font-size: 50px;
    }
    img{
        height: 30px;
    }
}
</style>
