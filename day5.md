# 一个bug：返回首页的时候---Cannot read properties of null (reading '$el')
因为返回首页会卸载这些组件，value这时候为空，所以读不到value.$el。
解决：做一个判断，当为空的时候直接return。

# 详情页页面滚动匹配tabControl索引（歌词匹配也是类似）
思路：拿到scrollTop变量对比每个组件固定的offsetTop（for循环），小于对应的高度，就把索引-1给index，最后把
它给tabControl的currentIndex。
此处遇到bug，直接赋值给currentIndex报错，而用函数的方式能成功。（未解决)
不能直接在父组件中修改currentIndex。
```js
const tabControlRef = ref()
watch(scrollTop,(newValue)=>{
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
  console.log(index,'aaaaa');
// 记住tabControl要将使用的数据和方法用defineExpose暴露出去。
  tabControlRef.value?.changeIndex(index)
  // tabControlRef.value?.currentIndex = index
  console.log(tabControlRef.value?.currentIndex,'bbbbbb');
})
```

# 点击tabs跳动bug的处理
解决：定义一个变量是否为点击事件，定义一个当前滚动位置。
在点击事件中，设置为点击，滚动位置给当前滚动位置；在监听滚动中，做两个判断，如果为点击事件，直接return，如果newValue等于当前滚动位置，则将变量设置为非点击。

# 首页切换页面的keep-alive
问题：每次切换出首页再切回时都会重新发送请求
解决：keep-alive可解决。
keep-alive不报警告的做法：
```html
<router-view v-slot="props">
      <keep-alive includes="home">
          <component :is="props.Component"></component>
      </keep-alive>
</router-view>
```

# 首页页面滚动和返回记录位置
* 问题：首页切换到其他页面时，会请求房间数据的下一页。
  原因：首页监听的是window，其他页面也是，且已经到底，所以会发生请求。
  解决：将首页的window监听改为元素的监听
* 问题：返回首页时无法保存已浏览到的位置。
  解决：onActivated生命周期。
```js
onActivated(()=>{
    homeRef.value.scrollTo({
        top:scrollTop.value
    })
})
```

# 视口设置以及px到vw的转换
* 视口设置：
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,
    minimum-scale=1.0, user-scalable=no">
```
* px到vw的转换：利用插件或第三方库（postcss）
在postcss.config.js中配置：
```js
module.exports = {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 375,
      },
    },
  };
```

# 一个bug：从order中跳到message再回到order，index对应不上。
原因：因为message中没有tabbar，（v-if）回到order中又有了。
解决：v-show代替v-if