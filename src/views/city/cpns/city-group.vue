<template>
  <div class="city-group">
    <!-- 右边索引是按顺序写死的，加了一个热门，且有的首字母没有地区，对应不上，需要手动封装 -->
    <van-index-bar :index-list="indexList">
        <van-index-anchor index="热门" />
        <div class="hot">
        <template v-for="(hot,index) in cityData.hotCities">
            <div class="hotCity" @click="chooseCity(hot)">
                {{ hot.cityName }}
            </div>
        </template>
        </div>
      <template v-for="(item, index) in cityData.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <template v-for="(iten, indey) in item.cities" :key="indey">
          <van-cell :title="iten.cityName" @click="chooseCity(iten)" />
        </template>
      </template>
    </van-index-bar>
    <!-- <template v-for="(item,index) in cityData.cities" :key="index">
      <h2>{{ item.group }}</h2>
      <div class="city">
        <template v-for="(iten,indey) in item.cities" :key="indey">
            <div >
                {{ iten.cityName }}
            </div>
        </template>
      </div>
     </template>  -->
  </div>
</template>

<script setup>
import { defineProps,computed } from "vue";
import useCity from '@/stores/modules/city.js'
import { useRouter } from "vue-router";
const props =defineProps({
  cityData: {
    type: Object,
    default: () => ({}),
  },
});

// 动态展示索引
const indexList = computed(()=>{
    const list = props.cityData.cities.map(item=>item.group)
    list.unshift("#")
    return list
})

// 选择城市
const router = useRouter()
const cityStore = useCity()
const chooseCity =(city)=>{
    // console.log(city);
    router.back()
    cityStore.currentCity = city
}


</script>

<style lang="less" scoped>
.hot{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right:25px;
    .hotCity{
        height: 28px;
        width: 70px;
        border-radius: 14px;
        font-size: 12px;
        color: #000;
        background-color: #fff4ec;
        text-align: center;
        line-height: 28px;
        margin: 6px 0;
    }
}
</style>
