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
