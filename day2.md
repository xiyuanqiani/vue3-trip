# 城市模块的封装
## 获取所在城市位置
利用浏览器API--Navigator.geolocation.getCurrentPosition() 方法用来获取设备当前位置。
## 搜索城市页面搭建
1. 如何隐藏tabbar？
 方法一：路由的meta配置，和v-if使用
```js
meta:{
    hideTabbar:true
    }
```
 方法二：利用css
可能有多个页面需要隐藏，统一封装到common.css中
```css
.top-page{
    position: relative;
    height: 100vh;
    z-index: 9;
    background-color: #fff;
    overflow-y: auto;
}
```
2. 发送网络请求，得到相关数据
request用来二次封装axios，modules封装各种页面的请求,index统一暴露。
```js
class HYRequest{
    constructor(baseURL,timeout){
        this.instance = axios.create({
            baseURL,
            timeout
        })
    }

    request(config){
        return new Promise((resolve,reject)=>{
            this.instance.request(config).then(res=>{
                resolve(res.data)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
    
    get(config){
        return this.request({...config,method:'get'})
    }
    
    post(config){
        return this.request({...config,method:'post'})
    }
}
```
3. 网络请求统一封装到service里，在actions中定义请求函数，得到的数据封装到stores中。
4. tab页的搭建,v-for遍历的对象，用（value,key,index）in xxx
5. cityGroup的搭建
* 滚动的时候，上面有一节被遮挡？利用头部fixed定位，并设置相应margin-top。缺点：滚轮是全屏的，不对应。
设置css
```css
.content{
      height: calc(100vh - 98px);
      overflow-y: auto;
    }
```
* 获取选择标签后的数据
 1.得到正确的key，根据tab的name属性绑定正确的tabsActive
 2.得到的数据不是响应式的，必须包裹computed
 ```js
const currentGroup =  computed(()=>allCities.value[tabsActive.value])
 ```

 * vant组件封装cityGroup
一.两个v-for分别遍历van-index-anchor和van-cell。
二.右边索引是按顺序写死的，加了一个热门，且有的首字母没有地区，对应不上，需要手动封装
 ```js
 // 动态展示索引
const indexList = computed(()=>{
    const list = props.cityData.cities.map(item=>item.group)
    list.unshift("#")
    return list
})
 ```
 三、因为数据量大，这样切换的时候渲染比较慢，不流畅，需要优化
```html
      <cityGroup :cityData="currentGroup"/>
```
利用v-show动态展示，且第一次加载了数据，后面不用重复加载
```html
<template v-for="(value,key,index) in allCities" :key="index">
        <cityGroup v-show="tabsActive === key" :cityData="value"/>
</template>
```

# 首页日期选择和推荐城市
## 封装时间
```js
const nowDate = new Date();
const newDate = new Date();
newDate.setDate(nowDate.getDate() + 1);
```
1. 格式化时间，利用dayjs。
2. 选择日期，利用vant的日历
3. 停留天数的动态计算，也可用dayjs的diff

## 推荐城市的展示
同样网络请求统一封装到service里，在actions中定义请求函数，得到的数据封装到stores中，然后进行展示

