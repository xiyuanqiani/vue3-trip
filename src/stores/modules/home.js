import {defineStore} from 'pinia'
import {getHomeSuggestCities,getHomeCategories,getHomeHouse} from '@/service'

const useHome = defineStore('home',{
    state:()=>({
        suggestCities:[],
        categories:[],
        houseList:[],
        //加载房间列表的页数
        currentPage:1
    }),
    actions:{
        async getSuggest(){
            const result = await getHomeSuggestCities()
            this.suggestCities = result.data
        },
        async getCategory(){
            const result = await getHomeCategories()
            this.categories = result.data
        },
        async getHouse(){
            const result = await getHomeHouse(this.currentPage)
            // 追加数据,而不是赋值
            this.houseList.push(...result.data)
            this.currentPage++
        }
    }
})

export default useHome
