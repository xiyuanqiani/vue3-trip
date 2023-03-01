# 项目目录结构的划分
assets - 静态资源
components - 通用的组件
hooks - 封装多个组件公共代码逻辑
mock - 模拟的数据
router - 路由
service - 网络请求
stores - 状态管理库
utils - 工具
views - 路由组件
# 重置css样式
可以封装重置样式和一些公共样式，最后统一引入到index.css中
# 路由配置
通过createRouter,createWebHashHistory等函数配置路由
# tabbar的搭建
* tabbar基本搭建，直接写入数据
```html
    <div class="tab-bar-item">
            <img src="@/assets/img/tabbar/tab_home.png" >
            <span class="text">首页</span>
    </div>
```

* tabbar动态数据导入
```html
    <template v-for="(item,index) in tabbar_img">
        <div 
            class="tab-bar-item" 
            :class="{active:currentIndex === index}"
            @click="clickItem(index,item)"
            >
            <img v-if="currentIndex !== index" :src="getAssetUrl(item.image)" >
            <img v-else :src="getAssetUrl(item.imageActive)" alt="">
            <span class="text">{{ item.text }}</span>
        </div>
    </template>
``` 
把数据封装，引入图片时路径为变量，无法识别。webpack中用require进行引入，vite中用new URL(url, import.meta.url
进行封装。
```js
export const getAssetUrl = (image) =>{
    // 参数一 相对路径
    // 参数二 当前路径的url
    return new URL(`../assets/img/${image}`,import.meta.url).href
} 
```
利用v-if实现tabbar图片切换

* 利用vant组件库实现tabbar
如何修改第三方组件库的样式？
1. 用插槽，插入自己的元素，在自己的作用域中修改元素
```html
    <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetUrl(item.image)" >
            <img v-else :src="getAssetUrl(item.imageActive)" alt="">
    </template> 
```
2. 全局定义的一个变量，覆盖它默认的值.缺点：全局修改
```css
    :root{
         --van-tabbar-item-icon-size:30px;
    }
```
3. 局部定义的一个变量，覆盖它默认的值. 缺点：局部修改
```css
    .tab-bar{
         --van-tabbar-item-icon-size:30px;
    }
```
4. 直接找到对应子组件选择器进行修改
```css
.tab-bar{
    /*  找到类，对类中的css进行重写 */
    :deep(.van-tabbar-item__icon){
        font-size: 50px;
    }
}
```


