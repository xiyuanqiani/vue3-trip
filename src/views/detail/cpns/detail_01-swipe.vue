<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="2000" indicator-color="white">
      <template v-for="(item, index) in swipeData">
        <van-swipe-item class="item">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">
          <!-- {{ active + 1 }}/{{ total }}/{{ swipeData.length }} -->
          <template v-for="(value,key,index) in swipeGroup" :key="key">
                <div class="item" :class="{active:swipeData[active]?.enumPictureCategory == key}">
                    <span>{{ getName(value[0].title) }}</span>
                    <span v-if="swipeData[active]?.enumPictureCategory == key">
                        {{ getCategoryItem(swipeData[active]) }}/{{ value.length }}
                    </span>
                </div>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});


// 对复杂的数据进行处理 
// 思路一：两个for循环
const swipeGroup = {}
// for(const item of props.swipeData){
//     // key-value
//     swipeGroup[item.enumPictureCategory] = []
// }
// for(const item of props.swipeData){
//     const valueArray = swipeGroup[item.enumPictureCategory]
//     valueArray.push(item)
// }

// 思路二：一次循环
for(const item of props.swipeData){
    let valueArray = swipeGroup[item.enumPictureCategory]
    if(!valueArray){
        valueArray = []
        swipeGroup[item.enumPictureCategory] = valueArray
    }
    valueArray.push(item)
}
// console.log(swipeGroup);

// 整理拿到的数据(正则表达式)
const nameReg = /【(.*?)】/i
const getName = (name) =>{
    // return name.replace("：","").replace("【","").replace("】","")
    const result = nameReg.exec(name);
    return result[1]
}

//拿到对应分类的序号
const getCategoryItem = (item)=>{
    const valueArray = swipeGroup[item.enumPictureCategory]
    return valueArray.findIndex(data=>data===item) + 1
} 

</script>

<style lang="less" scoped>
.swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }
    .custom-indicator {
      position: absolute;
      display: flex;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0 , 0, 0, 0.8);
      color: #fff;
      .item{
        margin: 0 3px;
        &.active{
            background-color: #fff;
            color: #333;
            padding: 0 3px;
            border-radius: 4px;
        }
      }
    }
  }
}
</style>
