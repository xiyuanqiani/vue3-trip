<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control 
    class="tab-control"
    :titles="names"
    v-if="isShowTabControl"
    @tabItemClick="tabClick"
    ref="tabControlRef"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-if="mainPart" v-memo="[mainPart]">
        <detail-swipe  :swipeData="mainPart.topModule.housePicture.housePics"/>
        <detail-infos name="描述" :ref="getSectionRef" getSectionRef :topModule="mainPart.topModule"/>
        <detail-facility name="设施" :ref="getSectionRef" :facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
        <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
        <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
        <detail-notice name="须知" :ref="getSectionRef" :notice="mainPart.dynamicModule.rulesModule.orderRules"/>
        <detail-map name="地图" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>
        <detail-intro :priceIntro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">宏源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import {getDetailInfos} from '@/service'
import { useRouter,useRoute } from 'vue-router';
import {ref,computed,watch} from 'vue'
import scrollListen from '@/hooks/scroll-listen.js'

import tabControl from '@/components/tab-control/tab-control.vue'
import detailSwipe from './cpns/detail_01-swipe.vue'
// detailInfos与下面重复
import DetailInfos from './cpns/detail_02-infos.vue'
import detailFacility from './cpns/detail_03-facility.vue'
import detailLandlord from './cpns/detail_04-landlord.vue'
import detailComment from './cpns/detail_05-comment.vue'
import detailNotice from './cpns/detail_06-notice.vue'
import detailMap from './cpns/detail_07-map.vue'
import detailIntro from './cpns/detail_08-intro.vue'

const router = useRouter()
const route = useRoute()
const onClickLeft = ()=>{
    router.back()
}

// 直接在页面中写网络请求
const detailInfos = ref({})
const houseId = route.params.id
const mainPart = computed(()=>detailInfos.value?.mainPart)
getDetailInfos(houseId).then(res=>{
    detailInfos.value = res.data
})

// tabControl显示与隐藏
const detailRef = ref()
const {scrollTop} =  scrollListen(detailRef)
const isShowTabControl = computed(()=>{
  return scrollTop.value >= 300
})

// 点击tabControl滚动到具体位置
// const sectionEls = []
// const getSectionRef = (value) =>{
//   sectionEls.push(value.$el)
// }
// const tabClick = (index) =>{
//   // 拿到每个组件的对应卷去高度
//   console.log(sectionEls[index]);
//   let instance = sectionEls[index].offsetTop
//   if(index !== 0){
//     instance = instance - 44
//   }
//   detailRef.value.scrollTo({
//   top:instance,
//   behavior: "smooth"
// })
// }

const sectionEls = ref({})
const getSectionRef = (value) =>{
  if(!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}
const names = computed(()=>{
  return Object.keys(sectionEls.value)
})

let isClick = false
let currentDistance = -1
const tabClick = (index) =>{
  // 拿到每个组件的对应卷去高度
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop
  if(index !== 0){
    distance = distance - 44
  }
  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
  top:distance,
  behavior: "smooth"
})
}

// 页面滚动匹配tabControl
const tabControlRef = ref()
watch(scrollTop,(newValue)=>{
  if(newValue === currentDistance){
    isClick = false
  }
  if(isClick) return
  // 拿到每个对应组件的offsetTop
  const els = Object.values(sectionEls.value)
  const values = els.map(el=>el.offsetTop)
  
  let index = values.length - 1
  for(let i = 0;i<values.length;i++){
    if(values[i] > newValue + 44){
      index = i - 1
      break
    }
  }
  // console.log(index,'aaaaa');
  // ????????????????????????!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  tabControlRef.value?.changeIndex(index)
  // tabControlRef.value?.currentIndex = index
  // console.log(tabControlRef.value?.currentIndex,'bbbbbb');
})





</script>

<style lang="less" scoped>
.tab-control{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;
  z-index: 9;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
