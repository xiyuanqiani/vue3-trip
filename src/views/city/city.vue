<template>
  <div class="city top-page">
    <div class="top">
      <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      shape="round"
      show-action
      placeholder="城市/地区/位置"
      @cancel="onCancel"
    />
    <!-- tabs -->
<!-- 渲染不出tab！！！！！！！！！！！！！！！！！！！！(stores中单词拼错qaq) -->
    <van-tabs v-model:active="tabsActive" color="#ff9854" >
      <template v-for="(item, key, index) in allCities" :key="index">
        <van-tab  :title="item.title" :name="key"></van-tab>
      </template>
    </van-tabs>
    </div>
    <div class="content">
      <!-- 这样切换的时候渲染比较慢，不流畅，需要优化 -->
      <!-- <cityGroup :cityData="currentGroup"/> -->
      <template v-for="(value,key,index) in allCities" :key="index">
        <cityGroup v-show="tabsActive === key" :cityData="value"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref ,computed} from "vue";
import useCity from "../../stores/modules/city";
import { storeToRefs } from "pinia";
import cityGroup from './cpns/city-group.vue'

const router = useRouter();
// 取消
const onCancel = () => {
  router.back();
};
const searchValue = ref()
// tabs切换
const tabsActive = ref();

// store中发网络请求
const cityStore = useCity();
const { allCities } = storeToRefs(cityStore);
cityStore.fetchCities();

// 获取选择标签后的数据
// 1.得到正确的key，根据tab的name属性绑定正确的tabsActive
// 2.得到的数据不是响应式的，必须包裹computed
const currentGroup =  computed(()=>allCities.value[tabsActive.value])


</script>

<style lang="less" scoped>
  .top{
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    position: relative;
    z-index: 9;
  }
  .content{
    // 这样设置的缺点滚轮在上面占一截
      // margin-top: 98px;
      height: calc(100vh - 98px);
      overflow-y: auto;
    }

</style>
