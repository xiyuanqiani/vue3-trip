import { onMounted,onUnmounted,ref } from "vue"
import _ from 'lodash'
// 监听window的滚动
// 1.接收回调函数作为参数
// export default function scrollListen(callback){
//     const scrollListenHandler = ()=>{
//         const clientHeight = document.documentElement.clientHeight
//         const scrollHeight = document.documentElement.scrollHeight
//         const scrollTop = document.documentElement.scrollTop
//         if(scrollTop+clientHeight>=scrollHeight){
//             console.log("到底了");
//             if(callback) callback()
//         }
//     }
    
//     onMounted(() => {
//         window.addEventListener('scroll',scrollListenHandler)
//     }),
    
//     onUnmounted(() => {
//         window.removeEventListener('scroll',scrollListenHandler)
//     })
// }

// 2.将变量作为参数
export default function scrollListen(){
    const isReachBottom = ref(false)
    const clientHeight = ref(0)
    const scrollHeight = ref(0)
    const scrollTop = ref(0)
    const scrollListenHandler = _.throttle(()=>{
        clientHeight.value = document.documentElement.clientHeight
        scrollHeight.value = document.documentElement.scrollHeight
        scrollTop.value = document.documentElement.scrollTop
       if(scrollTop.value+clientHeight.value>=scrollHeight.value){
           console.log("到底了");
           isReachBottom.value =  true
       }
   },500)
    
    onMounted(() => {
        window.addEventListener('scroll',scrollListenHandler)
    }),
    
    onUnmounted(() => {
        window.removeEventListener('scroll',scrollListenHandler)
    })

    
    return {isReachBottom,clientHeight,scrollHeight,scrollTop}
}