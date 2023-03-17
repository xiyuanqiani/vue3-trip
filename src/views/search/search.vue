<template>
  <div class="search">
    <van-nav-bar   left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="manager-o" size="18" />
      </template>
      <template #title>            
        <search-bar></search-bar>
      </template>
    </van-nav-bar>

    <!-- 位置、点评、筛选 -->
    <dropdown-select :topInfos="topInfos"></dropdown-select>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import searchBar from '@/components/search-bar/search-bar.vue'
import dropdownSelect from './cpns/dropdown-select.vue'
import useSearch from '@/stores/modules/search.js'
import { storeToRefs } from 'pinia';
const router = useRouter()
const onClickLeft = ()=>{
    router.push('/home')
}

const searchStore = useSearch()
searchStore.searchTop()
const {topInfos} = storeToRefs(searchStore)
</script>

<style lang="less" scoped></style>
