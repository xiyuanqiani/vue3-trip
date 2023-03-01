<template>
  <div class="search-box">
    <!-- 位置 -->
    <div class="section location bottom-gray-line">
      <span class="city" @click="cityClick">{{ currentCity.cityName }}</span>
      <div class="current" @click="positionClick">
        <span class="mine">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
    <!-- 日期 -->
    <div class="section date-range bottom-gray-line" @click="chooseDate">
      <div class="start">
        <div class="date">
          <span class="tip"> 入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
      </div>
      <div class="stay">共{{ stayCount }}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalender"
      type="range"
      @confirm="onConfirm"
      color="#ff9854"
    />
    <!-- 人数价格 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>
    <!-- 城市推荐 -->
    <div class="section hot-suggest">
        <template v-for="(item,index) in suggestCities" :key="index" >
            <div class="tag" :style="{color:item.tagText.color,backgroundColor:item.tagText.background.color}">
                {{ item.tagText.text }}
            </div>
        </template>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import useCity from "../../../stores/modules/city";
import useHome from "@/stores/modules/home.js"
import { formatMonthDay, diffDays } from "@/utils/format_date.js";
import { ref } from "vue";

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("成功获取地理位置", res);
    },
    (err) => {
      console.log("获取位置失败", err);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
};

const router = useRouter();
const cityClick = () => {
  router.push("/city");
};

// 动态展示城市
const cityStore = useCity();
const { currentCity } = storeToRefs(cityStore);

// 动态展示时间
const nowDate = new Date();
const newDate = new Date();
newDate.setDate(nowDate.getDate() + 1);

const startDate = ref(formatMonthDay(nowDate));
const endDate = ref(formatMonthDay(newDate));

const stayCount = ref(diffDays(nowDate, newDate));

const showCalender = ref(false);
const chooseDate = () => {
  showCalender.value = true;
};
const onConfirm = (value) => {
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  stayCount.value = diffDays(selectStartDate, selectEndDate);
  startDate.value = formatMonthDay(selectStartDate);
  endDate.value = formatMonthDay(selectEndDate);
  showCalender.value = false;
};

const homeStore = useHome()
const {suggestCities} = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.location {
  height: 44px;
  .city {
    flex: 1;
    font-size: 15px;
    padding: 0 10px 0 0;
    color: #333;
  }

  .current {
    display: flex;
    align-items: center;

    .mine {
      margin-right: 8px;
      font-size: 12px;
      color: #666;
    }
    img {
      width: 18px;
      height: 18px;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  height: 44px;
  .start {
    border-right: 1px solid f8f9f9;
  }
}

.keyword {
  height: 44px;
}

.hot-suggest {
  margin: 10px 0;

  .tag {
    font-size: 12px;
    padding: 4px 8px;
    margin: 3px;
    border-radius: 14px;
  }
}


.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
</style>
