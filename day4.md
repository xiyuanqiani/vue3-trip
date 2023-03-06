# loading组件的搭建
* 将loading的展示与消失封装进store中，因为不止一个页面使用。
* 控制网络请求时的loading效果写到请求拦截器和响应拦截器中。

# 房间详情页搭建
* <style color="red">轮播图自定义搭建</style>
1. 利用ui库已有的作用域插槽实现指示器自定义
2. 如何实现复杂数据的转换?（3类图片分别轮播）
    转化为一个对象中3个key-value，value里分别是每类的图片数组。
    {
        2:[item1.item2,item3...],
        4:[itemx,itemy,itemz...],
        9:[itema,itemb,itemc...],
    }
方法一：两个for循环（浪费性能）
```js
const swipeGroup = {}
for(const item of swipeData){
    swipeDate[item.xxxxx] = []
}
for(const item of swipeData){
    const valueArray = swipeData[item.xxxxx]
    valueArray.push(item)
}
```
方法二：一个循环
```js
const swipeGroup = {}
for(const item of swipeData){
    let valueArray = swipeData[item.xxxxx]
    if(!valueArray){
        valueArray = []
        swipeData[item.xxxxx] = valueArray
    }
    valueArray.push(item)
}
```
3. 数据的展示
利用正则表达式正确展示数据的显示。
4. 拿到每种类别的正在轮播的图的索引
```js
const getCategoryItem = (item)=>{
    const valueArray = swipeGroup[item.enumPictureCategory]
    return valueArray.findIndex(data=>data===item) + 1
} 
```
* 房屋设施的搭建
1. 因为后面的模块都相似，除了中间部分。所以利用插槽实现不同内容。放进components中。
插槽的内容在detail的cpns中实现。
2. 数据很多不可能全部展示，根据facilitySort中的数字用v-if来显示要的内容。

* 预定须知的搭建
1. 右下角没有查看更多，根据moreText的长度来显示（v-if）

* 百度地图的搭建
1. 实例写在onMounted生命周期中，因为setup中可能还没挂载div
2. 问题一：谷歌浏览器加载不出来，插件的广告拦截器拦截了
3. 问题二：onMounted结束后加个逗号显示不出来

* 详情页tabControl
1. 不利用vant组件，自己封装tabControl组件
```vue
<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="index">
      <div
        class="tab-control-item"
        :class="{ active: currentIndex == index }"
        @click="clickItem(index)"
      >
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emits = defineEmits(['tabItemClick'])
const currentIndex = ref(0);
const props = defineProps({
  titles: {
    type: [],
    default: () => [],
  },
});
 const clickItem=(index)=>{
  currentIndex.value = index;
  emits("tabItemClick", index);
};
</script>

<style  scoped>
  .tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item.active {
    color: var(--primary--color);
    font-weight: 700;
  }

  .tab-control-item.active span {
    border-bottom: 3px solid var(--primary--color);
    padding: 8px;
  }
</style>
```

2. detail组件隐藏tabbar的方式是css，滚动事件监听的不是window，需要给封装的scroll函数传参（ref拿到监听的元素）
初始化el=window，做判断，如果无参数，则还是原来的window事件；
如果传进来参数，则将该元素赋值给el，监听el相应的scroll事件。

3. 跳转到对应位置

方式一：要拿到每个对应组件的根元素（$el），如果给每个组件写上具体的ref，会很繁琐。
利用函数动态绑定ref:
```js
const sectionEls = []
const getSectionRef = (value) =>{
  sectionEls.push(value.$el)
}
```
利用scrollTo跳转，并做判断，如果是描述就不减去tabControl的高度
```js
const tabClick = (index) =>{
  // 拿到每个组件的对应卷去高度
  console.log(sectionEls[index]);
  let instance = sectionEls[index].offsetTop
  if(index !== 0){
    instance = instance - 44
  }

  detailRef.value.scrollTo({
  top:instance,
  behavior: "smooth"
})
}
```

方式二：tiles和每个ref都有对应关系，可以把它们封在一个key-value的对象中，每个组件加个name的属性
```js
const sectionEls = ref({})
const getSectionRef = (value) =>{
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}
const names = computed(()=>{
  return Object.keys(sectionEls.value)
})
const tabClick = (index) =>{
  // 拿到每个组件的对应卷去高度
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let instance = el.offsetTop
  if(index !== 0){
    instance = instance - 44
  }
  detailRef.value.scrollTo({
  top:instance,
  behavior: "smooth"
})
```


    