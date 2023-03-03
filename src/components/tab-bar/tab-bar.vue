<!-- 动态导入 -->
<template>
  <div class="tab-bar">
      <van-tabbar v-model="currentIndex" active-color="#ff9845" :route="true">
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
import { ref ,watch} from "vue";
import { useRoute } from "vue-router";

// 监听路由改变时，找到对应的索引，设置currentIndex
const route = useRoute()
const currentIndex = ref(0);
watch(route,(newRoute)=>{
    const index = tabbar_img.findIndex(item=>item.path === newRoute.path)
    if(index== -1) return
    currentIndex.value = index
})

</script>

<style lang="less" scoped>
.tab-bar {
    img{
        height: 30px;
    }
}
</style>
