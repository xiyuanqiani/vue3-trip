<template>
  <div class="houseList">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <!-- 被tabbar挡住一些？？？？？？ -->
      <template v-for="(item, index) in houseList" :key="item.data.houseId">
        <house-item-v9
          v-if="item.discoveryContentType === 9"
          :houseData="item.data"
          @click="itemClick(item.data)"
        />
        <house-item-v3
          v-else-if="item.discoveryContentType === 3"
          :houseData="item.data"
          @click="itemClick(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import useHome from "../../../stores/modules/home";
import houseItemV3 from "@/components/house-item-v3/house-item-v3.vue";
import houseItemV9 from "@/components/house-item-v9/house-item-v9.vue";
import {useRouter} from 'vue-router'
const homeStore = useHome();
const { houseList } = storeToRefs(homeStore);

const router = useRouter()
const itemClick = (item)=>{
    router.push('/detail/'+item.houseId)
}
</script>

<style lang="less" scoped>
.houseList {
  padding: 10px 8px;
  .title {
    font-size: 22px;
    padding: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
