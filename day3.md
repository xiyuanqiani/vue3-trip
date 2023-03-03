# 获取地位置的api在chrome浏览器中无法得到，因为连接不上谷歌的服务器，但是在edge浏览器中可以。
# 点击跳转搜索
# 分类图标的展示
隐藏滚动条
```css
&::-webkit-scrollbar{
        display: none;
    }
```
# 首页房间列表搭建
* actions中拿到数据后，不应该赋值，而是根据参数（页数）追加数据
```js
this.houseList.push(...result.data)
```
参数page可以写到仓库的state中，方便管理和查看。
* 列表搭建时遇到内容被tabbar遮挡一部分，两种方法解决：
    1. 
    ```css
    .home{
        padding-bottom:tabbar高度+留白高度;
    }
    ```
    2. 直接在tabbar组件上设置一个留白区域
    ```html
        <div style="height: 5rem;"></div>
    ``` 
* 两种类型的展示用v-if和v-else-if来展示，别分别封装成组件.
* vant组件的评分展示不生效.
* 滚动到底部加载更多
     要判断监听的是元素的滚动还是window的滚动（如果元素加了overflow-y就是元素滚动）
    ```js
    window.addEventListener('scroll',()=>{
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    if(clientHeight+scrollTop>=scrollHeight){
        homeStore.getHouse()
    } 
})
    ``` 
* 1. 离开home页面，如果其他页面也有window的滚动效果，也会监听，应该移除监听。
  2. 其他页面也进行类似的监听，会重复代码，应该封装进hooks中
  有两种封装方式：
  第一种：接收回调函数作为参数
    ```js
    export default function scrollListen(callback){
    const scrollListenHandler = ()=>{
        const clientHeight = document.documentElement.clientHeight
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        if(scrollTop+clientHeight>=scrollHeight){
            console.log("到底了");
            if(callback) callback()
        }
    }
    
    onMounted(() => {
        window.addEventListener('scroll',scrollListenHandler)
    }),
    
    onUnmounted(() => {
        window.removeEventListener('scroll',scrollListenHandler)
    })
}
    ```
    缺点：如果有其他功能，会写很多个回调
  第二种：将变量作为参数
   ```js
   export default function scrollListen(){
    const isReachBottom = ref(false)
    // 此处可用节流函数优化
    const scrollListenHandler = ()=>{
        const clientHeight = document.documentElement.clientHeight
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        if(scrollTop+clientHeight>=scrollHeight){
            console.log("到底了");
            isReachBottom.value =  true
        }
    }
    
    onMounted(() => {
        window.addEventListener('scroll',scrollListenHandler)
    }),
    
    onUnmounted(() => {
        window.removeEventListener('scroll',scrollListenHandler)
    })

    // ?为什么包大括好
    return {isReachBottom}
}
   ```  
   ```js
   // 1.将函数作为参数传递
scrollListen(()=>{
    homeStore.getHouse()
})

// 2.使用变量
const {isReachBottom} = scrollListen()
watch(isReachBottom,(newValue)=>{
    if(newValue){
        homeStore.getHouse().then(()=>{
            isReachBottom.value = false
        })
    }
})
   ```
# 监听页面滚动显示顶部搜索栏
* 两种方式实现：watch和computed
```js
// const isShow = ref(false)
// watch(scrollTop,(newTop)=>{
//     isShow.value = newTop >100
// })

const isShow = computed(()=>{
    return scrollTop.value >= 100
})
```

* 封装顶部搜索栏
因为住的时间和离开的时间很多地方需要使用，所以可以封装进一个公共的main.store中。直接从store中拿，而不用多次传值。


# 修改bug：通过地址栏跳转时，tabbar的显示不对应。
```js
const route = useRoute()
const currentIndex = ref(0);
watch(route,(newRoute)=>{
    const index = tabbar_img.findIndex(item=>item.path === newRoute.path)
    if(index== -1) return
    currentIndex.value = index
})
```