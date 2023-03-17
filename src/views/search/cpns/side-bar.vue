<template>
  <div class="side-bar">
    <!-- 侧边导航 -->
    <div class="menu">
      <van-sidebar v-model="currentSideActive" >
        <template v-for="(item,index) in sideData" :key="index">
            <van-sidebar-item :title="item.label" />
        </template>
      </van-sidebar>
    </div>
    <!-- 分为两种，一种只有一级内容，一种两级内容 -->
    <div class="content">
      <slot 
      name="content"
      >
      <!-- 只有1级的 -->
      <template
      v-if="sideData[currentSideActive].items"
      v-for="(addrInfo, index) in sideData[currentSideActive].items"
      :key="index"
      >
        <div
        :class="['list-item',addrInfo.isSelect?'active':'']"
        @click="handleItemClick(currentSideActive, index)"
        >
        <div class="name ellipsis-text-1">{{ addrInfo.label }}</div>
            <span class="desp" v-if="addrInfo.percentageUser">
              {{ addrInfo.percentageUser }}
            </span>
        </div>
      </template>

      <!-- 有两级的 -->
      <template v-if="getSubSide.length">
        <div class="sub-side-panel"> 
           <div class="sub-side-bar"> 
            <!-- @change="onSubSideMenuChange" -->
            <van-sidebar
                v-model="currentSubSideActive"
                
              >
                <template
                  v-for="(group, indey) in sideData[currentSideActive].subGroups"
                  :key="indey"
                >
                  <van-sidebar-item :title="group.label" />
                </template>
              </van-sidebar>
           </div>
           <!-- 二级的内容 -->
           <div class="sub-content">
            <template v-for="(addr, indz) in getSubSideItems" :key="indz">
                <div
                  :class="['list-item', addr.isSelect ? 'active' : '']"
                  @click="handleSubItemClick(indz)"
                >
                  <div class="name ellipsis-text-1">{{ addr.label }}</div>
                  <span class="desp" v-if="addr.percentageUser">
                    {{ addr.percentageUser }}
                  </span>
                </div>
              </template>
           </div> 
         </div>
      </template>
      </slot>
    </div>
  </div>
</template>

<script setup>
import {ref,watch,computed} from 'vue'
const currentSideActive = ref(0)
const currentSubSideActive = ref(0)
const sideData = ref([])

const props = defineProps({
    menuData:{
        type:Array,
        default:()=>[]
    }
})

watch(
  ()=>props.menuData,
  (newValue,oldValue)=>{
    sideData.value = newValue
  },
  { 
    immediate:true
  }
)

const emit = defineEmits(["itemClick"])
// 1级
const  handleItemClick = (currentSideActive,index)=>{
  if(sideData.value[currentSideActive]){
    let addrInfos = sideData.value[currentSideActive].items || []
    addrInfos.forEach((item,i)=>{
      item.isSelect = i === index
    })
    emit("itemClick", {
      sideData: sideData.value,
      currentSideActive,
      index,
    });
  }
}
// 2级
const handleSubItemClick = (index) => {
  if (sideData.value[currentSideActive.value]) {
    let subGroup = sideData.value[currentSideActive.value].subGroups || [];
    let addrInfos = subGroup[currentSubSideActive.value].items || [];
    addrInfos.forEach((item, i) => {
      item.isSelect = i === index;
    });
    emit("itemClick", {
      sideData: sideData.value,
      currentSideActive,
      currentSubSideActive,
      index,
    });
  }
};

// 二级
const getSubSide = computed(() => {
  let subMenus = sideData.value[currentSideActive.value]?.subGroups || [];
  return subMenus;
})
// 二级内容
const getSubSideItems = computed(() => {
  let subMenus = sideData.value[currentSideActive.value].subGroups || [];
  let result = [];
  if (subMenus.length) {
    result = subMenus[currentSubSideActive.value] || {};
  }
  result = result.items || [];
  return result;
});

</script>

<style lang="less" scoped>
@popupHeight: 500px;
.side-bar :deep(.van-sidebar) {
  height: calc(@popupHeight - 60px);
}

.side-bar {
  display: flex;
  flex-direction: row;
  .content {
    flex: 1;
    overflow-y: auto;
    height: calc(@popupHeight - 60px);
    background-color: white;

    .list-item {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 55px;

      padding: 0 20px 0 10px;
      margin-right: 20px;
      margin-left: 12px;

      font-size: 14px;
      .name {
        // max-width: 200px;
        padding-bottom: 6px;
      }

      .desp {
        font-size: 12px;
        color: #999;
      }
    }
  }
}

.active {
  background-color: #fffcf5;
  .name {
    color: var(--primary--color);
  }
} 

.sub-side-panel {
  display: flex;
  flex-direction: row;
  .sub-side-bar {
    border-right: 1px solid #f8f8f8;
  }
  .sub-side-bar :deep(.van-sidebar) {
    .van-sidebar-item {
      background-color: white !important;
    }
  }
  .sub-content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(@popupHeight - 60px);
  }
}
</style>
