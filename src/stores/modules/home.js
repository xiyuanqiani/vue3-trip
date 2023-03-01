import {defineStore} from 'pinia'
import {getSuggestCities} from '@/service'

const useHome = defineStore('home',{
    state:()=>({
        suggestCities:[]
    }),
    actions:{
        async getSuggest(){
            const result = await getSuggestCities()
            this.suggestCities = result.data
        }
    }
})

export default useHome
