<!-- 动态导入 -->
<template>
  <div class="tab-bar">
      <van-tabbar v-model="currentIndex" active-color="#ff9845">
        <template v-for="(item,index) in tabbar_img">
            <van-tabbar-item  :to="item.path" >
            <span class="text">{{ item.text }}</span>
                <template #icon>
                    <img v-if="currentIndex !== index" :src="getAssetUrl(item.image)" >
                    <img v-else :src="getAssetUrl(item.imageActive)" alt="">
                </template>
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
    img{
        height: 30px;
    }
}
</style>
