<template>
  <div class="dropdown-select">
    <van-dropdown-menu>
      <template v-for="(item, index) in topInfos" :key="index" @change="onSideMenuChange">
        <!-- 每个版块不同，有的需要自定义，不能用一个van-dropdown-item，用v-if控制显示 -->
        <van-dropdown-item :title="topInfos[0].label" v-if="item.gType === 2" :ref="dropdownItemRefs">
          <div class="dropdown-content">
            <side-bar
            class="top"
            :menuData="item.subGroups"
            @itemClick="handleSideSubItemClick"
            >
            </side-bar>
            <side-bar-btn
            class="bottom"
            @clear="handleClear(topInfos[0].label)"
            @view-house="handleViewHouse(topInfos[0].label)"
            >

            </side-bar-btn>
          </div>
        </van-dropdown-item>
          
        <van-dropdown-item
          v-if="item.gType === 4"
          :options="options"
          v-model="sort"    
        >
        </van-dropdown-item>

        <van-dropdown-item :title="topInfos[2].label" v-if="item.gType === 1" :ref="dropdownItemRefs">
          <div class="dropdown-content">
            <side-bar
            class="top"
            :menuData="item.subGroups"
            >
            </side-bar>
            <side-bar-btn
            class="bottom"
            @clear="handleClear(topInfos[2].label)"
            @view-house="handleViewHouse(topInfos[2].label)"
            >

            </side-bar-btn>
          </div>
        </van-dropdown-item>
      </template>
    </van-dropdown-menu>
  </div>
</template>

<script setup>
import sideBar from './side-bar.vue'
import sideBarBtn from './side-bar-btn.vue'
import { ref,reactive,onMounted} from "vue";
const props = defineProps({
  topInfos: {
    type: Array,
    default: () => [],
  },
});

const sort = ref(0)

// 排序options数据
// 为什么？？？？？？这样不行，读不到text和value，都为undefined
// const options = [
//     {text:props.topInfos[1].items[0].label,value:props.topInfos[1].items[0].value},
//     {text:props.topInfos[1].items[1].label,value:props.topInfos[1].items[1].value},
//     {text:props.topInfos[1].items[2].label,value:props.topInfos[1].items[2].value},
//     {text:props.topInfos[1].items[3].label,value:props.topInfos[1].items[3].value},
//     {text:props.topInfos[1].items[4].label,value:props.topInfos[1].items[4].value}
// ]

const options = [
  { text: "欢迎度排序", value: 0 },
  { text: "好评优先", value: 1 },
  { text: "点评数多->少", value: 2 },
  { text: "低价优先", value: 3 },
  { text: "高价优先", value: 4 },
];

const onSideMenuChange = (index) =>
  console.log(`标签名 ${currentSideActive.value}`);

  const handleSideSubItemClick = (item) => {
  console.log(item);
};

// 按钮
const dropdownRefs = {}; 
//ref??????????
const dropdownItemRefs = (el) => {
  if (el) {
    dropdownRefs[el.title] = el;
  }
};

const handleClear = (title) => {
  dropdownRefs[title]?.toggle()
}
const handleViewHouse = (title) => {
  dropdownRefs[title]?.toggle()
}
</script>

<style lang="less" scoped>
@popupHeight: 500px;
// 重写Vant样式
:global(.van-dropdown-menu .van-popup .van-sidebar-item) {
  padding-left: 20px;
  padding-top: 14px;
  padding-bottom: 14px;
}
:global(.van-dropdown-menu .van-popup .van-sidebar-item::before) {
  border-radius: 50%;
  left: 8px;
}

:global(.van-dropdown-menu .van-dropdown-item__content) {
  overflow-y: hidden;
  max-height: 100%;
}

.dropdown-bar-panel-content {
  position: relative;
  height: @popupHeight;
  overflow: hidden;
  background-color: var(--van-sidebar-background-color);

  .top {
  }

  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
}
</style>
