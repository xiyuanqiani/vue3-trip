<template>
  <div class="favor-house">
    <div class="imgInfos">
      <img :src="houseData.pictureList[0]" alt="" />
      <div class="rate-box">
        <span class="rate">{{ houseData.commentBrief.overall }}分</span>
        <span class="text">{{ houseData.commentBrief.scoreTitle }}</span>
      </div>
      <div class="sidebar">
        <div class="avatar">
          <img :src="houseData.logoUrl" alt="" />
        </div>
        <div class="heart">
          <img
            src="@/assets/img/search/tj-mob-ui_unit-item_collected-new.png"
            alt=""
          />
        </div>
        <div class="message">
          <img
            src="@/assets/img/search/tj-mob-ui_unit-item_comment-new.png"
            alt=""
          />
          <div class="count">141</div>
        </div>
      </div>
    </div>
    <div class="mainContent">
      <div class="houseTitle">
        <div class="info">
          <div class="info-position">
            {{ houseData.address }}
          </div>
          <div class="info-more">
            {{ houseData.unitSummeries[0].text }}.{{
              houseData.unitSummeries[1].text
            }}
          </div>
        </div>
        <div class="title">
          {{ houseData.unitName }}
        </div>
      </div>
      <div class="discount">
        <div class="houseTags">
          <template v-for="(item, index) in houseData.houseTags" ::key="index">
            <van-tag
              class="tags"
              :text-color="item.color"
              :color="item.background.color"
              >{{ item.text }}</van-tag
            >
          </template>
        </div>
        <div class="price">
            <span class="nowPrice">￥{{ houseData.finalPrice }}</span>
            <span class="oldPrice">￥{{ houseData.productPrice }}</span>
            <div class="preference" v-if="houseData.priceTipBadge?.text">
                <van-icon name="bell" color="#fff"/>
                <span >{{ houseData.priceTipBadge?.text }}</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  houseData: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="less" scoped>
.favor-house {
  margin: 10px 0;
  .imgInfos {
    position: relative;
    margin-bottom: 7px;
    img {
      width: 100%;
      border-radius: 6px;
    }
    .rate-box {
      position: absolute;
      border-radius: 5px;
      bottom: 15px;
      left: 10px;
      right: 10px;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      max-width: 20%;
      height: 17px;
      border-radius: 10px;
      background-color: hsla(0, 0%, 100%, 0.9);
      .rate {
        font-size: 15px;
        font-weight: bold;
        border-right: 1px solid #ccc;
      }
      .text {
        font-size: 10px;
      }
    }
    .sidebar {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .avatar {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-top: 5px;
        }
      }
      .heart {
        img {
          width: 30px;
          height: 30px;
          margin: 10px 0 15px;
        }
      }
      .message {
        text-align: center;
        color: #fff;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  .houseTitle {
    .info {
      display: flex;
      .info-position {
        background: rgb(63, 73, 84);
        color: #fff;
        margin-right: 10px;
        font-size: 10px;
      }
      .info-more{
        white-space: nowrap;
      }
    }
    .title {
      line-height: 22px;
      font-size: 18px;
      margin-top: 8px;
      font-weight: 500;
    }
  }
  .discount {
    margin-top: 10px;
    .houseTags {
      margin-bottom: 5px;
      .tags {
        margin-right: 10px;
      }
    }
    .price{
        display: flex;
        align-items: center;
        .nowPrice{
            color: var(--primary--color);
            font-size: 20px;
            padding-right: 10px;
            padding-left: 1px;
        }
        .oldPrice{
            font-weight: 500;
            font-size: 12px;
            color: #999;
            text-decoration: line-through;
            padding-right: 5px;
        }
        .preference{
            background-color: #fb4a4a;
            color: #fff;
            border-radius: 7px;
        }
    }
  }
}
</style>
