import {defineStore} from 'pinia'
import {getFavorList,getHistory} from '@/service'

const useFavor = defineStore('favor',{
    state:()=>({
        // 收藏房屋列表
        favorHouseList:{},
        // 浏览历史记录
        visitHistory:{}
    }),
    actions:{
        async favorList (){
            let result = await getFavorList()
            this.favorHouseList = result.data
        },
        async history(){
            let result = await getHistory()
            this.visitHistory = result.data
         }
    }
})

export default useFavor