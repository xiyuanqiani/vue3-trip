<template>
    <div class="infos">
        <div class="name">{{ topModule?.houseName }}</div>
    <div class="tags">
      <template v-for="(item, index) in topModule?.houseTags">
        <span v-if="item.tagText" class="item"
          :style="{ color: item.tagText.color, background: item.tagText.background.color }">
          {{ item.tagText.text }}
        </span>
      </template>
    </div>
    <div class="extra comment">
      <div class="left">
        <span class="score">{{ topModule?.commentBrief?.overall }}</span>
        <span class="title">{{ topModule?.commentBrief?.scoreTitle }}</span>
        <span class="brief">"{{ topModule?.commentBrief?.commentBrief }}"</span>
      </div>
      <div class="right">
        <span class="count">{{ topModule?.commentBrief?.totalCount + "条评论 >" }}</span>
      </div>
    </div>
    <div class="extra position">
      <div class="left address">
        {{ topModule?.nearByPosition?.address }}
      </div>
      <div class="right">
        地图·周边 >
      </div>
    </div>
    </div>
</template>

<script setup>
defineProps({
    topModule: {
      type: Object,
      default: () => ({})
    }
})
</script>

<style lang="less" scoped>
.infos{
  padding: 16px;
  background-color: #fff;

  .name {
    font-weight: 700;
    font-size: 20px;
    color: #333;
    text-align: justify;
    line-height: 24px;
    overflow: hidden;
    margin-bottom: 6px;
  }

  .tags {
    margin: 10px 0;

    .item {
      font-size: 12px;
      margin: 0 2px;
      padding: 1px 3px;
    }
  }

  .extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 5px;
    font-size: 12px;
    background-color: #f5f7fa;

    .right {
      color: #ff9645;
    }
  }

  .comment {
    .score {
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }

    .title {
      color: #333;
      font-weight: 700;
      margin: 0 3px;
    }

    .brief {
      color: #666;
    }
  }

  .position {
    .address {
      font-size: 14px;
      font-weight: 700;
      color: #333;
    }
  }
}
</style>