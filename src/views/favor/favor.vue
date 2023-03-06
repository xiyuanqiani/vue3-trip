<template>
    <div class="favor" ref="favorRef">
        <div class="test">
            <template v-for="item in 100">
                <div>
                    {{ item }}
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import scrollListen from '@/hooks/scroll-listen.js'

const favorRef = ref()
scrollListen(favorRef)




</script>

<style lang="less" scoped>
.favor{
    background-color: pink;
    height: 300px;
    overflow-y: auto;
}
</style>