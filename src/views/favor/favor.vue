<template>
  <div class="favor" ref="favorRef">
    <van-nav-bar  left-text="旅途" left-arrow  @click-left="onClickLeft">
        <template #title>
        <van-tabs v-model:active="activeName" type="card" >
            <van-tab title="我的收藏" name="myFavor" ></van-tab>
            <van-tab title="浏览历史" name="history"></van-tab>
        </van-tabs>
      </template>
      <template #right>
        <van-icon name="manager-o" size="18" />
      </template>    
    </van-nav-bar>

    <!-- 我的收藏 -->
    <div class="myFavor" v-if="activeName === 'myFavor'">
        <van-tabs v-model:active="activeFavor" >
            <van-tab title="房屋" name="house" >
                <div class="content">
                    <template v-for="(item,index) in favorHouseList.data?.items" :key="index">
                        <favor-house :houseData="item"/>
                    </template>
                </div>
            </van-tab>
            <van-tab title="房东" name="landlord">
                <div class="content">
                    <div class="no-data" >
                    <img src="@/assets/img/favor/empty_favorite.44731802.png" alt="">
                        <span>暂无房东收藏</span>
                       <span>点击<img src="@/assets/img/favor/favor.png" alt="">即可收藏对应的房东</span>
                       <button>随便去逛逛</button>
                    </div>                    
                </div>
            </van-tab>
        </van-tabs>
    </div>

    <!-- 浏览历史 -->
    <div class="history" v-if="activeName === 'history'">
        <template v-for="(history,index) in visitHistory.data?.items" :key="index">
            <div class="content">
                <favor-house :houseData="history"/>
            </div>
        </template>
    </div>
  </div>
</template>

<script setup>
import favorHouse from './cpns/favorHouse.vue'
import {ref} from 'vue'
import useFavor from '@/stores/modules/favor.js'
import { storeToRefs } from 'pinia';
import {useRouter} from 'vue-router'
const activeName = ref('myFavor')
const activeFavor = ref('house')

const router = useRouter()
const onClickLeft = ()=>{
    router.push('/home')
}

const favorStore = useFavor()
// 我的房屋收藏
favorStore.favorList()
const {favorHouseList} = storeToRefs(favorStore)
// 浏览历史
favorStore.history()
const {visitHistory} = storeToRefs(favorStore)


</script>

<style lang="less" scoped>
.content {
    padding: 10px 20px 10px 20px;
    .no-data{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width: 88%;
        }
        span{
            margin-top: 10px;
            font-weight: 500;
            font-size: 20px;
            img{
                height: 15px;
                width: 15px;
                vertical-align: middle;
            }
        }
        button{
            margin-top: 25px;
            padding: 0 38px;
            height: 40px;
            line-height: 40px ;
            font-size: 16px;
            color: #fff;
            background: var(--primary--color);
            border-radius: 20px;
            border: none;
            outline: none;
        }
    }
}
</style>
